'use client';

import { LogOut, User } from 'lucide-react';

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
import { useLogoutMutation } from '@/queries';
import { notify, removeData } from '@/utils';
import { useRouter } from 'next/navigation';
import { logger } from '@/logger';
import { storageKeys } from '@/constants';

const Navbar = () => {
  const logoutMutation = useLogoutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await logoutMutation.mutateAsync();
      if (res.result) {
        removeData(storageKeys.ACCESS_TOKEN);
        notify.success('Đăng xuất thành công');
        router.push('/login');
      }
    } catch (error) {
      logger.error('Error while logging out: ', error);
      notify.error('Đăng xuất thất bại');
    }
  };
  return (
    <nav className='sticky top-0 z-10 flex h-16 items-center justify-between bg-white p-3'>
      {/* LEFT */}
      <SidebarTrigger className='[&>svg]:stroke-sidebar cursor-pointer transition-all duration-200 ease-linear hover:bg-transparent [&>svg]:size-6!' />
      {/* RIGHT */}
      <div className='flex items-center gap-4'>
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
              Hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='mr-2 h-[1.2rem] w-[1.2rem]' />
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
