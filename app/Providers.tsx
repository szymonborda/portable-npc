import { Provider } from 'mobx-react';
import { View, Text } from 'react-native-ui-lib';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { rootStore, trunk } from '@/stores/RootStore';

export const queryClient = new QueryClient();

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

  return (
    <QueryClientProvider client={queryClient}>
      <Provider {...rootStore.getStores()}>{children}</Provider>
    </QueryClientProvider>
  );
}
