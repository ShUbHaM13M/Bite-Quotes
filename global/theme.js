export const dark = '#33333B';
export const primary = '#DFE2D1';
const secondary = '#6CC084';
const accent = '#F16A67';
const accent2 = '#F2ACA0';
const borderColor = '#33333B30';

export const randomQuoteColors = {
  color: '#E2DDD1',
  color2: '#F3F1ED',
  dark: '#0E0D0B',
  dark2: '#1C1C1C' 
}
export const quoteColors = {
  color: '#F9AC8A',
  color2: '#FBC6AE',
  dark: '#9C431C',
  dark2: '#692505' 
}
export const savedQuoteColors = {
  color: '#F9D28A',
  color2: '#FBE0AE',
  dark: '#9C6F1C',
  dark2: '#694605' 
}
export const authorColors = {
  color: '#B1F98A',
  color2: '#F3F1ED',
  dark: '#478306',
  dark2: '#396905' 
}
export const aboutColors = {
  color: '#6CC084',
  color2: '#90D0A2',
  dark: '#223F2A',
  dark2: '#639771' 
}

export const base = {
  secondary,
  accent,
  accent2,
  borderColor,
};

const lightTheme = {
  name: 'light',
  value: {
    backgroundColor: primary,
    color: dark,
  },
};

const darkTheme = {
  name: 'dark',
  value: {
    backgroundColor: dark,
    color: primary,
  },
};

const theme = {
  light: lightTheme,
  dark: darkTheme,
};

export default theme;
