import styled from "styled-components";

export const Content = styled.div`
  display: flex;
  width: 600px;
  padding-top: 32px;
  flex-direction: column;

  a {
    color: ${({ theme: { colors } }) => colors.grey};
    margin-bottom: 8px;
  }

  span {
    color: ${({ theme: { colors } }) => colors.darkGrey};
  }
`;
