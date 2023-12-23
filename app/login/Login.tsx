import { observer } from 'mobx-react';
import { View, Button, Text, Colors } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { AxiosError } from 'axios';
import {
  ObtainTokenPairData,
  ObtainTokenPairSchema,
  obtainTokenPair,
} from '@/api/auth';
import FormInput from '@/components/FormInput';
import useStores from '@/stores/useStores';

function Login() {
  const { control, handleSubmit, setError } = useForm<ObtainTokenPairData>({
    resolver: zodResolver(ObtainTokenPairSchema),
  });
  const { auth } = useStores();
  const { mutate, error: mutationError } = useMutation({
    mutationFn: obtainTokenPair,
    onSuccess: ({ data }) => {
      auth.login(data);
    },
    onError: (error: AxiosError<ObtainTokenPairData>) => {
      setError('username', {
        type: 'manual',
        message: error.response?.data?.username?.[0],
      });
      setError('password', {
        type: 'manual',
        message: error.response?.data?.password?.[0],
      });
    },
  });

  const handleLogin = (data: { username: string; password: string }) => {
    mutate(data);
  };

  if (auth.isLogged) router.back();

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Login',
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
          name="password"
          control={control}
          defaultValue=""
          placeholder="Password"
          secureTextEntry
        />
        <Button
          label="Login"
          onPress={handleSubmit(handleLogin)}
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

export default observer(Login);
