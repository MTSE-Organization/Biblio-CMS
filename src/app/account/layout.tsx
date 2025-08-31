import Navbar from '@/components/navbar';
import AppSidebar from '@/components/sidebar';

export default function AccountLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AppSidebar />
      <main className='w-full bg-gray-100'>
        <Navbar />
        {children}
      </main>
    </>
  );
}
