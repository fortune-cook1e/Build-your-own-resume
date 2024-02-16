import { ResponseCode } from '@/web/constants/code';
import { createStandaloneToast } from '@chakra-ui/react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refresh } from '@/web/apis/auth/refresh';
import { queryClient } from '@/web/utils/queryClient';
import { QUERY_KEYS } from '@/web/constants';

interface ApiResponse<T> {
  data: T;
  code: ResponseCode;
  message?: string;
}
const { toast } = createStandaloneToast();

const request = axios.create({
  baseURL: '/api',
  timeout: 1000 * 10, // 10s,
});

request.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

request.interceptors.response.use(
  function (response: AxiosResponse<ApiResponse<any>>) {
    const { data } = response;
    switch (data.code) {
      case ResponseCode.Success: {
        return data.data;
      }
      case ResponseCode.Fail: {
        return Promise.reject(data);
      }
      case ResponseCode.InvalidCredentials: {
        return redirect('/login');
      }
      default: {
        return data.data;
      }
    }
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
  },
  // Tip: handle status code >= 400
  function (error) {
    const errorMsg =
      error.response?.data?.message || error.message || 'Request Failed';
    toast({
      title: 'Request Error',
      description: errorMsg,
      status: 'error',
      position: 'top',
    });
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  },
);

const requestForRefresh = axios.create({
  baseURL: '/api',
  timeout: 1000 * 10, // 10s,
});

const handleAuthError = async () => {
  try {
    await refresh(requestForRefresh);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

// Interceptor to handle expired refresh token errors
const handleRefreshFailed = async () => {
  try {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
    window.history.pushState(null, '', '/login');
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};

createAuthRefreshInterceptor(request, handleAuthError, {
  statusCodes: [401, 403],
});
createAuthRefreshInterceptor(requestForRefresh, handleRefreshFailed);

export default request;
