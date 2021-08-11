import preloader from '../../../assets/images/preloader.svg';
import React from 'react';
import styled from 'styled-components';

const PreloaderStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  size: 5px;
  background-color: lightgrey;
`;

let Preloader = () => {
  return (
    <PreloaderStyle>
      <img src={preloader} />
    </PreloaderStyle>
  );
};
export default Preloader;
