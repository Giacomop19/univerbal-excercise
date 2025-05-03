import React, { ReactNode, useRef } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
  Text,
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
                  <Text>{it.title}</Text>
                </View>
              ))}
        </View>
      )}
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
});
