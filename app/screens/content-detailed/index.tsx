import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'
import { View, Text, StyleSheet } from 'react-native';

type TvSeriesScreenProps = {
  route: any;
};

export default function DetailedScreen(props: TvSeriesScreenProps) {

  const { title, rating, season} = props.route

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <Text>Rating: {rating}</Text>
            <Text>Season: {season}</Text>
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
