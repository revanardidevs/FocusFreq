import { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    '',
    '/app',
    '/leaderboard',
    '/pomodoro-timer',
    '/study-timer',
    '/focus-timer',
    '/tone-generator',
    '/frequency-generator',
    '/binaural-beat-generator',
    '/noise-generator',
    '/privacy',
    '/terms',
    '/cookies',
  ];

  const frequencyRoutes = ['432', '528', '40'].map((hz) => `/frequency/${hz}`);
  const noiseRoutes = ['brown', 'white', 'pink'].map((type) => `/noise/${type}`);

  const allRoutes = [...staticRoutes, ...frequencyRoutes, ...noiseRoutes];

  return allRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : route === '/app' ? 0.9 : 0.8,
  }));
}
