import { EMAIL_REGEXP } from '@/web/app/constants';
import { LoginMode } from '@/web/app/login/page';
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
  onLoginClick: () => void;
}

type FormInputs = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: FC<Props> = ({ onLoginClick }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <header className="mb-12">
        <h3 className="text-[31px] font-bold">Sign up to </h3>
        <p>Lorem Ipsum is simply </p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.email)} className="mb-6">
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeContent="Enter your email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: EMAIL_REGEXP,
                message: 'Entered value does not match email format',
              },
            })}
          />
          <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.username)} className="mb-6">
          <FormLabel>User name</FormLabel>
          <Input
            type="text"
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 6,
                message: 'Username must be at least 6 characters',
              },
              maxLength: {
                value: 10,
                message: 'Username must be at most 10 characters',
              },
            })}
          />
          <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={Boolean(errors.password)} className="mb-6">
          <FormLabel>Password</FormLabel>
          <Input
            placeholder="Your password"
            type="password"
            {...register('password', {
              required: 'Password is required',
              maxLength: {
                value: 15,
                message: 'Password must be at most 12 characters',
              },
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
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
            {...register('confirmPassword', {
              required: 'ConfirmPassword is required',
              validate: (value: string, formValues: FormInputs) => {
                if (value !== formValues.password) {
                  return 'Password does not match';
                }
                return true;
              },
            })}
          />
          <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
        </FormControl>

        <Button className="w-full mb-14" color="white" bg="black" type="submit">
          Register
        </Button>
      </form>

      <p className="text-center text-[#7D7D7D]">
        Already have an Account ?{' '}
        <span className="text-black cursor-pointer" onClick={onLoginClick}>
          Login
        </span>
      </p>
    </Box>
  );
};

export default RegisterForm;
