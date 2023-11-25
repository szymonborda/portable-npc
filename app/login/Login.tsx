import { observer } from 'mobx-react';
import { View, Button, Text } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { ObtainTokenPairSchema, obtainTokenPair } from '@/api/auth';
import FormInput from '@/components/FormInput';
import useStores from '@/stores/useStores';

function Login() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(ObtainTokenPairSchema),
    values: {
      username: '',
      password: '',
    },
  });
  const { auth } = useStores();
  const { mutate, error } = useMutation({
    mutationFn: obtainTokenPair,
    onSuccess: ({ data }) => {
      auth.setTokenPair(data);
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
          headerRight: () => null,
        }}
      />
      <View style={{ width: '100%' }}>
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
        <Button label="Login" onPress={handleSubmit(handleLogin)} />
        {error && (
          <Text red10>No active account found with the given credentials</Text>
        )}
      </View>
    </View>
  );
}

export default observer(Login);
