import { Card } from 'react-native-ui-lib';
import { router } from 'expo-router';

interface CharacterCardProps {
  name: string;
  id?: number;
  description: string;
  image?: string;
}

export default function CharacterCard({
  name,
  description,
  image,
  id,
}: CharacterCardProps) {
  return (
    <Card
      row
      onPress={() =>
        router.push({ pathname: '/chat', params: { name, description, id } })
      }
      style={{ marginBottom: 10 }}
    >
      <Card.Image
        source={
          image
            ? {
                uri: image,
              }
            : require('@/assets/user.png')
        }
        style={{ width: 100, height: 100 }}
      />
      <Card.Section
        content={[{ text: name, text65L: true, grey10: true }]}
        flex
        center
      />
    </Card>
  );
}
