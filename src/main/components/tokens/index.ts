/**
 * 🎨 Design Tokens - White Label Banking Design System
 * Tokens dinámicos que se adaptan al flavor/banco activo
 */

import { configManager } from '../../core/ConfigManager';

// Base tokens (consistentes entre bancos)
export const baseTokens = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
  },
  
  // Typography
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  // Layout
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  },
  
  // Shadows
  shadow: {
    sm: {

    },
    md: {

    },
    lg: {

    },
  },
  
  // Layout
  breakpoints: {
    sm: 376,
    md: 768,
    lg: 1024,
  },
};

// Dynamic tokens (cambian por banco)
export const getDynamicTokens = () => {
  const theme = configManager.getTheme();
  const tenantConfig = configManager.getCurrentTenant();
  
  return {
    // Colors dinámicos por banco
    colors: {
      // Brand colors (únicos por banco)
      primary: theme.primary,
      primaryLight: lightenColor(theme.primary, 0.1),
      primaryDark: darkenColor(theme.primary, 0.1),
      secondary: theme.secondary,
      accent: theme.accent,
      
      // Semantic colors (consistentes pero pueden personalizar)
      success: theme.success || '#28A745',
      warning: theme.warning || '#FFC107',
      error: theme.error || '#DC3545',
      info: '#17A2B8',
      
      // Surface colors
      background: theme.background,
      surface: theme.surface,
      surfaceVariant: '#F5F5F5',
      
      // Text colors
      text: theme.text,
      textSecondary: theme.textSecondary,
      textDisabled: '#999',
      
      // Border colors
      border: '#E0E0E0',
      borderFocus: theme.primary,
      
      // Status colors
      online: '#4CAF50',
      offline: '#9E9E9E',
      pending: '#FF9800',
    },
    
    // Typography con fuentes del banco
    typography: {
      fontFamily: {
        regular: 'System',
        bold: 'System-Bold',
        light: 'System-Light',
      },
    },
  };
};

// Utility functions
function lightenColor(color: string, amount: number): string {
  // Simplified color lightening
  return color; // TODO: Implement proper color manipulation
}

function darkenColor(color: string, amount: number): string {
  // Simplified color darkening
  return color; // TODO: Implement proper color manipulation
}

// Combined tokens
export const getDesignTokens = () => ({
  ...baseTokens,
  ...getDynamicTokens(),
});

export default getDesignTokens;