import { COOKIE_ACCESS_EXPIRE, COOKIE_REFRESH_EXPIRE } from '@/constants';
import { CookieOptions } from 'express';

export const getCookieOptions = (type: 'access' | 'refresh'): CookieOptions => {
  switch (type) {
    case 'access':
      return {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: COOKIE_ACCESS_EXPIRE,
      };
    case 'refresh':
      return {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: COOKIE_REFRESH_EXPIRE,
      };
  }
};
