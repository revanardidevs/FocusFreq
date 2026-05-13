import Link from 'next/link';

const features = [
  {
    title: 'Pomodoro-style focus timer',
    desc: 'Use Focus, Short Break, and Long Break modes to build a steady work rhythm.',
  },
  {
    title: 'Task tracking',
    desc: 'Add tasks, select what you are working on, and track completed focus sessions.',
  },
  {
    title: 'Focus audio tools',
    desc: 'Use optional tones, noise, and binaural-style audio while you work.',
  },
  {
    title: 'Session history',
    desc: 'Review your completed sessions, abandoned sessions, break sessions, and daily progress.',
  },
  {
    title: 'Progress insights',
    desc: 'See your focus time, session count, streak, and most-used audio.',
  },
  {
    title: 'Custom settings',
    desc: 'Adjust focus duration, break duration, long break interval, alarm sound, volume, and auto-start behavior.',
  },
  {
    title: 'Weekly leaderboard',
    desc: 'Join the public focus leaderboard if you want extra motivation.',
  },
  {
    title: 'No login required to start',
    desc: 'Begin focusing quickly with a browser-based workspace.',
  },
];

const faqs = [
  {
    q: 'Is FocusFreq free?',
    a: 'Yes. FocusFreq is designed as a free browser-based focus timer. Some pages may display ads, but ads are not shown during active focus sessions.',
  },
  {
    q: 'Do I need an account?',
    a: 'No account is required to start using FocusFreq. You can create tasks, run focus sessions, and use the timer directly in your browser.',
  },
  {
    q: 'Does FocusFreq work on mobile?',
    a: 'Yes. FocusFreq works on desktop and mobile browsers, so you can use it on your laptop, tablet, or phone.',
  },
  {
    q: 'Can I use FocusFreq without sound?',
    a: 'Yes. Audio is completely optional. You can use FocusFreq as a simple Pomodoro timer with no sound.',
  },
  {
    q: 'Are the frequencies medical or therapeutic?',
    a: 'No. FocusFreq does not diagnose, treat, cure, or prevent any medical condition. The audio tools are provided for personal productivity, relaxation, and background listening only.',
  },
  {
    q: 'What counts toward the leaderboard?',
    a: 'Only completed focus sessions that meet the leaderboard rules count. Breaks, abandoned sessions, and very short sessions do not count toward public leaderboard rankings.',
  },
];

const steps = [
  'Add a task you want to focus on.',
  'Choose a focus mode: Focus, Short Break, or Long Break.',
  'Pick a timer duration, such as 25 minutes for a standard Pomodoro session.',
  'Choose optional focus audio, such as brown noise, white noise, a tone, or binaural-style audio.',
  'Start the timer and focus on one task until the session ends.',
  'Take a short break when the timer finishes.',
  'Repeat the cycle and track your progress in your session history.',
];

