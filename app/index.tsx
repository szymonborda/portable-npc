import { Stack } from 'expo-router';
import { View } from 'react-native-ui-lib';
import { useQuery } from '@tanstack/react-query';
import CharacterCard from '@/components/CharacterCard';
import useStores from '@/stores/useStores';
import { getChatCharacters } from '@/api/chat-character';

export default function Home() {
  const { auth } = useStores();
  const { data } = useQuery({
    queryKey: ['characters', auth.isLogged],
    queryFn: getChatCharacters,
    enabled: auth.isLogged,
  });
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'PortableNPC',
        }}
      />
      <CharacterCard
        name="Dwarf Edward"
        description="You are Dwarf Edward. Help the explorer on his journey."
        image="https://preview.redd.it/art-dwarf-warrior-v0-0t2k3788o5sa1.png?auto=webp&s=123dac9ca4f7ffff14b5b6125ff86db0b7f52d59"
      />
      {auth.isLogged &&
        data?.data.map(({ id, name, description, image }) => (
          <CharacterCard
            key={id}
            name={name}
            description={description}
            image={image}
          />
        ))}
    </View>
  );
}
