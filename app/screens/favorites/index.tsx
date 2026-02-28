import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { type ReactNode } from 'react';
import { View, Text, ScrollView, StyleSheet} from 'react-native';
import MovieScreen from '@/screens/movie';
import TvSeriesScreen from '@/screens/tv-series';
import { favoritesMovie$, favoritesTvSerie$ } from 'domain/utils';
import { useAtom } from 'jotai';

const FavoritesStack = createNativeStackNavigator();

const initialRouteName = 'favorites-root';


export default function FavoritesScreen(): ReactNode {
  
  return (
    <FavoritesStack.Navigator initialRouteName={initialRouteName}>
      <FavoritesStack.Screen name={initialRouteName} component={Screen}  options={{ headerShown: false }}/>
      <FavoritesStack.Screen name="favorites-movies" component={MovieScreen} options={{ headerShown: false }} />
      <FavoritesStack.Screen
        name="favorites-tv-series"
        component={TvSeriesScreen}
      />
    </FavoritesStack.Navigator>
  );
}

function Screen(): ReactNode {
  const [favoritesMovie] = useAtom(favoritesMovie$)
  const [favoritesTvSerie] = useAtom(favoritesTvSerie$)
  return (
    <>
    <ScrollView>
      <Text style={styles.heading}>Your favorite Movies</Text>
        {!!favoritesMovie && favoritesMovie.length > 0 ? (
          <View>
            {favoritesMovie.map((content) => (
              <View key={content.id} style={styles.card}>
                <Text style={styles.title}>{content.title}</Text>
                <Text>ID: {content.id}</Text>
                <Text>
                  {content.director
                    ? `Director: ${content.director}`
                    : `Creator: ${content.creator}`}
                </Text>
                <Text>Release Year: {content.releaseYear}</Text>
                <Text>Rating: {content.rating}/100</Text>
              </View>
            ))}        
          </View>
        ): (
          <Text style={styles.noFavoriteAddedText}>No favorite movies added yet</Text>
        )}
        <Text style={styles.heading}>Your favorite Tv Series</Text>
        {!!favoritesTvSerie && favoritesTvSerie.length > 0 ? (
          <View>
            {favoritesTvSerie.map((content) => (
              <View key={content.id} style={styles.card}>
                <Text style={styles.title}>{content.title}</Text>
                <Text>ID: {content.id}</Text>
                <Text>
                  {content.director
                    ? `Director: ${content.director}`
                    : `Creator: ${content.creator}`}
                </Text>
                <Text>Release Year: {content.releaseYear}</Text>
                <Text>Rating: {content.rating}/100</Text>
              </View>
            ))}
          </View>
        ): (
          <Text style={styles.noFavoriteAddedText}>No favorite tv series added yet</Text>
        )}
      </ScrollView>
    </>
    
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10
  },
  noFavoriteAddedText: {
    textAlign: 'center',
    color: 'gray',
    fontStyle: 'italic',
    marginVertical: 10,
  },
});
