import { useContext, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosSearch, IoIosClose } from 'react-icons/io';
import { SearchContext } from '../context/SearchContext';

const InputContainer = styled.div`
  border: ${({ theme: { colors } }) => `1px solid ${colors.lightGrey}`};
  border-radius: 8px;
  padding: 8px;
  display: flex;
  align-items: center;
`;

const Input = styled.input`
  outline: none;
  border: none;
  margin-left: 8px;
  font-size: 0.8em;
`;

const ClickableIcon = styled(IoIosClose)`
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

export default () => {
  const { searchText, setSearchText, clearText } = useContext(SearchContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchText) {
      inputRef.current.value = searchText;
    }
  }, []);

  const onClear = () => {
    inputRef.current.value = '';
    clearText();
  };

  return (
    <InputContainer>
      <IoIosSearch />

      <Input ref={inputRef} onChange={setSearchText} />

      {searchText?.length > 0 ? <ClickableIcon onClick={onClear} /> : null}
    </InputContainer>
  );
};
