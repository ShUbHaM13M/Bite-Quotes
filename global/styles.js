import React from 'react'
import { StyleSheet, View, Text } from 'react-native';
import styled from 'styled-components';
import { base, dark, primary } from './theme';

export const Heading = (props) => <Text style={{
  color: props.color || dark,
  fontSize: props.size || 26,
  textAlign: props.textCenter ? 'center' : 'left',
  marginTop: props.marginTop || 0,
  marginBottom: props.marginBottom || 0,
  padding: props.padding || 0,
  paddingLeft: props.paddingLeft || 0
}}>
  {props.children}
</Text>

export const Card = styled.View`
  flex: ${props => props.flex || 'none'};
  height: ${(props) => props.height || '350px'};
  width: ${(props) => props.width || '100%'};
  border-radius: ${(props) => props.borderRadius || "0px"};
  align-items: center;
  border-width: ${props => props.borderWidth || '0px'};
  border-color: ${props =>  props.borderColor || 'transparent'};
  background: ${props => props.backgroundColor || base.accent2};
  padding-top: ${props => props.paddingTop || '0px'};
  padding-bottom: ${props => props.paddingBottom || '0px'};
  padding-vertical: ${props => props.paddingVertical || '40px'};
  padding-horizontal: ${props => props.paddingHorizontal || '20px'};
  /* elevation: 1; */
  margin-vertical: ${props => props.marginVertical || '0px'};
  justify-content: ${props => props.justifyCenter || 'center'};
  margin-horizontal: ${props => props.marginHorizontal || '0px'};
  margin-bottom: ${props => props.marginBottom || '0px'};
  margin-top: ${props=> props.marginTop || '0px'};
`;

export const AuthorText = ({children}) => <Text style={{
      fontSize: 18,
      fontWeight: '100',
      width: '100%',
      textAlign: 'right'
  }}>{children}</Text>

const styles = StyleSheet.create({
  roundedButton: {
    borderRadius: 100,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: base.accent
  }
})

export default styles