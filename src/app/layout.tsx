import './globals.css';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import NextTopLoader from 'nextjs-toploader';
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

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';
  return (
    <html suppressHydrationWarning lang={'vi'}>
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <AppProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SidebarProvider
                style={
                  {
                    '--sidebar-width': '20rem',
                    '--sidebar-width-icon': '5rem'
                  } as React.CSSProperties
                }
                defaultOpen={defaultOpen}
              >
                <AppSidebar />
                <main className='w-full bg-gray-100'>
                  <Navbar />
                  <Suspense>{children}</Suspense>
                </main>
              </SidebarProvider>
              <NextTopLoader />
            </QueryProvider>
          </ThemeProvider>
        </AppProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
