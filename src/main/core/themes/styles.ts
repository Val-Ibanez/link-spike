import { StyleSheet } from 'react-native';
import { TenantConfig } from '../types/tenant';

export const createThemedStyles = (theme: TenantConfig['theme']) => {
  return StyleSheet.create({
    // Containers
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.background,
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
      shadowColor: theme.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    
    // Typography
    heading1: {
      fontSize: 32,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 16,
    },
    heading2: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.text,
      marginBottom: 12,
    },
    heading3: {
      fontSize: 20,
      fontWeight: '600',
      color: theme.text,
      marginBottom: 8,
    },
    bodyText: {
      fontSize: 16,
      color: theme.text,
      lineHeight: 24,
    },
    bodyTextSecondary: {
      fontSize: 14,
      color: theme.textSecondary,
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    
    // Buttons
    primaryButton: {
      backgroundColor: theme.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.primary,
      alignItems: 'center',
    },
    secondaryButtonText: {
      color: theme.primary,
      fontSize: 16,
      fontWeight: '600',
    },
    
    // Input Fields
    input: {
      borderWidth: 1,
      borderColor: theme.textSecondary,
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: 16,
      color: theme.text,
      backgroundColor: theme.surface,
    },
    inputFocused: {
      borderColor: theme.primary,
    },
    inputError: {
      borderColor: theme.error,
    },
    
    // Status indicators
    errorText: {
      color: theme.error,
      fontSize: 14,
    },
    successText: {
      color: theme.success,
      fontSize: 14,
    },
    warningText: {
      color: theme.warning,
      fontSize: 14,
    },
    
    // Layout
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    spaceBetween: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    
    // App specific styles
    headerCard: {
      backgroundColor: theme.primary,
      borderRadius: 8,
      padding: 16,
      marginVertical: 8,
    },
    whiteText: {
      color: '#FFFFFF',
    },
    tenantButton: {
      marginVertical: 4,
    },
    featuresList: {
      marginTop: 16,
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: 15,
      paddingVertical: 10,
    },
    bankLogo: {
      marginVertical: 5,
      height: 60,
      width: 120,
      backgroundColor: 'transparent',
    },
    
    // Spacing
    marginSmall: { margin: 8 },
    marginMedium: { margin: 16 },
    marginLarge: { margin: 24 },
    paddingSmall: { padding: 8 },
    paddingMedium: { padding: 16 },
    paddingLarge: { padding: 24 },
  });
};

// Espaciado común
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Tamaños de fuente comunes
export const fontSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};