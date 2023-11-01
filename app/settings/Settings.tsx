import { Stack } from 'expo-router';
import { View, Text } from 'react-native-ui-lib';

export default function Settings() {
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Settings',
          headerRight: () => null,
        }}
      />
      <Text>Settings page tbd</Text>
    </View>
  );
}
