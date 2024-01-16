import { View, Button, Text, Colors } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { type AxiosError } from 'axios';
import { RegisterData, RegisterSchema, register } from '@/api/auth';
import FormInput from '@/components/FormInput';

export default function Register() {
  const { control, handleSubmit, setError } = useForm<RegisterData>({
    resolver: zodResolver(RegisterSchema),
  });
  const { mutate, error: mutationError } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      router.back();
    },
    onError: (error: AxiosError<RegisterData>) => {
      setError('username', {
        type: 'manual',
        message: error?.response?.data?.username?.[0],
      });
      setError('email', {
        type: 'manual',
        message: error?.response?.data?.email?.[0],
      });
      setError('password', {
        type: 'manual',
        message: error?.response?.data?.password?.[0],
      });
    },
  });

  const handleRegister = (data: RegisterData) => {
    mutate(data);
  };

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Register',
        }}
      />
      <View style={{ width: '100%', gap: 10 }}>
        <FormInput
          name="username"
          control={control}
          defaultValue=""
          placeholder="Login"
        />
        <FormInput
          name="email"
          control={control}
          defaultValue=""
          placeholder="Email"
          keyboardType="email-address"
        />
        <FormInput
          name="password"
          control={control}
          defaultValue=""
          placeholder="Password"
          secureTextEntry
        />
        <Button
          label="Register"
          onPress={handleSubmit(handleRegister)}
          style={{ marginTop: 20 }}
          backgroundColor={Colors.secondary}
        />
        {
          // @ts-expect-error error is incorrectly typed
          mutationError?.response?.data?.detail && (
            // @ts-expect-error error is incorrectly typed
            <Text red10>{mutationError?.response?.data?.detail}</Text>
          )
        }
        {mutationError && !mutationError.response && (
          <Text red10>Network error</Text>
        )}
      </View>
    </View>
  );
}
