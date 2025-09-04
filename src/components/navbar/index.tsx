'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import DropdownAvatar from '@/components/navbar/dropdown-avatar';

const Navbar = () => {
  return (
    <nav className='flex h-16 items-center justify-between bg-white p-3'>
      {/* LEFT */}
      <SidebarTrigger className='[&>svg]:stroke-sidebar cursor-pointer transition-all duration-200 ease-linear hover:bg-transparent [&>svg]:size-6!' />
      {/* RIGHT */}
      <DropdownAvatar />
    </nav>
  );
};

export default Navbar;
