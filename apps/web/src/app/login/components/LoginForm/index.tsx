import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
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

type FormInputs = {
  username: string;
  password: string;
};

const LoginForm: FC<Props> = ({ onRegisterClick }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log({ data });
  };

  return (
    <Box>
      <header className="mb-12">
        <h3 className="text-[31px] font-bold">Sign in to </h3>
        <p>Lorem Ipsum is simply </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.username)} className="mb-6">
          <FormLabel htmlFor="username">User name</FormLabel>
          <Input
            id="username"
            type="text"
            placeholder="Enter your username"
            {...register('username', {
              required: 'Username is required',
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
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
