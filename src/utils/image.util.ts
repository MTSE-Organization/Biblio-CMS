import { AppConstants } from '@/constants';

export const renderImage = (url: string | undefined | null) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${AppConstants.contentRootUrl}${url}`;
};
