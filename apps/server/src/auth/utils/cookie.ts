import { CookieOptions } from 'express';

export const getCookieOptions = (type: 'access' | 'refresh'): CookieOptions => {
  switch (type) {
    case 'access':
      return {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 15), // 15mins
      };
    case 'refresh':
      return {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days
      };
  }
};
