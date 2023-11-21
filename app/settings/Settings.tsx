import { Link, Stack } from 'expo-router';
import { observer } from 'mobx-react';
import { View, TextField, Button } from 'react-native-ui-lib';
import useStores from '@/stores/useStores';

function Settings() {
  const { settings, auth } = useStores();
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
      <View style={{ width: '100%' }}>
        <TextField
          floatingPlaceholder
          placeholder="OpenAI API Key"
          value={settings.openAIAPIKey}
          onChangeText={(text) => settings.setOpenAIAPIKey(text)}
          formatter={(value) => (value ? value.replace(/./g, '*') : '')}
        />
        {auth.isLogged ? (
          <Button label="Logout" onPress={() => auth.logout()} />
        ) : (
          <Link href="/login">Login</Link>
        )}
      </View>
    </View>
  );
}

export default observer(Settings);
