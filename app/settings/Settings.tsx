import { Stack, router } from 'expo-router';
import { observer } from 'mobx-react';
import { View, GridList, Text } from 'react-native-ui-lib';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Platform } from 'react-native';
import useStores from '@/stores/useStores';

function Settings() {
  const { auth } = useStores();
  return (
    <View
      style={{ alignItems: 'center', justifyContent: 'center', padding: 10 }}
    >
      <Stack.Screen
        options={{
          title: 'Settings',
        }}
      />
      <View style={{ width: '100%' }}>
        <GridList
          numColumns={1}
          ItemSeparatorComponent={
            Platform.OS !== 'android'
              ? ({ highlighted }) => (
                  <View style={[highlighted && { marginLeft: 0 }]} />
                )
              : null
          }
          data={[
            {
              text: 'App Settings',
              onPress: () => router.push('/settings/app'),
            },
            auth.isLogged
              ? { text: 'Logout', onPress: () => auth.logout(), color: 'red10' }
              : {
                  text: 'Login',
                  onPress: () => router.push('/login'),
                  color: 'blue10',
                },
          ]}
          renderItem={({ item, separators }) => (
            <TouchableHighlight
              key={item.text}
              onPress={item.onPress}
              onShowUnderlay={separators.highlight}
              onHideUnderlay={separators.unhighlight}
            >
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text {...{ [item.color ?? 'black10']: true }}>
                  {item.text}
                </Text>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    </View>
  );
}

export default observer(Settings);
