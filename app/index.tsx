import { Stack, router } from 'expo-router';
import { Card, Colors } from 'react-native-ui-lib';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/FontAwesome';
import CharacterCard from '@/components/CharacterCard';
import useStores from '@/stores/useStores';
import { getChatCharacters } from '@/api/chat-character';
import COMMON_NPCS from '@/consts/npcs';

function Home() {
  const { auth } = useStores();
  const { data } = useQuery({
    queryKey: ['characters', auth.userId],
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
      {COMMON_NPCS.map(({ name, description, image }) => (
        <CharacterCard
          key={name}
          name={name}
          description={description}
          image={image}
        />
      ))}
      {auth.isLogged &&
        data?.data.map(({ id, name, description, image }) => (
          <CharacterCard
            key={id}
            id={id}
            name={name}
            description={description}
            image={image}
          />
        ))}
      <Card
        row
        onPress={() => router.push({ pathname: '/add-character' })}
        backgroundColor={Colors.secondary}
      >
        <Card.Section
          content={[
            {
              text: '+ Add new character',
              text65L: true,
              white: true,
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
