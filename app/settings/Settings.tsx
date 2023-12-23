import { Stack, router } from 'expo-router';
import { observer } from 'mobx-react';
import { View } from 'react-native-ui-lib';
import useStores from '@/stores/useStores';
import MenuList from '@/components/MenuList';

function Settings() {
  const { auth } = useStores();
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />
      <View style={{ width: '100%' }}>
        <MenuList
          // @ts-expect-error .filter(Boolean) incorrectly typed
          data={[
            {
              text: 'App Settings',
              onPress: () => router.push('/settings/app'),
            },
            auth.isLogged && {
              text: 'Account Settings',
              onPress: () => router.push('/settings/account'),
            },
            auth.isLogged && {
              text: 'Logout',
              onPress: () => auth.logout(),
              color: 'red10',
            },
            !auth.isLogged && {
              text: 'Login',
              onPress: () => router.push('/login'),
              color: 'blue10',
            },
            !auth.isLogged && {
              text: 'Create an account',
              onPress: () => router.push('/register'),
              color: 'blue10',
            },
          ].filter(Boolean)}
        />
      </View>
    </View>
  );
}

export default observer(Settings);
