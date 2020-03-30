import { useEffect, useContext, useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { SearchContext } from '../context/SearchContext';

type Props = {
  array: any[];
  options?: {
    keys: string[];
    threshold?: number;
    distance?: number;
    minMatchCharLength?: number;
  };
};

const defaultOptions = {
  keys: ['properties.name'],
  threshold: 0.2,
  distance: 20,
  minMatchCharLength: 4,
};

export default ({ array, options = defaultOptions }: Props) => {
  const { searchText } = useContext(SearchContext);

  const fuse = useMemo(() => new Fuse(array, options), [array, options]);
  const [filteredArray, setFilteredArray] = useState(array);

  useEffect(() => {
    if (fuse && searchText) {
      const filtered = fuse.search(searchText);
      setFilteredArray(filtered.map(item => item.item));
    } else {
      setFilteredArray(array);
    }
  }, [fuse, searchText]);

  return [filteredArray];
};
