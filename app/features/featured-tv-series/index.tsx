import { Poster } from '@/ui/poster';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native';
import { file$, featuredTvSeries$ } from './state';
import { useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { Rating } from '@/ui/rating';
import { fileReader } from '@/utils';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type Props = {
  style?: any;
};

export function FeaturedTvSeries({ style }: Props): JSX.Element | null {
  const stateLoadable = useAtomValue(loadable(featuredTvSeries$));
  const navigation = useNavigation()

  const posterFile = useAtomValue(loadable(file$))
  let blob : string = ''
  if(posterFile.state == 'hasData') blob = posterFile.data.url
  
  const [favorites, setFavorites] = useState<Set<string>>();

  function toggleFavorite(id: string) {
    setFavorites((prev) =>{
      const updated = new Set(prev)
      if(updated.has(id)) {
        updated.delete(id)
      }else{
        updated.add(id)
      }
      return updated
    });
  }

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
          <Text style={styles.title}>Featured Tv Series</Text>
          <ScrollView horizontal style={styles.list}>
            {stateLoadable.data.map((it, index) => (
              <Pressable 
                key={it.id ?? index}
                onPress={() => navigation.navigate('tv-series-screen', {data : it, poster: blob})}
              >
              <View  style={styles.card}>
                <View style={styles.overlay}>
                  <Text style={styles.text}>{it.title}</Text>
                  <Rating style={styles.text} value={it.rating} />
                </View>
                <Poster
                  key={index}
                  style={styles.poster}
                  isFavorite={favorites?.has(it.id)}
                  title={it.title}
                  onFavoritePress={() => toggleFavorite(it.id)}
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
