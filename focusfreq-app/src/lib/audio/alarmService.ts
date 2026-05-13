export type AlarmSoundType = 'soft_bell' | 'digital_beep' | 'none';

class AlarmService {
  private audioCtx: AudioContext | null = null;
  private currentNodes: {
    oscillator: OscillatorNode;
    gain: GainNode;
  }[] = [];
  
  private initAudioContext() {
    if (!this.audioCtx) {
      this.audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public stop() {
    this.currentNodes.forEach(nodes => {
      try {
        nodes.oscillator.stop();
        nodes.oscillator.disconnect();
        nodes.gain.disconnect();
      } catch (e) {
        // Ignore errors if already stopped
      }
    });
    this.currentNodes = [];
  }

  public async play(type: AlarmSoundType, volume: number, repeatCount: number = 1) {
    if (type === 'none' || volume <= 0) return;
    
    this.stop();
    this.initAudioContext();
    if (!this.audioCtx) return;

    const volumeLevel = volume / 100;
    const ctx = this.audioCtx;

    const playSingleBeep = async () => {
      return new Promise<void>((resolve) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        if (type === 'digital_beep') {
          osc.type = 'square';
          osc.frequency.setValueAtTime(800, ctx.currentTime);
          
          // Fast attack, quick decay
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(volumeLevel * 0.3, ctx.currentTime + 0.05);
          gain.gain.setValueAtTime(volumeLevel * 0.3, ctx.currentTime + 0.15);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc.start(ctx.currentTime);
          osc.stop(ctx.currentTime + 0.25);
          
          this.currentNodes.push({ oscillator: osc, gain });

          osc.onended = () => {
            resolve();
          };
        } else {
          // soft_bell
          osc.type = 'sine';
          osc.frequency.setValueAtTime(600, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1.5);
          
          gain.gain.setValueAtTime(0, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(volumeLevel, ctx.currentTime + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
          
          // Add a little harmonic overtone
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(1200, ctx.currentTime);
          gain2.gain.setValueAtTime(0, ctx.currentTime);
          gain2.gain.linearRampToValueAtTime(volumeLevel * 0.3, ctx.currentTime + 0.02);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
          
          osc.connect(gain);
          gain.connect(ctx.destination);
          
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          
          osc.start(ctx.currentTime);
          osc2.start(ctx.currentTime);
          
          osc.stop(ctx.currentTime + 2.1);
          osc2.stop(ctx.currentTime + 1.1);
          
          this.currentNodes.push({ oscillator: osc, gain });
          this.currentNodes.push({ oscillator: osc2, gain: gain2 });

          osc.onended = () => {
            resolve();
          };
        }
      });
    };

    for (let i = 0; i < repeatCount; i++) {
      // If we cleared the nodes manually (stop called), abort the loop
      if (i > 0 && this.currentNodes.length === 0) break;
      
      await playSingleBeep();
      
      // Short gap between repeats
      if (i < repeatCount - 1) {
        await new Promise(r => setTimeout(r, type === 'digital_beep' ? 200 : 500));
      }
    }
    
    // Final cleanup
    this.stop();
  }
}

export const alarmService = new AlarmService();
