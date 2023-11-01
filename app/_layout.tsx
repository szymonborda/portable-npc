import { Stack } from 'expo-router';
import { Colors } from 'react-native-ui-lib';
import '@/consts/theme';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: Colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    />
  );
}
