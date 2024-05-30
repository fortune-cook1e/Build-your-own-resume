import { useRegister } from '@/apis/auth/register';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button,
  useToast,
} from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { registerSchema } from 'shared';
import { z } from 'zod';

const formSchema = registerSchema;
type FormValues = z.infer<typeof formSchema>;

interface Props {
  onLoginClick: () => void;
}

const RegisterForm: FC<Props> = ({ onLoginClick }) => {
  const toast = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formSchema),
  });

  const { loading, register: registerFn } = useRegister();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await registerFn(data);
    toast({
      title: 'Success',
      description:
        'You have successfully registered, redirecting to dashboard...',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Box>
      <header className="mb-4">
        <h3 className="text-3xl font-bold">Sign up to </h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter your name"
            {...register('name')}
          />
          <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.email}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register('email')}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.username}>
          <FormLabel>User name</FormLabel>
          <Input
            type="text"
            placeholder="Enter your username"
            {...register('username')}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Your password"
            type="password"
            {...register('password')}
          />
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <FormControl
          isInvalid={Boolean(errors.confirmPassword)}
          className="mb-8"
        >
          <FormLabel>Confirm Password</FormLabel>
          <Input
            placeholder="Confirm your password"
            type="password"
            {...register('confirmPassword')}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button
          className="w-full mb-4"
          color="white"
          bg="black"
          type="submit"
          isLoading={loading}
          loadingText="Registering"
        >
          Register
        </Button>
      </form>

      <p className="text-center text-[#7D7D7D]">
        Already have an Account ?
        <span className="text-black cursor-pointer ml-2" onClick={onLoginClick}>
          Login
        </span>
      </p>
    </Box>
  );
};

export default RegisterForm;
