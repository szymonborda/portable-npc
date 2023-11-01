import { Stack } from 'expo-router';
import { Text, View } from 'react-native-ui-lib';

export default function Home() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'PortableNPC',
        }}
      />
      <Text h1 primary>
        Home Screen
      </Text>
    </View>
  );
}
