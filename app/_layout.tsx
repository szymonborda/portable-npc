import { Stack } from 'expo-router';
import { Colors } from 'react-native-ui-lib';
import '@/consts/theme';
import Providers from './Providers';

export default function Layout() {
  return (
    <Providers>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitleVisible: false,
        }}
      />
    </Providers>
  );
}
