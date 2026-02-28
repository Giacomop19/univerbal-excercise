import { List } from '@/ui/list';
import { useAtom } from 'jotai';
import { loadable } from 'jotai/utils';
import { useEffect, useState, type ReactNode } from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, View } from 'react-native';
import { topRatedMovies$ } from './state';
import { TVSeries } from 'domain/tv-series';
import { getTopRatedTvSeriesQuery } from '@/infrastructure/repositories/tv-series';
import { Loader } from '@/ui/loader';

// Displays movies with rating above 75%
export default function TopRatedScreen(): ReactNode {
  const [topRatedMoviesLoadable] = useAtom(loadable(topRatedMovies$));

  const [tvSeres, set] = useState<TVSeries[]>([]);

  // fetches data for tv series
  useEffect(() => {
    getTopRatedTvSeriesQuery().then((res) => {
      set(res as TVSeries[]);
    });
  }, []);

  if (topRatedMoviesLoadable.state === 'loading') {
    return <Loader />;
  }

  // error
  if (topRatedMoviesLoadable.state === 'hasError') {
    return <Text>{JSON.stringify(topRatedMoviesLoadable.error)}</Text>;
  }

  if (topRatedMoviesLoadable.state === 'hasData') {
    return (
      //FlatList was causing an error when inside a ScrollView, tipically happens when nested
      <>
        <ScrollView style={styles.contentContainer}>
            {/* movies */}
            <View style={styles.section}>
              <Text style={styles.title}>Top rated movies</Text>
              <List data={topRatedMoviesLoadable.data} />
            </View>

            {/* tv series */}
            <View style={styles.section}>
              <Text style={styles.title}>Top rated tv series</Text>
              <List data={tvSeres} />
            </View>
        </ScrollView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222'
  },
  container: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    padding: 15
  },
  contentContainer: {
    padding : 15
  },
  section:{
    marginBottom: 30
  }
});
