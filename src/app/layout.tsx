import type { Metadata } from 'next';
import '@/styles/globals.css';
import { StoreProvider } from '@/context/StoreContext';

export const metadata: Metadata = {
  title: 'Berachtech E-Commerce AI OS — Enterprise Merchant Intelligence & Command Centre',
  description: 'Enterprise AI Commerce Operating System: Executive Command Centre, Digital Twin simulation, Customer 360, and autonomous merchant operations.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
