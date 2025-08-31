'use client';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/components/ui/sidebar';
import { logoWithText } from '@/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib';
import { Button } from '@/components/form';
import { useTopLoader } from 'nextjs-toploader';
import './sidebar.css';
import { MenuItem } from '@/types';
import { menuConfig } from '@/constants';

function CollapsibleMenuItem({ item }: { item: MenuItem }) {
  const pathname = usePathname();
  const router = useRouter();
  const loader = useTopLoader();
  const [open, setOpen] = useState(() => {
    if (item.children?.some((child) => child.path === pathname)) {
      return true;
    }
    return false;
  });
  const { state } = useSidebar();

  useEffect(() => {
    if (state === 'collapsed') {
      setOpen(false);
    }
  }, [state]);

  useEffect(() => {
    if (item.children?.find((child) => child.path === pathname)) {
      setOpen(true);
    }
  }, [item.children, pathname]);

  const handleSubItemClick = (path?: string) => {
    if (!path || path === pathname) return;
    router.push(path);
    loader.start();
  };

  return (
    <SidebarMenuItem key={item.key}>
      <SidebarMenuButton
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'hover:bg-sidebar! hover:bg-sidebar! active:bg-sidebar! m-1 mx-auto min-h-11 cursor-pointer rounded-none pl-8 font-normal whitespace-nowrap text-white transition-all! duration-200! ease-linear! hover:text-white active:text-white',
          {
            'opacity-80 hover:opacity-100': !item.children?.find(
              (child) => child.path === pathname
            )
          }
        )}
      >
        {item.icon && <item.icon />}
        {item.label}
        <ChevronDown
          className={`ml-auto transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </SidebarMenuButton>

      <AnimatePresence initial={false}>
        {open && item.children && (
          <motion.div
            key='content'
            initial={{
              height: 0
            }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className={cn('overflow-hidden')}
          >
            <SidebarMenu
              className={cn({
                'bg-sidebar-active-menu': open
              })}
            >
              {item.children.map((sub) =>
                sub.children ? (
                  <CollapsibleMenuItem key={sub.key} item={sub} />
                ) : (
                  <SidebarMenuItem key={sub.key}>
                    <SidebarMenuButton
                      className='mx-auto min-h-11 rounded-none'
                      asChild
                    >
                      <Button
                        variant={'ghost'}
                        onClick={() => handleSubItemClick(sub.path)}
                        className={cn(
                          'justify-start pl-12 font-normal text-white transition-all duration-200 ease-linear hover:text-white active:text-white',
                          {
                            'bg-sidebar-item-active hover:bg-sidebar-item-active active:bg-sidebar-item-active':
                              pathname === sub.path,
                            'active:bg-sidebar-active-menu hover:bg-sidebar-active-menu opacity-65 hover:opacity-100':
                              sub.path !== pathname
                          }
                        )}
                      >
                        {sub.icon && <sub.icon />}
                        <span>{sub.label}</span>
                      </Button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              )}
            </SidebarMenu>
          </motion.div>
        )}
      </AnimatePresence>
      {item.badge && <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>}
    </SidebarMenuItem>
  );
}

const renderMenu = (items: MenuItem[]) => {
  return (
    <SidebarMenu>
      {items.map((item) =>
        item.children ? (
          <CollapsibleMenuItem key={item.key} item={item} />
        ) : (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton className='rounded-none' asChild>
              {item.path ? (
                <Link href={item.path}>
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </Link>
              ) : (
                <Button
                  variant={'ghost'}
                  className='bg-background hover:bg-background! justify-start pl-12'
                >
                  {item.icon && <item.icon />}
                  <span>{item.label}</span>
                </Button>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      )}
    </SidebarMenu>
  );
};

const AppSidebar = () => {
  return (
    <Sidebar
      className='[&_[data-sidebar="sidebar"]]:bg-sidebar group-data-[side=left]:border-none'
      collapsible='icon'
    >
      <SidebarHeader className='min-h-25 px-0 py-4'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className='h-full' asChild>
              <Link
                href='/'
                className='block! w-full! transition-all duration-200 ease-linear group-data-[collapsible=icon]:size-full! group-data-[collapsible=icon]:p-0! hover:bg-transparent!'
              >
                <Image
                  src={logoWithText}
                  alt='logo'
                  width={250}
                  height={50}
                  className='mx-auto w-4/5 object-cover'
                />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className='sidebar-content'>
        <SidebarGroup className='p-0'>
          <SidebarGroupContent>{renderMenu(menuConfig)}</SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
