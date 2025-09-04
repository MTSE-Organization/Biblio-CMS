import { apiConfig, uploadOptions } from '@/constants';
import { ApiResponse, UploadImageResponseType } from '@/types';
import { http } from '@/utils';

const fileApiRequest = {
  image: async (file: Blob) =>
    await http.post<ApiResponse<UploadImageResponseType>>(
      apiConfig.file.upload,
      {
        body: {
          file: file,
          kind: uploadOptions.AVATAR
        }
      }
    )
};

export default fileApiRequest;
