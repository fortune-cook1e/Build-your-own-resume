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
  onRegisterClick: () => void;
}

const LoginForm: FC<Props> = ({ onRegisterClick }) => {
  return (
    <Box>
      <header className="mb-12">
        <h3 className="text-[31px] font-bold">Sign in to </h3>
        <p>Lorem Ipsum is simply </p>
      </header>

      <FormControl>
        <FormLabel>User name</FormLabel>
        <Input type="text" className="mb-6" />

        <FormLabel>Password</FormLabel>
        <Input placeholder="Your password" type="text" className="mb-[23px]" />

        <Flex justify="space-between" className="mb-6">
          <Box>
            <Checkbox>Remember me</Checkbox>
          </Box>
          <p className="text-[#4D4D4D]">Forgot Password?</p>
        </Flex>

        <Button className="mb-[55px] w-full" color="white" bg="black">
          Login
        </Button>

        <p className="text-[#7D7D7D] text-center cursor-pointer">
          Don’y have an Account ?{' '}
          <span className="text-black" onClick={onRegisterClick}>
            Register
          </span>
        </p>
      </FormControl>
    </Box>
  );
};

export default LoginForm;
