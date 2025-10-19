const data = {
  title: 'DoGood — Be the Spark. Make Kindness Visible.',
  description:
    'DoGood is a global social impact platform connecting people, nonprofits, and companies to create a culture of kindness. Join to volunteer, donate, and make the world better together.',
  keywords: 'DoGood, social impact, volunteering',
  locale: 'en_US',
  images: [
    {
      url: '/metadata/DoGood_open_graph.jpg',
      width: 1200,
      height: 630,
      alt: 'DoGood',
    },
  ],
};

const { title, description, keywords, locale, images } = data;

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

export const meta = {
  title: title,
  description: description,
  keywords: keywords,
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: BASE_URL,
  },
  manifest: '/metadata/manifest.webmanifest',
  openGraph: {
    title: title,
    description: description,
    url: BASE_URL,
    siteName: title,
    locale: locale,
    type: 'website',
    images: images,
  },
  twitter: {
    title: title,
    description: description,
    card: 'summary_large_image',
    images: images,
  },
  icons: {
    icon: [
      {
        url: '/metadata/favicon.ico',
      },
      {
        url: '/metadata/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/metadata/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/metadata/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/metadata/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    shortcut: '/metadata/favicon.ico',
    apple: '/metadata/apple-touch-icon.png',
    other: {
      rel: '/metadata/apple-touch-icon.png',
      url: '/metadata/apple-touch-icon.png',
    },
  },
};
