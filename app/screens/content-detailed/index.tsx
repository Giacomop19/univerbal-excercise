import React, { ReactNode } from 'react'
import { View, Text, StyleSheet } from 'react-native';

export default function ContentDetailed({route}) {
    const {movie} = route.params

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>Rating: {movie.rating}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      padding: 24,
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 12,
    },
  });
