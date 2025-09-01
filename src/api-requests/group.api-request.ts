import { apiConfig } from '@/constants';
import {
  ApiResponse,
  ApiResponseList,
  GroupBodyType,
  GroupResType,
  GroupSearchParamType
} from '@/types';
import { http } from '@/utils';

const groupApiRequest = {
  getList: async (params?: GroupSearchParamType) =>
    await http.get<ApiResponseList<GroupResType>>(apiConfig.group.getList, {
      params
    }),
  getById: async (id: number) =>
    await http.get<ApiResponse<GroupResType>>(apiConfig.group.getById, {
      pathParams: { id }
    }),
  create: async (body: Partial<GroupBodyType>) =>
    await http.post<ApiResponse<any>>(apiConfig.group.create, {
      body
    }),
  update: async (body: GroupBodyType) =>
    await http.put<ApiResponse<any>>(apiConfig.group.update, {
      body
    }),
  delete: async (id: number) =>
    await http.delete<ApiResponse<any>>(apiConfig.group.delete, {
      params: {
        id
      }
    })
};

export default groupApiRequest;
