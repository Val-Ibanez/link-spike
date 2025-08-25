/**
 * 🎨 Design Tokens - White Label Banking Design System
 * Tokens dinámicos que se adaptan al flavor/banco activo
 */

import { useCurrentTenant } from '../../stores';

// Base tokens (no cambian por banco)
export const baseTokens = {
  // Spacing
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
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
  // Usar el hook directamente para obtener el tenant actual
  const currentTenant = useCurrentTenant();
  
  if (!currentTenant) {
    // Fallback si no hay tenant configurado
    return {
      colors: {
        primary: '#0066CC',
        primaryLight: '#3388DD',
        primaryDark: '#004499',
        secondary: '#666666',
        accent: '#FF6B35',
        success: '#28A745',
        warning: '#FFC107',
        error: '#DC3545',
        info: '#17A2B8',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        surfaceVariant: '#F5F5F5',
        text: '#000000',
        textSecondary: '#666666',
        textDisabled: '#999',
        border: '#E0E0E0',
        borderFocus: '#0066CC',
        online: '#4CAF50',
        offline: '#9E9E9E',
        pending: '#FF9800',
      },
      typography: {
        fontFamily: {
          regular: 'System',
          bold: 'System-Bold',
          light: 'System-Light',
        },
      },
    };
  }
  
  const theme = currentTenant.theme;
  
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