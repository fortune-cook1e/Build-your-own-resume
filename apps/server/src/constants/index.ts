export const REDIS_DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

export enum ErrorMessage {
  UserNotFound = 'User not found',
  UserAlreadyExists = 'User already exists',
  InvalidPassword = 'Invalid password',
  InvalidPayload = 'Invalid Payload',
}

export const COOKIE_ACCESS_EXPIRE = new Date(Date.now() + 1000 * 60 * 15); // 15 minutes
export const COOKIE_REFRESH_EXPIRE = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 2,
); // 2 days

export const COOKIE_ACCESS_FIELD = 'Authorization';
export const COOKIE_REFRESH_FIELD = 'Refresh';
