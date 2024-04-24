import { ResponseCode } from '@/constants/code';
import { createStandaloneToast } from '@chakra-ui/react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { refresh } from '@/apis/auth/refresh';
import { queryClient } from '@/utils/queryClient';
import { QUERY_KEYS } from '@/constants';

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
    const { data, status } = response;
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
    // Todo: 这里如果调用 refresh 接口出现403 Forbidden 返回则会进入catch
    // 出现403的情况： cookie中的refresh token 和存储在user中的refreshToken不一样导致，暂时没找到原因
    // 出现的原因：
    // 1. 在 Postman Debug 接口的时候需要login 一下，而login的时候会重新设置 refreshToken，此时就会出现 user 的refreshToken与当前浏览器的refreshToken冲突的问题
    await refresh(requestForRefresh);
    return Promise.resolve();
  } catch (e) {
    console.log('HandleAuth Error:', e);
    console.log(window.location);
    // FixBug: 这里的跳转由问题 不会自动跳转 需要手动刷新一下
    window.history.replaceState(
      null,
      '',
      `/resume-generator/login?redirect=${window.location.pathname}`,
    );
    return Promise.reject(e);
  }
};

// Interceptor to handle expired refresh token errors
const handleRefreshFailed = async () => {
  try {
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.user] });
    window.history.replaceState(null, '', '/resume-generator/login');
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
