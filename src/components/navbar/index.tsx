'use client';
import { LogOut, Settings, User } from 'lucide-react';
import Link from 'next/link';

import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LocaleSwitcher from '@/components/locale-switcher';
import DarkModeToggle from '@/components/dark-mode-toggle';

const Navbar = () => {
  return (
    <nav className='bg-sidebar sticky top-0 z-10 flex items-center justify-between p-3'>
      {/* LEFT */}
      <SidebarTrigger className='cursor-pointer transition-all duration-200 ease-linear [&>svg]:size-5!' />
      {/* <Button variant="outline" onClick={toggleSidebar}>
        Custom Button
      </Button> */}
      {/* RIGHT */}
      <div className='flex items-center gap-4'>
        <Link href='/'>Dashboard</Link>
        {/* LANGUAGE MENU */}
        <LocaleSwitcher />
        {/* THEME MENU */}
        <DarkModeToggle />
        {/* USER MENU */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer focus:outline-none focus-visible:ring-0'>
              <AvatarImage src='https://avatars.githubusercontent.com/u/1486366' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent sideOffset={10}>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className='mr-2 h-[1.2rem] w-[1.2rem]' />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className='mr-2 h-[1.2rem] w-[1.2rem]' />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className='mr-2 h-[1.2rem] w-[1.2rem]' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
