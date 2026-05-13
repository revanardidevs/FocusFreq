import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-surface-200 bg-white py-6">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} FocusFreq. All rights reserved.
          </p>
          <nav className="flex items-center gap-4" aria-label="Legal">
            <Link href="/privacy" className="text-[10px] text-text-muted hover:text-focus transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-[10px] text-text-muted hover:text-focus transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="text-[10px] text-text-muted hover:text-focus transition-colors">
              Cookie Policy
            </Link>
          </nav>
        </div>
        <p className="mt-3 max-w-2xl text-center text-[10px] leading-relaxed text-text-muted sm:text-left">
          FocusFreq provides customizable tones, noise, and focus timers for personal
          productivity and relaxation. It is not a medical tool and does not diagnose,
          treat, or cure any condition.
        </p>
      </div>
    </footer>
  );
}
