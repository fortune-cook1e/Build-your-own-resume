import { useLogin } from '@/web/apis/auth/login';
import { LoginDto } from '@/web/types/dto/auth/index.dto';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Box,
  Checkbox,
  Button,
} from '@chakra-ui/react';
import { FC } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

interface Props {
  onRegisterClick: () => void;
}

const LoginForm: FC<Props> = ({ onRegisterClick }) => {
  const { loading, login } = useLogin();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginDto>();

  const onSubmit: SubmitHandler<LoginDto> = async (data) => {
    await login(data);
  };

  return (
    <Box>
      <header className="mb-12">
        <h3 className="text-[31px] font-bold">Sign in to </h3>
        <p>Lorem Ipsum is simply </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.identifier)} className="mb-6">
          <FormLabel htmlFor="identifier">User name</FormLabel>
          <Input
            id="identifier"
            type="text"
            placeholder="Enter your username"
            {...register('identifier', {
              required: 'Username is required',
            })}
          />
          <FormErrorMessage>
            {errors.identifier && errors.identifier.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)} className="mb-6">
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

        <Flex justify="space-between" className="mb-6">
          <Box>
            <Checkbox>Remember me</Checkbox>
          </Box>
          <p className="text-[#4D4D4D]">Forgot Password?</p>
        </Flex>

        <Button
          className="mb-[55px] w-full"
          color="white"
          bg="black"
          type="submit"
          isLoading={loading}
        >
          Login
        </Button>

        <p className="text-[#7D7D7D] text-center">
          Don’y have an Account ?{' '}
          <span className="text-black cursor-pointer" onClick={onRegisterClick}>
            Register
          </span>
        </p>
      </form>
    </Box>
  );
};

export default LoginForm;
