import {
  View,
  StyleSheet,
  Image,
  Pressable,
  StyleProp,
  ViewStyle,
  Text
} from 'react-native';

type PosterProps = {
  title: string;
  src: string;
  onFavoritePress: () => void;
  isFavorite: boolean | undefined;
  style?: StyleProp<ViewStyle>;
};

export function Poster(props: PosterProps) {
  return (
    <View style={[styles.wrapper, styles.wrapper]}>
      {props.onFavoritePress && (
        <Pressable
          style={[
            styles.button,
            props.isFavorite
              ? {
                  backgroundColor: 'yellow',
                }
              : { backgroundColor: 'transparent' },
          ]}
          onPress={props.onFavoritePress}
        >
        <Text>
          {props.isFavorite ? '-' : '+'}
        </Text>
        </Pressable>
      )}
      <Image alt={props.title} source={{uri: props.src}} style={styles.image} resizeMode='center'/>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative'
  },
  button: {
    borderWidth: 2,
    position: 'absolute',
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    zIndex: 2,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { width: '100%', height:'90%', borderRadius: 8 },
});
