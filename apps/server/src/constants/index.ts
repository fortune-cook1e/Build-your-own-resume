export const REDIS_DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

export const COOKIE_ACCESS_FIELD = 'Authorization';
export const COOKIE_REFRESH_FIELD = 'Refresh';

export enum ResponseCode {
  Success = 0,
  Error = 2,
}
