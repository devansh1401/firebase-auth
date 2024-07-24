import { Providers } from './providers';
import './globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Firebase Auth App',
  description: 'App with Google One Tap and Firebase Auth',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}