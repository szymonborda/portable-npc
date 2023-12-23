import { View, Button, Text, Colors } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { AxiosError } from 'axios';
import {
  ChangePasswordData,
  ChangePasswordSchema,
  changePassword,
} from '@/api/auth';
import FormInput from '@/components/FormInput';

export default function Password() {
  const { control, handleSubmit, setError } = useForm<ChangePasswordData>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const { mutate, error: mutationError } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      router.back();
    },
    onError: (error: AxiosError<ChangePasswordData>) => {
      setError('old_password', {
        type: 'manual',
        message: error?.response?.data?.old_password?.[0],
      });
      setError('new_password', {
        type: 'manual',
        message: error?.response?.data?.new_password?.[0],
      });
    },
  });

  const handlePasswordChange = (data: {
    old_password: string;
    new_password: string;
  }) => {
    mutate(data);
  };

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Change password',
        }}
      />
      <View style={{ width: '100%', gap: 10 }}>
        <FormInput
          name="old_password"
          control={control}
          defaultValue=""
          placeholder="Old password"
          secureTextEntry
        />
        <FormInput
          name="new_password"
          control={control}
          defaultValue=""
          placeholder="New password"
          secureTextEntry
        />
        <Button
          label="Change"
          onPress={handleSubmit(handlePasswordChange)}
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
