import { Provider } from 'mobx-react';
import { View, Text } from 'react-native-ui-lib';
import { useEffect, useState } from 'react';
import { rootStore, trunk } from '@/stores/RootStore';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [storesLoaded, setStoresLoaded] = useState(false);
  useEffect(() => {
    const rehydrate = async () => {
      await trunk.init();
      setStoresLoaded(true);
    };
    rehydrate();
  }, []);

  if (!storesLoaded) {
    return (
      <View
        style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
      >
        <Text>loading...</Text>
      </View>
    );
  }

  return <Provider {...rootStore.getStores()}>{children}</Provider>;
}
