import { useRef } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

import { Country, TimeSeriesData, TimeSeriesVars } from '../../config/interfaces';
import Card from './card';
import ComposedChart from '../Charts/composedChart';
import { TIME_SERIE } from '../../graphql/queries';

const customStyles = {
  overlay: {
    zIndex: 100,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    marginRight: '-50%',
    backgroundColor: 'transparent',
    transform: 'translate(-50%, -50%)',
  },
};

const ClickableIcon = styled(IoIosClose)`
  width: 24px;
  height: 24px;
  cursor: pointer;
  &:hover {
    opacity: 0.4;
  }
`;

const Title = styled.div`
  font-size: 1.2em;
  font-weight: 600;
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: ${({ theme: { colors } }) => `1px solid ${colors.superLightGrey}`};
  padding-bottom: 12px;
  margin-bottom: 12px;
`;

type Props = {
  data?: Country | null;
  onClose: () => void;
};

export default ({ data, onClose }: Props) => {
  const date = useRef(format(new Date(), 'MM/dd/yyyy')).current;

  const { data: queryResult } = useQuery<TimeSeriesData, TimeSeriesVars>(TIME_SERIE, {
    variables: { country: data?.name, date },
    skip: !data,
  });

  return (
    <Modal
      isOpen={!!data}
      ariaHideApp={false}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <Card>
        <Header>
          <Title>{data?.name}</Title>
          <ClickableIcon onClick={onClose} />
        </Header>
        <ComposedChart timeSeriesData={queryResult?.result} />
      </Card>
    </Modal>
  );
};
