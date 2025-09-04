import './globals.css';
import { Be_Vietnam_Pro } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import { AppProvider, QueryProvider } from '@/components/providers';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Metadata } from 'next';
import { Loader } from 'lucide-react';

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-be-vietnam-pro',
  display: 'swap'
});

export const metadata: Metadata = {
  title: {
    template: '%s | Biblio CMS',
    default: 'Biblio CMS'
  }
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang={'vi'}>
      <body
        className={`${beVietnamPro.variable} ${beVietnamPro.className} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <AppProvider>
              <Suspense>{children}</Suspense>
              <NextTopLoader showSpinner={false} />
            </AppProvider>
          </QueryProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
