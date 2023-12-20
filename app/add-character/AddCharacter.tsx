import { View, Button, Text, Image } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import Icon from 'react-native-vector-icons/FontAwesome';
import { router, Stack } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Alert, ImageSourcePropType, Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import FormInput from '@/components/FormInput';
import {
  AddCharacterData,
  AddCharacterSchema,
  addChatCharacter,
} from '@/api/chat-character';
import useStores from '@/stores/useStores';

function AddCharacter() {
  const { control, handleSubmit, setValue, getFieldState } = useForm({
    resolver: zodResolver(AddCharacterSchema),
    values: {
      name: '',
      description: '',
    } as AddCharacterData,
  });
  const { mutate, error } = useMutation({
    mutationFn: addChatCharacter,
    onSuccess: () => {
      router.replace({ pathname: '/' });
    },
  });

  const {
    auth: { isLogged },
  } = useStores();

  const [currentImageSource, setCurrentImageSource] =
    useState<ImageSourcePropType>(require('@/assets/user.png'));

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
      setCurrentImageSource({
        uri: image.uri,
      });
    }
  };

  useEffect(() => {
    if (!isLogged) {
      Alert.alert('Login required', 'Please login to add a new character.', [
        {
          text: 'Cancel',
          style: 'cancel',
          onPress: () => {
            router.back();
          },
        },
        {
          text: 'Login',
          onPress: () => {
            router.replace({ pathname: '/login' });
          },
        },
      ]);
    }
  }, [isLogged]);

  const imageState = getFieldState('image');

  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Add character',
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
        <View onTouchEnd={pickImage}>
          <Image
            source={currentImageSource}
            style={{ width: 100, height: 100, position: 'relative' }}
          />
          <Icon
            name="edit"
            size={50}
            style={{ position: 'absolute', opacity: 0.5, top: 25, left: 25 }}
            color="white"
          />
        </View>
        {imageState?.error?.message && (
          <Text red10>{imageState?.error?.message}</Text>
        )}
        <Button label="Add character" onPress={handleSubmit(handleAdd)} />
        {error && <Text red10>{error.message}</Text>}
      </View>
    </View>
  );
}

export default observer(AddCharacter);
