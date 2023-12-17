import { Stack } from 'expo-router';
import { observer } from 'mobx-react';
import { View, TextField } from 'react-native-ui-lib';
import useStores from '@/stores/useStores';
import { Picker } from 'react-native-ui-lib/src/components/picker';
import { TRANSCRIBE_LANGUAGES, TranscribeLanguage } from '@/consts/languages';

const languagesPickerItems = TRANSCRIBE_LANGUAGES.map((lang) => ({
  label: lang,
  value: lang,
}));

function AppSettings() {
  const { settings } = useStores();
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'App Settings',
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
        <Picker
          floatingPlaceholder
          placeholder="Transcription Language"
          value={settings.transcribeLanguage}
          onChange={(value) =>
            settings.setTranscribeLanguage(value as TranscribeLanguage)
          }
          topBarProps={{ title: 'Transcription Language' }}
          items={languagesPickerItems}
        />
      </View>
    </View>
  );
}

export default observer(AppSettings);
