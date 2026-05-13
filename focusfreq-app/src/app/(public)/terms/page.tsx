import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'FocusFreq Terms of Service — Rules and guidelines for using FocusFreq.',
};

export default function TermsPage() {
  return (
    <section className="bg-surface-0 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-2 text-sm text-text-muted">Last updated: May 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-text-secondary">
          {/* 1. Acceptance */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using FocusFreq (&quot;the Service&quot;), you agree to be bound by
              these Terms of Service. If you do not agree, please do not use the Service.
            </p>
          </div>

          {/* 2. Service Description */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">2. Service Description</h2>
            <p>
              FocusFreq is a free, web-based productivity platform that provides:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Focus and Pomodoro timers</li>
              <li>Frequency, tone, and noise generators</li>
              <li>Session tracking and personal history</li>
              <li>A public weekly leaderboard (opt-in)</li>
            </ul>
            <p className="mt-2">
              The Service is provided &quot;as is&quot; and &quot;as available.&quot; We reserve
              the right to modify, suspend, or discontinue any part of the Service at any time.
            </p>
          </div>

          {/* 3. User Conduct */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">3. User Conduct</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Use bots, scripts, or automated tools to artificially inflate leaderboard rankings.</li>
              <li>Attempt to manipulate focus session data or circumvent anti-cheat measures.</li>
              <li>Use offensive, misleading, or impersonating display names on the leaderboard.</li>
              <li>Interfere with or disrupt the Service or its infrastructure.</li>
              <li>Attempt to access other users&apos; private data.</li>
            </ul>
            <p className="mt-2">
              Violation of these rules may result in removal from the leaderboard or suspension of
              your anonymous account. We reserve the right to hide, remove, or adjust leaderboard entries that appear fraudulent, abusive, automated, or harmful to the community.
            </p>
          </div>

          {/* 4. Intellectual Property */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">4. Intellectual Property</h2>
            <p>
              All content, design, code, and branding of FocusFreq are the property of FocusFreq
              and are protected by applicable intellectual property laws. You may not copy,
              reproduce, or redistribute any part of the Service without prior written permission.
            </p>
          </div>

          {/* 5. Disclaimer of Warranties */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">5. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS,
              WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT
              THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE.
            </p>
          </div>

          {/* 6. Audio & Frequency Disclaimer */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">6. Audio &amp; Frequency Disclaimer</h2>
            <p>
              FocusFreq provides customizable tones, frequencies, noise generators, and binaural
              beats for personal productivity and relaxation purposes only. These tools are{' '}
              <strong>not medical devices</strong> and are not intended to diagnose, treat, cure,
              or prevent any medical condition.
            </p>
            <p className="mt-2">
              Specifically:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>We make no claims about the therapeutic or healing properties of any frequency.</li>
              <li>We do not claim that binaural beats treat ADHD, anxiety, depression, or any other condition.</li>
              <li>Use audio features at a comfortable volume. Prolonged exposure to loud sounds may damage hearing.</li>
              <li>If you experience discomfort, dizziness, or any adverse effects, stop using the audio features immediately.</li>
              <li>Consult a healthcare professional before using audio tools if you have epilepsy, seizure disorders, or related conditions.</li>
            </ul>
          </div>

          {/* 7. Limitation of Liability */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">7. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, FOCUSFREQ AND ITS OPERATORS SHALL NOT BE
              LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
              INCLUDING BUT NOT LIMITED TO LOSS OF DATA, LOSS OF PRODUCTIVITY, OR ANY OTHER
              INTANGIBLE LOSSES, ARISING FROM YOUR USE OF THE SERVICE.
            </p>
          </div>

          {/* 8. Privacy */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">8. Privacy</h2>
            <p>
              Your use of the Service is also governed by our{' '}
              <a href="/privacy" className="text-primary-400 underline hover:text-primary-300">
                Privacy Policy
              </a>
              , which describes how we collect and use your data.
            </p>
          </div>

          {/* 9. Modifications */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">9. Modifications to Terms</h2>
            <p>
              We may update these Terms from time to time. Continued use of the Service after
              changes constitutes acceptance of the revised Terms. Changes will be posted on this
              page with an updated &quot;Last updated&quot; date.
            </p>
          </div>

          {/* 10. Governing Law */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with applicable law.
              Any disputes arising from these Terms will be resolved through appropriate legal
              channels.
            </p>
          </div>

          {/* 11. Contact */}
          <div>
            <h2 className="text-xl font-semibold text-text-primary mb-3">11. Contact</h2>
            <p>
              If you have questions about these Terms, please contact us at{' '}
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
