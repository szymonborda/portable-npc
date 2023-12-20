import { Stack, router } from 'expo-router';
import { observer } from 'mobx-react';
import { View } from 'react-native-ui-lib';
import { useMutation } from '@tanstack/react-query';
import { Alert } from 'react-native';
import useStores from '@/stores/useStores';
import MenuList from '@/components/MenuList';
import { deleteAccount } from '@/api/auth';

function AccountSettings() {
  const { auth } = useStores();
  const { mutate } = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      auth.logout();
      router.replace('/');
    },
  });
  const handleDelete = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete Account',
          style: 'destructive',
          onPress: () => {
            mutate();
          },
        },
      ],
    );
  };
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Account Settings',
        }}
      />
      <View style={{ width: '100%' }}>
        <MenuList
          data={[
            {
              text: 'Change Password',
              onPress: () => router.push('/settings/account/password'),
            },
            {
              text: 'Delete Account',
              onPress: () => handleDelete(),
              color: 'red10',
            },
          ]}
        />
      </View>
    </View>
  );
}

export default observer(AccountSettings);
