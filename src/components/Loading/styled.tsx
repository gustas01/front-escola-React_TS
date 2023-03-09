import styled from "styled-components";
import * as colors from '../../config/colors';

export const LoaderContainer = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  top: 0;
  left: 0;
`;


export const Loader = styled.div`
  height: 100px;
  width: 100px;
  border: 12px solid ${colors.primaryColor};
  border-radius: 50%;
  border-right-color: ${colors.primaryDarkColor};
  animation: spin 1s ease infinite;

  
  @keyframes spin {
    100%{
      transform: rotate(360deg);
    }
  }

`;