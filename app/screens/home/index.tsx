import { FeaturedMovies } from '@/features/featured-movies';
import { FeaturedTvSeries } from '@/features/featured-tv-series';
import { Search } from '@/features/search';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Suspense, type ReactNode } from 'react';
import { View, StyleSheet} from 'react-native';
import DetailedScreen from '../content-detailed';

const HomeStack = createNativeStackNavigator()

const initialRoute = 'Search'

export default function HomeScreen(): ReactNode {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={initialRoute} component={Screen} options={{ headerShown: false }}/>
      <HomeStack.Screen name={'Content detailed'} component={DetailedScreen} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
    
  );
}

function Screen() : ReactNode {
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Search/>
      </View>
      <FeaturedMovies style={{ marginBottom: 40 }} />
      {/* <FeaturedTvSeries />  */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : '#d3d3d3',
  }
});