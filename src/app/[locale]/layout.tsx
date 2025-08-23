import './globals.css';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { locales } from '@/i18n/config';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { AppProvider, QueryProvider } from '@/components/providers';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title')
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <html suppressHydrationWarning lang={locale}>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <NextIntlClientProvider>
          <AppProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              <QueryProvider>
                <SidebarProvider defaultOpen={defaultOpen}>
                  <AppSidebar />
                  <main className='w-full'>
                    <Navbar />
                    <Suspense>{children}</Suspense>
                  </main>
                </SidebarProvider>
                <NextTopLoader />
              </QueryProvider>
            </ThemeProvider>
          </AppProvider>
        </NextIntlClientProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
