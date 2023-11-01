import { Stack, router } from 'expo-router';
import { Colors } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
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
          headerRight: () => (
            <Icon.Button
              name="cog"
              backgroundColor={Colors.transparent}
              color={Colors.white}
              onPress={() => router.push('/settings')}
              style={{ paddingLeft: 20 }}
            />
          ),
        }}
      />
    </Providers>
  );
}
