import styled from 'styled-components';
import Header from '../../components/header';
import { Container } from '../../components/Layout/container';
import { Content } from '../../components/Layout/content';

const SectionLabel = styled.h2`
  color: ${({ theme: { colors } }) => colors.darkGrey};
  margin-top: 20px;
`;

export default () => {
  return (
    <>
      <Header withSearch={false} />
      <Container>
        <Content>
          <SectionLabel>Marton Dobos</SectionLabel>

          <span>Send me an email</span>
          <a href={`mailto:${process.env.EMAIL_ADDRESS}`}>{process.env.EMAIL_ADDRESS}</a>

          <span>Check out my website</span>
          <a href={process.env.WEB_PAGE} target="_blank" rel="noopener noreferrer">
            {process.env.WEB_PAGE}
          </a>

          <span>Source of the page</span>
          <a href={process.env.GITHUB_PAGE} target="_blank" rel="noopener noreferrer">
            {process.env.GITHUB_PAGE}
          </a>
        </Content>
      </Container>
    </>
  );
};