export default function FocusFreqInfoSection() {
  return (
    <section className="bg-white border-t border-surface-200">
      {/* ── Pomofocus-style content column ─────────────────── */}
      <div className="mx-auto max-w-[860px] px-6 py-16 sm:py-20">

      {/* Section headline — large like Pomofocus */}
      <h2 className="text-3xl sm:text-4xl font-[800] tracking-tight text-text-strong leading-tight mb-14 max-w-2xl">
        An online focus timer with calming sound tools to help you stay productive
      </h2>

      <div className="space-y-8">

        {/* What is FocusFreq? */}
        <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
          <h2 className="text-xl font-bold text-text-strong">What is FocusFreq?</h2>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            FocusFreq is a web-based focus timer designed to help you work, study, write, code, or complete deep work
            sessions with fewer distractions. It combines a Pomodoro-style timer, task tracking, focus session history,
            and optional sound tools such as tones, noise, and binaural-style audio.
          </p>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            You can use FocusFreq directly in your browser without installing an app. Start a focus session, choose a
            task, optionally add background audio, and review your progress over time.
          </p>
        </article>

        {/* What is the Pomodoro Technique? */}
        <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
          <h2 className="text-xl font-bold text-text-strong">What is the Pomodoro Technique?</h2>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            The Pomodoro Technique is a time management method that breaks work into focused intervals followed by short
            breaks. A common cycle is 25 minutes of focused work followed by a 5-minute break, with a longer break after
            several focus sessions.
          </p>
          <p className="mt-3 text-base leading-7 text-text-secondary">
            This structure can make large tasks feel easier to start, reduce mental fatigue, and create a steady rhythm
            for productive work.
          </p>
        </article>

        {/* How to use FocusFreq */}
        <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
          <h2 className="text-xl font-bold text-text-strong">How to use FocusFreq</h2>
          <ol className="mt-4 space-y-3 text-text-secondary list-none">
            {steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
                >
                  {i + 1}
                </span>
                <span className="text-base leading-7">{step}</span>
              </li>
            ))}
          </ol>
        </article>

        {/* Core Features */}
        <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
          <h2 className="text-xl font-bold text-text-strong">Core Features</h2>
          <ul className="mt-4 space-y-3 text-text-secondary">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-focus" />
                <span className="text-base leading-7">
                  <strong className="font-semibold text-text-primary">{f.title}</strong>
                  {' — '}
                  {f.desc}
                </span>
              </li>
            ))}
          </ul>
        </article>

        {/* Two-column row: Audio + Why */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Focus Audio & Frequency Tools */}
          <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
            <h2 className="text-xl font-bold text-text-strong">Focus Audio &amp; Frequency Tools</h2>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              FocusFreq includes optional sound tools for users who prefer working with background audio. You can choose
              simple tones, white noise, pink noise, brown noise, or binaural-style left/right frequency settings.
            </p>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              These audio tools are intended for personal focus, relaxation, and background sound preference.
              FocusFreq does not make medical, healing, or therapeutic claims. Use a comfortable volume and stop
              listening if you feel discomfort.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['Noise Generator', 'Frequency Generator', 'Binaural Beats'].map((tool) => (
                <span
                  key={tool}
                  className="rounded-full px-3 py-1 text-xs font-medium"
                  style={{
                    background: 'var(--color-audio-soft, #F1EEFF)',
                    border: '1px solid var(--color-audio-border, #D8D2FF)',
                    color: 'var(--color-audio, #6C63FF)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </article>

          {/* Why use FocusFreq? */}
          <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
            <h2 className="text-xl font-bold text-text-strong">Why use FocusFreq?</h2>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              FocusFreq is built for people who want a simple timer, but also want more context around their work
              sessions. Instead of only counting down time, FocusFreq connects your timer with tasks, audio
              preferences, session history, and optional community motivation.
            </p>
            <p className="mt-3 text-base leading-7 text-text-secondary">
              It is useful for studying, writing, coding, reading, planning, admin work, or any task that benefits
              from a clear start and finish.
            </p>
          </article>
        </div>

        {/* FAQ */}
        <article className="rounded-[24px] border border-surface-200 bg-white p-7 shadow-card">
          <h2 className="text-xl font-bold text-text-strong">Frequently Asked Questions</h2>
          <dl className="mt-6 divide-y divide-surface-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5 first:pt-0 last:pb-0">
                <dt>
                  <h3 className="text-base font-semibold text-text-primary">{faq.q}</h3>
                </dt>
                <dd className="mt-2 text-base leading-7 text-text-secondary">{faq.a}</dd>
              </div>
            ))}
          </dl>
        </article>

        {/* Internal Links */}
        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {[
            { href: '/app/history', label: 'Session History' },
            { href: '/leaderboard', label: 'Leaderboard' },
            { href: '/frequency-generator', label: 'Frequency Generator' },
            { href: '/noise-generator', label: 'Noise Generator' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full border border-surface-200 bg-white px-4 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-focus-border hover:bg-focus-soft hover:text-focus"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-[24px] border border-focus-border bg-focus-soft px-8 py-10 text-center">
        <p className="text-2xl font-[800] text-text-strong">Ready to focus?</p>
        <p className="mt-2 text-base text-text-secondary">
          Start a focus session with FocusFreq — free, no login required.
        </p>
        <Link
          href="/app"
          className="mt-6 inline-block rounded-full px-8 py-3.5 text-base font-bold text-white shadow-focus-glow transition-all hover:-translate-y-0.5 hover:shadow-lg"
          style={{ background: 'linear-gradient(135deg, #F05A3C, #FF735C)' }}
        >
          Launch Workspace
        </Link>
      </div>

      </div>{/* end content column */}
    </section>
  );
}
