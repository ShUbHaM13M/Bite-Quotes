import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { base, dark, primary } from './theme';

export const FullView = styled.View`
  flex: 1;
  background-color: ${props => props?.theme?.value.backgroundColor};
`;

export const PaddedContainer = styled.View`
  padding-left: 30px;
  padding-right: 30px;
  background-color: ${props => props?.theme?.value.backgroundColor};
`;

export const StyledText = styled.Text`
  color: ${props => props?.theme?.value.color || 'black'};
`;

export const Heading = styled.Text`
  color: ${(props) => props.color || 'black'};
  font-size: ${(props) => props.size || '26px'};
  text-align: ${(props) => props.textCenter ? 'center': 'left'};
  margin-top: ${props => props.marginTop || '0px'};
  margin-bottom: ${props => props.marginBottom || '0px'};
  flex: ${props => props.flex || 'none'};
  padding: ${props => props.padding || '0px'};
  padding-left: ${props => props.paddingLeft || '0px'};
`;

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

export const AuthorText = styled.Text`
  font-size: 18px;
  font-weight: 100;
  width: 100%;
  text-align: right;
  `;

export const RoundedButton = styled.Pressable`
  border-radius: 100px;
  height: 60px;
  width: 60px;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.primary === true ? base.accent: primary}
`;

const styles = StyleSheet.create({
  defaultPadding: {
    paddingHorizontal: 30,
    paddingVertical: 40,
  },
  fullHeight: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  textHeading: {
    fontSize: 32,
  },
  spacedBetContainer: {
    justifyContent: 'space-between',
  },
  alignCenter: {
    alignItems: 'center',
  },
  heading: {
    fontSize: 32,
  },
  textCenter: {
    textAlign: 'center',
  },
});

export default styles;
