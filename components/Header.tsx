import React from 'react';
import { StatusBar } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Heading } from '../global/styles';
import styled from 'styled-components';
import ThemeIcon from './ThemeIcon';

interface Props {
  title: string;
  textColor?: string
}

export const HEADER_HEIGHT = 20

const HeaderContainer = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: ${HEADER_HEIGHT}px 30px;
  elevation: 2;
  z-index: 2;
`;

const Header = ({ title, textColor = "white" }: Props) => {
  const { currentTheme }: any = useTheme();

  return (
    <>
      <StatusBar
        barStyle={
          currentTheme?.name === 'light' ? 'dark-content' : 'light-content'
        }
      />
      <HeaderContainer>
        <Heading color={textColor} >{title}</Heading>
        <ThemeIcon />
      </HeaderContainer>
    </>
  );
};

export default Header;
