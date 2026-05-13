import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'FocusFreq Cookie Policy — How we use cookies and local storage.',
};

export default function CookiePolicyPage() {
  return (
    <section className="bg-surface-0 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Cookie Policy
        </h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-text-secondary">
          {/* 1. What Are Cookies */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files stored on your device by your web browser. They are
              widely used to make websites work efficiently and to provide information to website
              operators. FocusFreq also uses local storage, a similar browser technology for
              storing data locally.
            </p>
          </div>

          {/* 2. Cookies We Use */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Cookies &amp; Storage We Use</h2>

            <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">2.1 Essential (Always Active)</h3>
            <p>These are required for the Service to function properly:</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Name</th>
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Purpose</th>
                    <th className="py-2 text-left font-semibold text-text-primary">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-surface-100">
                    <td className="py-2 pr-4 font-mono text-xs">sb-*-auth-token</td>
                    <td className="py-2 pr-4">Supabase anonymous authentication session</td>
                    <td className="py-2">Session or persistent, depending on authentication settings.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-text-primary mt-6 mb-2">2.2 Preferences (Local Storage)</h3>
            <p>These store your choices and app state:</p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Key</th>
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Purpose</th>
                    <th className="py-2 text-left font-semibold text-text-primary">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-surface-100">
                    <td className="py-2 pr-4 font-mono text-xs">focusfreq_cookie_consent</td>
                    <td className="py-2 pr-4">Stores your cookie consent choice</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-surface-100">
                    <td className="py-2 pr-4 font-mono text-xs">focusfreq_sessions</td>
                    <td className="py-2 pr-4">Local copy of your focus session history</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                  <tr className="border-b border-surface-100">
                    <td className="py-2 pr-4 font-mono text-xs">focusfreq_tasks</td>
                    <td className="py-2 pr-4">Your task list (never sent to servers)</td>
                    <td className="py-2">Persistent</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-lg font-medium text-text-primary mt-6 mb-2">2.3 Advertising (Requires Consent)</h3>
            <p>
              These cookies are only set if you click &quot;Accept&quot; on our cookie consent
              banner. They are used by Google AdSense to serve and measure advertisements:
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-surface-200">
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Provider</th>
                    <th className="py-2 pr-4 text-left font-semibold text-text-primary">Purpose</th>
                    <th className="py-2 text-left font-semibold text-text-primary">More Info</th>
                  </tr>
                </thead>
                <tbody className="text-text-secondary">
                  <tr className="border-b border-surface-100">
                    <td className="py-2 pr-4">Google AdSense</td>
                    <td className="py-2 pr-4">Ad serving, frequency capping, ad measurement</td>
                    <td className="py-2">
                      <a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline hover:text-primary-300">
                        Google Cookies Policy
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. How to Manage */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. How to Manage Cookies</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Cookie consent banner</strong> — When you first visit a public page where ads may appear, a banner
                at the bottom of the page lets you Accept or Decline advertising cookies.
              </li>
              <li>
                <strong>Browser settings</strong> — Most browsers allow you to block or delete
                cookies through their settings menu. Note that blocking essential cookies may
                prevent the app from working correctly.
              </li>
              <li>
                <strong>Clear local storage</strong> — You can clear local storage through your
                browser&apos;s developer tools. This will reset your consent choice, session history,
                and task list.
              </li>
            </ul>
          </div>

          {/* 4. Changes */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Changes to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date.
            </p>
          </div>

          {/* 5. Contact */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Contact</h2>
            <p>
              If you have questions about this Cookie Policy, please contact us at{' '}
              <a href="mailto:privacy@focusfreq.com" className="text-primary-400 underline hover:text-primary-300">
                privacy@focusfreq.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
