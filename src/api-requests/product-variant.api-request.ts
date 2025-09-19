import { apiConfig } from '@/constants';
import { ApiResponse } from '@/types';
import { http } from '@/utils';

const productVariantApiRequest = {
  recover: async (id: string) =>
    await http.put<ApiResponse<any>>(apiConfig.productVariant.recover, {
      pathParams: {
        id
      }
    })
};

export default productVariantApiRequest;
