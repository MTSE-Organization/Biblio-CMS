import envConfig from '@/config';

const apiUrl = envConfig.NEXT_PUBLIC_API_ENDPOINT_URL;

const AppConstants = {
  apiUrl,
  contentRootUrl: `${apiUrl}v1/file/download`
};

export default AppConstants;
