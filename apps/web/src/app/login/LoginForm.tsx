import { useLogin } from '@/apis/auth/login';
import { useForm } from 'react-hook-form';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  useToast,
  FormDescription,
} from 'ui';
import { z } from 'zod';
import { loginDtoSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = loginDtoSchema;
type FormValues = z.infer<typeof formSchema>;

const LoginForm = () => {
  const { toast } = useToast();
  const { loading, login } = useLogin();

  const form = useForm<FormValues>({
    defaultValues: {
      identifier: '',
      password: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    await login(data);
    toast({
      title: 'Login successful',
      description:
        "You've successfully logged in to your account, redirecting to dashboard",
      duration: 3000,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="identifier"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormDescription>You can also enter your email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
