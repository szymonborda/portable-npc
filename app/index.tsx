import { Stack } from 'expo-router';
import { View } from 'react-native-ui-lib';
import CharacterCard from '@/components/CharacterCard';

export default function Home() {
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
        title="Dwarf Edward"
        image="https://preview.redd.it/art-dwarf-warrior-v0-0t2k3788o5sa1.png?auto=webp&s=123dac9ca4f7ffff14b5b6125ff86db0b7f52d59"
      />
    </View>
  );
}
