import { Poster } from '@/ui/poster';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { file$, movies$ } from './state';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { Rating } from '@/ui/rating';
import { useNavigation } from '@react-navigation/native';
import { favoritesMovie$ } from 'domain/utils';

type Props = {
  style?: any;
};

export function FeaturedMovies({ style }: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(movies$));
  const navigation = useNavigation()

  const posterFile = useAtomValue(loadable(file$))
  let blob : string = ''
  if(posterFile.state == 'hasData') blob = posterFile.data.url
  
  const [favorites, setFavorites] = useAtom(favoritesMovie$);

  const toggleFavorite = async (movie: any) => {
    const isFav = favorites?.some((item) => item.id === movie.id)
    if (isFav) {
      await setFavorites((prev) => prev.filter((item) => item.id !== movie.id));
    } else {
      await setFavorites((prev) => [...prev, movie]);
    }
  };

  switch (stateLoadable.state) {
    case 'hasError':
    case 'loading': {
      return (
      <View style={styles.loader}>
        <Text>Loading ...</Text>
        <ActivityIndicator size='small'/> 
      </View>
      )
    }
    case 'hasData': {
      return (
        <View style={[styles.root, style]}>
          <Text style={styles.title}>Featured Movies</Text>
          <ScrollView horizontal style={styles.list}>
            {stateLoadable.data.map((it, index) => (
              <Pressable 
                key={it.id ?? index}
                onPress={() => navigation.navigate('movie-screen', {data : it, poster: blob})}
              >
              <View style={styles.card}>
                <View style={styles.overlay}>
                  <Text style={styles.text}>{it.title}</Text>
                  <Rating style={styles.text} value={it.rating} />
                </View>
                <Poster
                  key={index}
                  style={styles.poster}
                  isFavorite={favorites?.some((item) => item.id === it.id)}
                  title={it.title}
                  onFavoritePress={() => toggleFavorite(it)}
                  src={blob}
                />
              </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
  },
  root: {
    padding: 10,
    zIndex: -1
  },
  poster: {
    flex: 1,
    
  },
  title: {
    marginBottom: 20,
  },
  list: {
    overflow: 'visible',
  },
  card: {
    height: 240,
    width: 150,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  text: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
  },
});
