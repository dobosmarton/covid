import React, { createContext, useState, useCallback } from "react";
import debounce from "../utils/debounce";

interface ContextProps {
  readonly loading: boolean;
  readonly error: string | null;
  readonly setActiveFilter: (value: string) => void;
}

export const SearchContext = createContext<ContextProps>({
  searchText: "",
  setSearchText: () => ({})
});

export const SearchProvider: React.FC<{}> = ({ children }) => {
  const [searchText, setSearchText] = useState("");

  const debounceCallback = useCallback(
    debounce(value => {
      setSearchText(value);
    }, 250),
    []
  );

  const setText = ({ target: { value } }) => debounceCallback(value);

  const clearText = () => setSearchText("");

  return (
    <SearchContext.Provider
      value={{ searchText, setSearchText: setText, clearText }}
    >
      {children}
    </SearchContext.Provider>
  );
};
