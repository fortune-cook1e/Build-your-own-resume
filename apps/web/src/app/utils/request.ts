import { ResponseCode } from '@/web/app/constants/code';
import { createStandaloneToast } from '@chakra-ui/react';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';

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

export default request;
