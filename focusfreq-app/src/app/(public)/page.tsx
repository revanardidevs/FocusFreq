import Link from 'next/link';
import AdSlot from '@/components/ads/AdSlot';

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-24 sm:py-32 lg:px-8">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary-900/20 via-surface-0 to-surface-0" />
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl">
            Focus Deeper with <span className="text-primary-400">Custom Frequencies</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-text-secondary">
            FocusFreq combines a powerful task timer with customizable audio frequencies, binaural beats, and noise generators to help you reach peak concentration.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/app"
              className="rounded-full bg-primary-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-primary-600/30 transition-all hover:bg-primary-500 hover:shadow-xl hover:shadow-primary-600/40"
            >
              Launch Workspace
            </Link>
          </div>
        </div>
      </section>

      <AdSlot slotId="after-widget" format="horizontal" className="my-6 mx-auto max-w-5xl px-4" />

      {/* Feature Highlights */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="rounded-3xl border border-surface-200/50 bg-surface-50 p-8 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Smart Pomodoro Timer</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Flexible focus sessions customized to your workflow. Track your tasks and measure your productivity over time.
            </p>
          </div>

          <div className="rounded-3xl border border-surface-200/50 bg-surface-50 p-8 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Frequency Engine</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Generate precise sine, square, and sawtooth waves to tune your mental state. Combine with noise and binaural beats.
            </p>
          </div>

          <div className="rounded-3xl border border-surface-200/50 bg-surface-50 p-8 shadow-md transition-transform hover:-translate-y-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-600/10 text-primary-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-text-primary">Detailed Analytics</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-secondary">
              Visualize your peak focus times and discover which frequencies work best for your unique workflow.
            </p>
          </div>
        </div>
      </section>

      <AdSlot slotId="content-mid" format="rectangle" className="my-10 mx-auto max-w-3xl px-4" />
    </div>
  );
}
