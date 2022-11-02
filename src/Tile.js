import React from 'react';
import styled from 'styled-components';

const Tile = ({ line }) => {
  return <Container>{line}</Container>;
};

export default Tile;

const Container = styled.div`
  width: 277px;
  /* margin: 20px; */
  padding: 5px;
  background: rgba(255, 255, 255, 0.3);
`;
