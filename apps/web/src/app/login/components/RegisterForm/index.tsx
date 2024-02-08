import { LoginMode } from '@/web/app/login/page';
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

interface Props {
  onLoginClick: () => void;
}

const RegisterForm: FC<Props> = ({ onLoginClick }) => {
  return (
    <Box>
      <header className="mb-12">
        <h3 className="text-[31px] font-bold">Sign up to </h3>
        <p>Lorem Ipsum is simply </p>
      </header>

      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" className="mb-6" placeContent="Enter your email" />

        <FormLabel>User name</FormLabel>
        <Input type="text" className="mb-6" />

        <FormLabel>Password</FormLabel>
        <Input placeholder="Your password" type="password" className="mb-6" />

        <FormLabel>Confirm Password</FormLabel>
        <Input placeholder="Your password" type="password" className="mb-8" />

        <Button className="w-full mb-14" color="white" bg="black">
          Register
        </Button>

        <p className="text-center text-[#7D7D7D]">
          Already have an Account ?{' '}
          <span className="text-black cursor-pointer" onClick={onLoginClick}>
            Login
          </span>
        </p>
      </FormControl>
    </Box>
  );
};

export default RegisterForm;
