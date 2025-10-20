'use client';

import List from '@/components/list';
import { NoData } from '@/components/no-data';
import { useAuthStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function DropDownNotification() {
  const { socket } = useAuthStore();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    socket?.on('notification', (data) => {
      console.log(data);
    });
  }, [socket]);

  return (
    <div
      className='relative z-1 flex items-center gap-4'
      //   onMouseEnter={() => setOpen(true)}
      //   onMouseLeave={() => setOpen(false)}
    >
      <div className='flex cursor-pointer items-center gap-2'>
        <Bell className='size-7' />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.5, transformOrigin: '75% -20%' }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ duration: 0.1, ease: 'linear' }}
            className='absolute top-full -right-10 mt-4 min-h-[80vh] w-120 rounded-md bg-white shadow-[0px_0px_10px_8px] shadow-gray-200'
          >
            <div className='z-2 before:absolute before:-top-4 before:left-0 before:h-4 before:w-full before:bg-transparent'></div>
            <div className='absolute -top-3 right-9.5 border-r-15 border-b-15 border-l-15 border-r-transparent border-b-white border-l-transparent'></div>
            <List className='flex flex-col gap-y-2 p-1'></List>
            <NoData className='min-h-full' content='Không có thông báo nào' />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
