import { AxiosInstance } from 'axios';

export const refresh = (axios: AxiosInstance) => axios.post('/auth/refresh');
