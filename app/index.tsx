import { Stack, router } from 'expo-router';
import { Card, Colors } from 'react-native-ui-lib';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CharacterCard from '@/components/CharacterCard';
import useStores from '@/stores/useStores';
import { getChatCharacters } from '@/api/chat-character';

function Home() {
  const { auth } = useStores();
  const { data } = useQuery({
    queryKey: ['characters', auth.isLogged],
    queryFn: getChatCharacters,
    enabled: auth.isLogged,
  });
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
      }}
    >
      <Stack.Screen
        options={{
          title: 'PortableNPC',
          headerRight: () => (
            <Icon.Button
              name="cog"
              backgroundColor={Colors.transparent}
              color={Colors.white}
              onPress={() => router.push('/settings')}
              style={{ paddingLeft: 20 }}
            />
          ),
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
      <Card row onPress={() => router.push({ pathname: '/add-character' })}>
        <Card.Section
          content={[
            {
              text: '+ Add new character',
              text65L: true,
              grey10: true,
              style: { padding: 10 },
            },
          ]}
          flex
          center
        />
      </Card>
    </ScrollView>
  );
}

export default observer(Home);
