import { Platform } from 'react-native';

export const fonts = {
  // Fuentes principales
  regular: Platform.select({
    ios: 'Roboto-Regular',
    android: 'roboto_regular',
    default: 'System',
  }),
  
  medium: Platform.select({
    ios: 'Roboto-Medium',
    android: 'roboto_medium',
    default: 'System',
  }),
  
  bold: Platform.select({
    ios: 'Roboto-Bold',
    android: 'roboto_bold',
    default: 'System',
  }),
  
  light: Platform.select({
    ios: 'Roboto-Light',
    android: 'roboto_light',
    default: 'System',
  }),
  
  // Tamaños de fuente
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
  },
  
  // Pesos de fuente
  weights: {
    light: '300',
    regular: '400',
    medium: '500',
    bold: '700',
  },
};

// Helper para crear estilos de texto con Roboto
export const createTextStyle = (size: keyof typeof fonts.sizes, weight: keyof typeof fonts.weights = 'regular') => ({
  fontFamily: fonts[weight],
  fontSize: fonts.sizes[size],
});
