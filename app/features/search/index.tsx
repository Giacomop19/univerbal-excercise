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

export type SearchProps = {
  style?: StyleProp<ViewStyle>;
};

export function Search({ style }: SearchProps): ReactNode {
  const inputRef = useRef<TextInput>(null);
  const [inputValue, setInputValue] = useAtom(inputValue$);
  const suggestions = useAtomValue(loadable(suggestions$));
  const [selectedMovie, setSelectedMovie] = useState<any>(null)

  return (
    <View style={[searchStyles.container, style]}>
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
            : suggestions.data.map((it) => (
                <View style={searchStyles.suggestionEntry}>
                  <Pressable
                    key={it.id}
                    style={searchStyles.suggestionEntry}
                    onPress={() => setSelectedMovie(it)}>
                  <Text>{it.title}</Text>
                  </Pressable>
                </View>
              ))}
        </View>
      )}
      <Modal
        visible={!!selectedMovie}
        transparent
        animationType='fade'
        onRequestClose={() => setSelectedMovie(null)}
        >
          <View style={modalStyles.overlay}>
          <View style={modalStyles.modal}>
            <Text style={modalStyles.title}>{selectedMovie?.title}</Text>
            <Text>Rating: {selectedMovie?.rating}</Text>
            <Pressable onPress={() => setSelectedMovie(null)} style={modalStyles.closeButton}>
              <Text style={{ color: 'white' }}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const searchStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    margin: 16,
    height: 40,
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
    top: 45,
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
  },
  suggestionEntry: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8
  }
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