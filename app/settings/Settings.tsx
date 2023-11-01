import { Stack } from 'expo-router';
import { observer } from 'mobx-react';
import { View, TextField } from 'react-native-ui-lib';
import useStores from '@/stores/useStores';

function Settings() {
  const { settings } = useStores();
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
      <TextField
        floatingPlaceholder
        placeholder="OpenAI API Key"
        value={settings.openAIAPIKey}
        onChangeText={(text) => settings.setOpenAIAPIKey(text)}
      />
    </View>
  );
}

export default observer(Settings);
