export const REDIS_DEFAULT_TTL = 1000 * 60 * 60; // 1 hour

export enum ErrorMessage {
  UserNotFound = 'User not found',
  UserAlreadyExists = 'User already exists',
  InvalidPassword = 'Invalid password',
  InvalidPayload = 'Invalid Payload',
}
