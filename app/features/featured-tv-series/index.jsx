import { Poster } from '@/ui/poster';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { featuredTvSeries$ } from './state';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Rating } from '@/ui/rating';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TvSeriesDetailedScreen from '@/screens/content-detailed';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator()
const initialRouteName = 'featured-tv-series';

export function FeaturedTvSeries() {
  const [featuredTvSeries] = useAtom(featuredTvSeries$);

  return (
    <View style={styles.root}>
      <Text style={styles.title}>Featured Tv Series</Text>
      <FlatList
        style={styles.list}
        horizontal
        data={featuredTvSeries}
        keyExtractor={(it) => it.id}
        contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
        renderItem={(it) => {
          console.log(it.item.rating);
          return (
            <Entry
              title={it.item.title}
              rating={it.item.rating}
              seasons={it.item.seasons}
            />
          );
        }}
      />
    </View>
  );
}


function Entry({title, rating, seasons}) {

  const navigation = useNavigation()
  const handlePress = () => {
    navigation.navigate('tvSeriesDetailedScreen', {
      title,rating,seasons
    })
  }
  
  return (
    <Pressable onPress={handlePress}>
    <View style={entryStyles.card}>
      <View style={entryStyles.overlay}>
        <Text style={entryStyles.text}>{title}</Text>
        <Rating style={entryStyles.text} value={rating} />
        <Text style={entryStyles.text}>seasons: {seasons.length}</Text>
      </View>
      <Poster
        title={title}
        style={entryStyles.poster}
        src={
          'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/2560px-Image_created_with_a_mobile_phone.png'
        }
      />
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  list: {
    overflow: 'visible',
  },
});

const entryStyles = StyleSheet.create({
  card: {
    height: 240,
    width: 150,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  poster: {
    flex: 1,
    resizeMode: 'cover',
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
