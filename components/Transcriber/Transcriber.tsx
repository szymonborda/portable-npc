import { useMutation } from '@tanstack/react-query';
import { Audio } from 'expo-av';
import {
  AndroidAudioEncoder,
  AndroidOutputFormat,
  IOSAudioQuality,
  Recording,
} from 'expo-av/build/Audio';
import { useState } from 'react';
import { Colors } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ActivityIndicator } from 'react-native';
import useStores from '@/stores/useStores';
import { transcribe } from '@/api/transcribe';

interface TranscriberProps {
  setResult: (result: string) => void;
}

export default function Transcriber({ setResult }: TranscriberProps) {
  const { settings } = useStores();
  const [record, setRecord] = useState<Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const { mutate, isPending } = useMutation({
    mutationFn: transcribe,
    onSuccess: ({ data: { message } }) => {
      if (!message.trim()) return;
      setResult(message);
    },
    onError: (err) => {
      console.error('mutation error', err.message);
    },
  });

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const RECORDING_OPTIONS_PRESET_HIGH_QUALITY: any = {
          android: {
            extension: '.mp4',
            outputFormat: AndroidOutputFormat.MPEG_4,
            audioEncoder: AndroidAudioEncoder.AMR_WB,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
          },
          ios: {
            extension: '.wav',
            audioQuality: IOSAudioQuality.LOW,
            sampleRate: 44100,
            numberOfChannels: 2,
            bitRate: 128000,
            linearPCMBitDepth: 16,
            linearPCMIsBigEndian: false,
            linearPCMIsFloat: false,
          },
        };
        const { recording }: any = await Audio.Recording.createAsync(
          RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
        );
        setRecord(recording);
        setIsRecording(true);
      } else {
        // setMessage("Please grant permission to app to access microphone");
      }
    } catch (err) {
      console.error(' Failed to start recording', err);
    }
  }

  async function stopRecording() {
    setIsRecording(false);
    await record!.stopAndUnloadAsync();
    const uri = record!.getURI()!;
    const filetype = uri!.split('.').pop();
    const filename = uri!.split('/').pop();
    mutate({
      language: settings.transcribeLanguage,
      audio: {
        uri,
        type: `audio/${filetype}`,
        name: filename!,
      },
    });
  }

  if (isPending) {
    return <ActivityIndicator size="small" style={{ width: 50 }} />;
  }

  return (
    <Icon.Button
      name={isRecording ? 'stop' : 'microphone'}
      backgroundColor={isRecording ? Colors.red10 : Colors.transparent}
      color={Colors.white}
      onPress={isRecording ? stopRecording : startRecording}
      style={{ paddingLeft: 20 }}
    />
  );
}
