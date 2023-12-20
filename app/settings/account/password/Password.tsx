import { View, Button, Text } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import { ChangePasswordSchema, changePassword } from '@/api/auth';
import FormInput from '@/components/FormInput';

export default function Password() {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(ChangePasswordSchema),
    values: {
      old_password: '',
      new_password: '',
    },
  });
  const { mutate, error } = useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      router.back();
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
      <View style={{ width: '100%' }}>
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
        <Button label="Change" onPress={handleSubmit(handlePasswordChange)} />
        {error && <Text red10>Old password incorrect</Text>}
      </View>
    </View>
  );
}
