import { View, Text, ScrollView, Image, StyleSheet } from 'react-native';

type TvSeriesScreenProps = {
  route: any;
};

export default function TvSeriesScreen(props: TvSeriesScreenProps) {
  const { title, rating, description, genres, seasons, creator, releaseYear } = props.route.params.tvSeries;
  const posterUrl = props.route.params.poster
  console.log(props.route)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: posterUrl }} style={styles.image} resizeMode="cover" />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.rating}>⭐ {rating}/100</Text>
      <Text style={styles.description}>Creator: {creator}</Text>
      <Text style={styles.description}>Released: {releaseYear}</Text>

      {genres && (
        <View style={styles.genres}>
          {genres.map((g: string) => (
            <Text key={g} style={styles.genre}>
              {g}
            </Text>
          ))}
        </View>
      )}

      {description && <Text style={styles.description}>{description}</Text>}

      {seasons && (
        <View style={styles.seasonsContainer}>
          <Text style={styles.sectionTitle}>Seasons</Text>
          {seasons.map((season: any, index: number) => (
            <View key={index} style={styles.seasonCard}>
              <Text style={styles.seasonTitle}>Season {index + 1}</Text>
              {season.episodes && (
                <Text style={styles.episodeCount}>
                  Episodes: {season.episodes.length}
                </Text>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rating: {
    fontSize: 16,
    marginBottom: 16,
  },
  genres: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  genre: {
    backgroundColor: '#eee',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: '#444',
    marginBottom: 24,
  },
  seasonsContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  seasonCard: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  seasonTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  episodeCount: {
    fontSize: 14,
    color: '#666',
  },
});
