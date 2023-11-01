import { Card } from 'react-native-ui-lib';
import { router } from 'expo-router';

interface CharacterCardProps {
  title: string;
  image: string;
}

export default function CharacterCard({ title, image }: CharacterCardProps) {
  return (
    <Card row style={{ width: '100%' }} onPress={() => router.push('/char')}>
      <Card.Image
        source={{
          uri: image,
        }}
        style={{ width: 100, height: 100 }}
      />
      <Card.Section
        content={[{ text: title, text65L: true, grey10: true }]}
        flex
        center
      />
    </Card>
  );
}
