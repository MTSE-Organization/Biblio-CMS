import { accountApiRequest } from '@/api-requests';
import { ProfileBodyType } from '@/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useProfileQuery = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => await accountApiRequest.getProfile(),
    enabled: false
  });
};

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-profile'],
    mutationFn: async (body: ProfileBodyType) => {
      const res = await accountApiRequest.updateProfile(body);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      return res;
    }
  });
};
