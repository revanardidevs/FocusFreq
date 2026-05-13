import { AudioMode, AudioSettings, NoiseType } from '@/types';

class AudioEngine {
  private context: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sourceNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  
  private FADE_DURATION = 0.1; // seconds

  // Get or create context
  private getContext(): AudioContext {
    if (!this.context) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.context = new AudioContextClass();
    }
    return this.context;
  }

  // Ensure context is running (fixes autoplay policy issues)
  private async resumeContext() {
    const ctx = this.getContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
  }

  // Stop everything immediately but with a quick fade
  public stop() {
    if (!this.context || !this.masterGain) return;

    const ctx = this.context;
    
    // Fade out to prevent popping
    this.masterGain.gain.cancelScheduledValues(ctx.currentTime);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + this.FADE_DURATION);

    // Stop nodes slightly after fade
    const stopTime = ctx.currentTime + this.FADE_DURATION + 0.05;
    
    this.sourceNodes.forEach(node => {
      try {
        node.stop(stopTime);
        node.onended = () => node.disconnect();
      } catch (e) {
        // Ignore if already stopped
      }
    });

    this.sourceNodes = [];
  }

  public async play(settings: AudioSettings) {
    if (settings.mode === AudioMode.NONE) return;

    await this.resumeContext();
    this.stop(); // Stop any existing sounds

    const ctx = this.getContext();

    // Create a new master gain node for this play session
    this.masterGain = ctx.createGain();
    // Start at 0 for fade in
    this.masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
    this.masterGain.connect(ctx.destination);

    // Fade in to target volume
    // We use Math.max to prevent issues with 0 volume log ramps
    const targetVolume = Math.max(0.001, settings.volume);
    this.masterGain.gain.exponentialRampToValueAtTime(targetVolume, ctx.currentTime + this.FADE_DURATION);

    switch (settings.mode) {
      case AudioMode.TONE:
        this.playTone(ctx, this.masterGain, settings);
        break;
      case AudioMode.BINAURAL:
        this.playBinaural(ctx, this.masterGain, settings);
        break;
      case AudioMode.NOISE:
        this.playNoise(ctx, this.masterGain, settings);
        break;
    }
  }

  public setVolume(volume: number) {
    if (!this.context || !this.masterGain) return;
    const targetVolume = Math.max(0.001, volume);
    this.masterGain.gain.cancelScheduledValues(this.context.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(targetVolume, this.context.currentTime + 0.1);
  }

  private playTone(ctx: AudioContext, destination: AudioNode, settings: AudioSettings) {
    const osc = ctx.createOscillator();
    osc.type = settings.tone.waveform;
    osc.frequency.setValueAtTime(settings.tone.frequencyHz, ctx.currentTime);
    osc.connect(destination);
    osc.start();
    this.sourceNodes.push(osc);
  }

  private playBinaural(ctx: AudioContext, destination: AudioNode, settings: AudioSettings) {
    const merger = ctx.createChannelMerger(2);
    merger.connect(destination);

    const { baseHz, beatHz } = settings.binaural;

    // Left ear (Base frequency)
    const oscLeft = ctx.createOscillator();
    oscLeft.type = 'sine'; // Binaural beats are typically sine waves
    oscLeft.frequency.setValueAtTime(baseHz, ctx.currentTime);
    oscLeft.connect(merger, 0, 0); // connect to input 0 (left)

    // Right ear (Base + Beat frequency)
    const oscRight = ctx.createOscillator();
    oscRight.type = 'sine';
    oscRight.frequency.setValueAtTime(baseHz + beatHz, ctx.currentTime);
    oscRight.connect(merger, 0, 1); // connect to input 1 (right)

    oscLeft.start();
    oscRight.start();
    this.sourceNodes.push(oscLeft, oscRight);
  }

  private playNoise(ctx: AudioContext, destination: AudioNode, settings: AudioSettings) {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds of noise
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    const type = settings.noise.type;

    if (type === NoiseType.WHITE) {
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
    } else if (type === NoiseType.PINK) {
      // Approximation of Pink Noise using Paul Kellet's method
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        data[i] *= 0.11; // compensate for gain
        b6 = white * 0.115926;
      }
    } else if (type === NoiseType.BROWN) {
      // Brown noise (integrated white noise)
      let lastOut = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // compensate for gain
      }
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    noiseSource.connect(destination);
    noiseSource.start();
    this.sourceNodes.push(noiseSource);
  }
}

// Export as singleton
export const audioEngine = new AudioEngine();
