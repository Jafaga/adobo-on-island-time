import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  metadataBase: new URL(
    'https://adobo-on-island-time.afagajustine.chatgpt.site',
  ),
  icons: { icon: '/favicon.svg' },
  title: 'Adobo on Island Time — A cooking journal by Justine',
  description:
    'Filipino roots, Hawaiʻi raised. Follow an interactive chicken adobo cooking timeline, from the first garlic clove to the last spoonful of sauce.',
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
