import React, { ReactNode, useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
  Pressable,
  Modal,
} from 'react-native';
import { inputValue$, suggestions$ } from './state';
import { useAtom, useAtomValue } from 'jotai';
import { loadable } from 'jotai/utils';
import { useNavigation } from '@react-navigation/native';

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const [selectedType, setSelectedType] = useState<'movie' | 'tv' | null>(null);
  const suggestions = useAtomValue(loadable(suggestions$));
  const navigation = useNavigation()
  const filteredSuggestions = suggestions.state === 'hasData'
    ? suggestions.data.filter((it) => {
      const query = inputValue?.toLowerCase();
      const titleMatches = it.title.toLowerCase().includes(query as string);

      // Determine type: if it has 'seasons', it's a TV series
      const isTv = it?.seasons !== undefined;
      const isMovie = !isTv;

      if (selectedType === 'movie' && !isMovie) return false;
      if (selectedType === 'tv' && !isTv) return false;

      return titleMatches;
    })
    : []


  return (
    <View style={[searchStyles.container, style]}>
      <View style={searchStyles.typeSelector}>
      <Pressable 
        style={[
          searchStyles.typeButton,
          selectedType === 'movie' && searchStyles.selectedTypeButton,
        ]}
        onPress={() => setSelectedType('movie')}
      >
      <Text style={searchStyles.typeButtonText}>Movie</Text>
      </Pressable>
      <Pressable
        style={[
          searchStyles.typeButton,
          selectedType === 'tv' && searchStyles.selectedTypeButton,
        ]}
        onPress={() => setSelectedType('tv')}
      >
        <Text style={searchStyles.typeButtonText}>Tv Serie</Text>
      </Pressable>
      </View>
      <TextInput
        ref={inputRef}
        style={[searchStyles.input]}
        placeholder="type to search..."
        onChangeText={setInputValue}
        value={inputValue}
      />

      {!inputValue ? null : (
        <View style={searchStyles.suggestions}>
          {suggestions.state !== 'hasData'
            ? null
            : filteredSuggestions.map((it, index) => (
                <View key={index ?? it.id} style={searchStyles.suggestionEntry}>
                  <Pressable
                    key={it.id}
                    style={searchStyles.suggestionEntry}
                    onPress={() => {
                      const isTvSeries = it.seasons !== undefined;
                      const screenName = isTvSeries ? 'tv-series-screen' : 'movie-screen';
                      
                      navigation.navigate(screenName, {data: it})
                    }}>
                  <Text>{it.title}</Text>
                  </Pressable>
                </View>
              ))}
        </View>
      )}
    </View>
  );
}

const searchStyles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    margin: 16,
    height: 100,
    position:'relative',
    padding : 10
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  suggestions: {
    left: 0,
    right: 0,
    top: 100,
    position: 'absolute',
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 8,
    paddingVertical : 4,
    shadowColor : '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000
  },
  suggestionEntry: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  },
  typeSelector: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 12,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#ddd',
  },
  selectedTypeButton: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 6,
  },
});