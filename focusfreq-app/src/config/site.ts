export const siteConfig = {
  name: 'FocusFreq',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '[support email to be added before launch]',
  description: 'Turn tasks into focus sessions with custom frequencies. Free Pomodoro timer, frequency generator, and focus tracker.',
};

// Startup validation: warn if production is using localhost fallbacks
if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'production' &&
  !process.env.NEXT_PUBLIC_SITE_URL
) {
  console.warn(
    '[FocusFreq] NEXT_PUBLIC_SITE_URL is not set. ' +
    'OG meta tags, sitemap, and canonical URLs will point to localhost. ' +
    'Set this env var before deploying to production.'
  );
}
