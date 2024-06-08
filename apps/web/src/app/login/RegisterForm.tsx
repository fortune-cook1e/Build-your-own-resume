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
} from 'ui';
import { z } from 'zod';
import { registerSchema } from 'shared';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegister } from '@/apis/auth/register';

const formSchema = registerSchema;
type FormValues = z.infer<typeof formSchema>;

const RegisterForm = () => {
  const { toast } = useToast();
  const { loading, register } = useRegister();

  const form = useForm<FormValues>({
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    await register(data);
    toast({
      title: 'Register successful',
      description:
        'You have successfully registered, redirecting to dashboard...',
      duration: 3000,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ConfirmPassword</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your confirmPassword"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full" type="submit" loading={loading}>
          Register
        </Button>
      </form>
    </Form>
  );
};

export default RegisterForm;
