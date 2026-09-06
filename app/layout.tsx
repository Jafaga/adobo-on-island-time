// EDIT BROWSER TITLE / SEARCH DESCRIPTION below; keep the site URL aligned with hosting.
import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(
    'https://adobo-on-island-time.afagajustine.chatgpt.site',
  ),
  // Browser-tab icon: reuse the same adobo graphic as the page header.
  icons: { icon: { url: '/adobo-logo.png', type: 'image/png' } },
  title: 'Adobo on Island Time — A cooking journal by Justine',
  description:
    'Justine’s chicken adobo: Aloha Original Shoyu, Silver Swan Special Soy Sauce, ginger, five-minute turns, and an oyster-sauce finish. Filipino roots, Hawaiʻi raised.',
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
