import { Platform } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { GridList, View, Text } from 'react-native-ui-lib';

interface MenuListProps {
  data: {
    text: string;
    onPress: () => any;
    color?: string;
  }[];
}

export default function MenuList({ data }: MenuListProps) {
  return (
    <GridList
      numColumns={1}
      ItemSeparatorComponent={
        Platform.OS !== 'android'
          ? ({ highlighted }) => (
              <View style={[highlighted && { marginLeft: 0 }]} />
            )
          : null
      }
      data={data}
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
              borderRadius: 10,
              backgroundColor: 'white',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Text {...{ [item.color ?? 'black10']: true }}>{item.text}</Text>
          </View>
        </TouchableHighlight>
      )}
    />
  );
}
