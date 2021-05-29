import React from 'react';
import { StatusBar, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Heading } from '../global/styles';
import styled from 'styled-components';
import ThemeIcon from './ThemeIcon';
import { dark, primary } from '../global/theme';

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
  z-index: 2;
`;

const Header = ({ title, textColor = "white" }: Props) => {
  const { currentTheme }: any = useTheme();

  return (
    <>
      <StatusBar
        barStyle={
          currentTheme === 'light' ? 'dark-content' : 'light-content'
        }
      />
      <View style={{
        elevation: 2,
        marginTop: 20
      }}>
        <HeaderContainer>
          <Heading color={textColor} >{title}</Heading>
          <ThemeIcon />
        </HeaderContainer>
      </View>
    </>
  );
};

export default Header;
