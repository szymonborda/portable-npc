import { Link, Stack } from 'expo-router';
import { Colors } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
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
        headerRight: () => (
          <Link href="/settings">
            <Icon name="cog" color={Colors.white} size={16} />
          </Link>
        ),
      }}
    />
  );
}
