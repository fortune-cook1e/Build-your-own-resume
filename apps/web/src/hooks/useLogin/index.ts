'use client';

import { login } from '@/web/app/apis/auth.api';
import { useMutation } from '@tanstack/react-query';

// export const useLogin = () => {
//   const {
//     error,
//     isPending: loading,
//     mutateAsync: loginFn,
//   } = useMutation({
//     mutationFn: login,
//     onSuccess: (data) => {
//       console.log('sss', data);
//     },
//   });

//   return {
//     login: loginFn,
//     loading,
//     error,
//   };
// };
