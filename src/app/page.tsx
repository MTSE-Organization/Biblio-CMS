import { LoadingWrapper } from '@/components/loading';
import { AnimatePresence } from 'framer-motion';

export default async function HomePage() {
  return (
    <AnimatePresence>
      <LoadingWrapper key='loading' />
    </AnimatePresence>
  );
}
