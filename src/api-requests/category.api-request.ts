import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const categoryApiRequest = {
  recover: async (id: string) =>
    await http.put<ApiResponse<any>>(apiConfig.category.recover, {
      pathParams: {
        id
      }
    })
};

export default categoryApiRequest;
