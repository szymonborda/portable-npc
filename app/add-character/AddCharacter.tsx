import { View, Button, Text } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router, Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Platform } from 'react-native';
import FormInput from '@/components/FormInput';
import {
  AddCharacterData,
  AddCharacterSchema,
  addChatCharacter,
} from '@/api/chat-character';

export default function AddCharacter() {
  const { control, handleSubmit, setValue, getFieldState } = useForm({
    resolver: zodResolver(AddCharacterSchema),
    values: {
      name: '',
      description: '',
      image: {
        name: '',
        type: '',
        uri: '',
      },
    },
  });
  const { mutate, error } = useMutation({
    mutationFn: addChatCharacter,
    onSuccess: () => {
      router.replace({ pathname: '/' });
    },
  });

  const handleAdd = (data: AddCharacterData) => {
    mutate(data);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0,
      allowsMultipleSelection: false,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setValue('image', {
        name: image.fileName ?? `image.${image.uri.split('.').pop()}`,
        type: 'image',
        uri:
          Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
      });
    }
  };

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Add character',
          headerRight: () => null,
        }}
      />
      <View style={{ width: '100%' }}>
        <FormInput
          name="name"
          control={control}
          defaultValue=""
          placeholder="Name"
        />
        <FormInput
          name="description"
          control={control}
          defaultValue=""
          placeholder="Description"
        />
        <Button label="Choose photo" onPress={pickImage} />
        {getFieldState('image')?.error?.message && (
          <Text red10>{getFieldState('image')?.error?.message}</Text>
        )}
        <Button label="Add character" onPress={handleSubmit(handleAdd)} />
        {error && (
          <Text red10>No active account found with the given credentials</Text>
        )}
      </View>
    </View>
  );
}
