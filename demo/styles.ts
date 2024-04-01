import { StyleSheet } from 'react-native';

const spacing = {
  marginLeft: 6,
  marginRight: 6,
  marginTop: 12,
  padding: 10,
};

const buttonSpacing = {
  margin: 6,
  paddingBottom: 2,
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 2,
};

export const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    borderColor: '#00d2ef',
    borderRadius: 4,
    borderWidth: 1,
    color: '#00d2ef',
    width: 150,
    ...buttonSpacing,
  },
  buttonDisabled: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    width: 150,
    ...buttonSpacing,
  },
  buttonText: {
    color: '#00d2ef',
    textAlign: 'center',
  },
  buttonTextDisabled: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
  elements: {
    backgroundColor: 'transparent',
    borderColor: '#d1d7ff26',
    borderRadius: 4,
    borderWidth: 1,
    color: '#99a0bf',
    height: 40,
    ...spacing,
  },
  divider: {
    ...buttonSpacing,
    margin: 5,
    borderBottomColor: '#d1d7ff26',
    borderBottomWidth: 1,
    width: '100%',
    alignSelf: 'stretch',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
  viewContainer: {
    height: '100%',
  },
});
