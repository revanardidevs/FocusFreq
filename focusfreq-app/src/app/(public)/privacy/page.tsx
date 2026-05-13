import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'FocusFreq Privacy Policy — Learn how we collect, use, and protect your data.',
};

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-surface-0 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-text-secondary">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Introduction</h2>
            <p>
              FocusFreq (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is a web-based focus timer and frequency
              generator. This Privacy Policy explains what data we collect, how we use it, and your
              rights regarding that data.
            </p>
          </div>

          {/* 2. Data We Collect */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Data We Collect</h2>
            <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">2.1 Pseudonymous Authentication</h3>
            <p>
              When you use the FocusFreq workspace, we create an account using Supabase
              Authentication. This account does not require an email address, password, or your real name. It is identified by a randomly generated
              unique ID (pseudonymous data).
            </p>
            <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">2.2 Focus Session Data</h3>
            <p>
              When you complete a focus session, we store the following data on our servers:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Session start time and end time</li>
              <li>Planned duration and actual duration (in minutes)</li>
              <li>Session status (completed or abandoned)</li>
              <li>Your pseudonymous user ID</li>
            </ul>
            <h3 className="text-lg font-medium text-text-primary mt-4 mb-2">2.3 Leaderboard Data</h3>
            <p>
              If you choose to join the weekly leaderboard, you may set a display name. This display
              name and your aggregated focus statistics (total minutes, completed sessions) are
              visible on the public leaderboard. You can opt out at any time by setting your profile
              to private.
            </p>
          </div>

          {/* 3. Data We Do NOT Collect */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. Data We Do NOT Collect</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Task names</strong> — Your task titles are stored only in your browser&apos;s local storage and are never sent to our servers.</li>
              <li><strong>Email addresses</strong> — Pseudonymous authentication does not require or store email.</li>
              <li><strong>Audio preferences</strong> — Your frequency, noise, and audio settings are not transmitted to our servers.</li>
              <li><strong>Browsing activity</strong> — We do not track pages you visit outside of FocusFreq.</li>
            </ul>
          </div>

          {/* 4. Third-Party Services */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Supabase</strong> — For anonymous authentication and database storage. Supabase processes data in accordance with their <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline hover:text-primary-300">Privacy Policy</a>.</li>
              <li><strong>Google AdSense</strong> — For serving advertisements on public pages. Google may use cookies to personalize ads. See Google&apos;s <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-400 underline hover:text-primary-300">Privacy Policy</a>.</li>
              <li><strong>Vercel</strong> — For hosting and serving the website.</li>
            </ul>
          </div>

          {/* 5. Cookies */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Cookies</h2>
            <p>
              We use cookies and local storage for the following purposes:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong>Essential</strong> — Anonymous authentication session (Supabase).</li>
              <li><strong>Preferences</strong> — Your cookie consent choice, stored in local storage.</li>
              <li><strong>Advertising</strong> — Google AdSense may set cookies to serve and measure ads. These cookies are only loaded after you accept our cookie consent banner.</li>
            </ul>
            <p className="mt-2">
              For more details, see our <a href="/cookies" className="text-primary-400 underline hover:text-primary-300">Cookie Policy</a>.
            </p>
          </div>

          {/* 6. Data Retention */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Data Retention</h2>
            <p>
              We retain focus session and leaderboard data for as long as reasonably necessary to operate the service, maintain leaderboard integrity, and improve the product. We may delete inactive or outdated anonymous data over time.
            </p>
            <p className="mt-2">
              If you clear your browser data, you may lose access to your pseudonymous account and local history. Server-side data previously associated with that ID may remain unless deleted through a supported deletion process.
            </p>
          </div>

          {/* 7. Your Rights */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">7. Your Rights</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>You can opt out of the leaderboard by setting your profile to private.</li>
              <li>You can decline advertising cookies via the consent banner.</li>
              <li>You can clear your local browser data at any time to remove local session history and task names.</li>
              <li>
                Although FocusFreq does not require your name or email address, the unique identifier associated with your account may still be considered personal or pseudonymous data under certain privacy laws. You may contact us to request deletion or assistance with privacy-related requests.
              </li>
            </ul>
          </div>

          {/* 8. Children's Privacy */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">8. Children&apos;s Privacy</h2>
            <p>
              FocusFreq is a general productivity tool. We do not knowingly collect personal
              information from children under 13. If you believe a child has provided us with personal or pseudonymous data, please contact us so we can delete the information.
            </p>
          </div>

          {/* 9. Changes */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date.
            </p>
          </div>

          {/* 10. Contact */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">10. Contact</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-primary-400 underline hover:text-primary-300">
                {siteConfig.contactEmail}
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
