import React, { createContext, useState, useCallback } from 'react';
import debounce from '../utils/debounce';

interface ContextProps {
  readonly searchText: string;
  readonly setSearchText: (event?: React.ChangeEvent<HTMLInputElement>) => void;
  readonly clearText: () => void;
}

export const SearchContext = createContext<ContextProps>({
  searchText: '',
  setSearchText: () => ({}),
  clearText: () => ({}),
});

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const [searchText, setSearchText] = useState('');

  const debounceCallback = useCallback(
    debounce(value => {
      setSearchText(value);
    }, 250),
    []
  );

  const setText = ({ target: { value } }) => debounceCallback(value);

  const clearText = () => setSearchText('');

  return (
    <SearchContext.Provider value={{ searchText, setSearchText: setText, clearText }}>
      {children}
    </SearchContext.Provider>
  );
};
