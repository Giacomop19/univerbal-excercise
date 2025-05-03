import { ReactNode } from 'react';
import {
  FlatList,
  StyleProp,
  View,
  ViewStyle,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';

import { Rating } from '../rating';

type ListProps = {
  style?: StyleProp<ViewStyle>;
  data: { id: string }[];
};

export function List({ style, data }: ListProps): ReactNode {
  return (
      <FlatList
        style={style}
        data={data}
        keyExtractor={(it) => it.id}
        renderItem={(it) => {
          return (
            <ListEntry
              style={undefined}
              rating={(it.item as any).rating}
              title={(it.item as any).title}
            />
          );
        }}
      />
  );
}

type ListEntryProps = {
  style: any | undefined;
  title: string;
  rating: number;
};

function ListEntry({ style, title, rating }: ListEntryProps): ReactNode {
  // top rated has to have a rating above 75%
  const isHighlighted = rating > 75

  return (
    <View style={[styles.card, isHighlighted && styles.highlightedCard]}>
      <Text style={styles.title}>{title}</Text>
      <Rating value={rating} />
    </View>
  );
}
const styles = StyleSheet.create({
  listContent: {
    padding:12
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  highlightedCard: {
    borderWidth: 1,
    borderColor: 'gold',
    padding: 12,
    backgroundColor: 'gold'
  },
  title: {
    fontSize: 14,
    fontWeight: 600,
    marginBottom: 5,
    color: '#333'
  }
})
