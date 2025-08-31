import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
import { Suspense } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/sidebar';
import Navbar from '@/components/navbar';
import { AppProvider, QueryProvider } from '@/components/providers';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Metadata } from 'next';
import { Container } from '@/components/layout';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <AppProvider>
            <QueryProvider>
              <SidebarProvider
                style={
                  {
                    '--sidebar-width': '20rem',
                    '--sidebar-width-icon': '5rem'
                  } as React.CSSProperties
                }
                defaultOpen={true}
              >
                <AppSidebar />
                <Container className='w-full bg-gray-100'>
                  <Navbar />
                  <Suspense>{children}</Suspense>
                </Container>
              </SidebarProvider>
              <NextTopLoader />
            </QueryProvider>
          </AppProvider>
        </ThemeProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
