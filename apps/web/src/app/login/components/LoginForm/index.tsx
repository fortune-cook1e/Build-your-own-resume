import { useLogin } from '@/apis/auth/login';
import { loginDtoSchema } from 'shared';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Box,
  Checkbox,
  Button,
  useToast,
} from '@chakra-ui/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = loginDtoSchema;
type FormValues = z.infer<typeof formSchema>;

interface Props {
  onRegisterClick: () => void;
}

const LoginForm: FC<Props> = ({ onRegisterClick }) => {
  const toast = useToast();
  const { loading, login } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      identifier: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await login(data);
    toast({
      title: 'Login success',
      description: 'Welcome to the app, redirecting to dashboard...',
      status: 'success',
      duration: 3000,
      isClosable: true,
      position: 'top',
    });
  };

  return (
    <Box>
      <header className="mb-4">
        <h3 className="text-3xl font-bold">Sign in to resume generator </h3>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormControl isInvalid={!!errors.identifier}>
          <FormLabel htmlFor="identifier">User name</FormLabel>
          <Input
            id="identifier"
            type="text"
            placeholder="Enter your username"
            {...register('identifier')}
          />
          <FormErrorMessage>
            {errors.identifier && errors.identifier.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            placeholder="Your password"
            type="password"
            {...register('password', {
              required: 'Password is required',
            })}
          />

          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        {/* <Flex justify="space-between">
          <Box>
            <Checkbox>Remember me</Checkbox>
          </Box>
          <p className="text-[#4D4D4D]">Forgot Password?</p>
        </Flex> */}

        <Button
          className="w-full"
          color="white"
          bg="black"
          type="submit"
          isLoading={loading}
        >
          Login
        </Button>

        <p className="text-[#7D7D7D] text-center">
          Don’t have an Account?
          <span
            className="text-black cursor-pointer ml-2"
            onClick={onRegisterClick}
          >
            Register
          </span>
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;
