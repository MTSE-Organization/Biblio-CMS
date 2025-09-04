import { fileApiRequest } from '@/api-requests';
import { useMutation } from '@tanstack/react-query';

export const useUploadImageMutation = () => {
  return useMutation({
    mutationFn: async (file: Blob) => await fileApiRequest.image(file)
  });
};
