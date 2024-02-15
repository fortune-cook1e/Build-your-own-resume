import { Axios } from 'axios';

export const refresh = (axios: Axios) => axios.post('/auth/refresh');
