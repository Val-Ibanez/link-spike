import React from 'react';
import { View, ViewStyle } from 'react-native';
import { getDesignTokens } from '../../tokens';

interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  margin?: 'none' | 'sm' | 'md' | 'lg';
  style?: ViewStyle;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  margin = 'none',
  style,
}) => {
  const tokens = getDesignTokens();
  
  // Estilos dinámicos
  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: tokens.colors.surface,
          ...tokens.shadow.sm,
        };
      case 'elevated':
        return {
          backgroundColor: tokens.colors.surface,
          ...tokens.shadow.lg,
        };
      case 'outlined':
        return {
          backgroundColor: tokens.colors.surface,
          borderWidth: 1,
          borderColor: tokens.colors.border,
        };
      case 'filled':
        return {
          backgroundColor: tokens.colors.surfaceVariant,
        };
      default:
        return {};
    }
  };

  const getPaddingStyle = (): ViewStyle => {
    switch (padding) {
      case 'sm':
        return { padding: tokens.spacing.sm };
      case 'md':
        return { padding: tokens.spacing.md };
      case 'lg':
        return { padding: tokens.spacing.lg };
      case 'none':
      default:
        return {};
    }
  };

  const getMarginStyle = (): ViewStyle => {
    switch (margin) {
      case 'sm':
        return { margin: tokens.spacing.sm };
      case 'md':
        return { margin: tokens.spacing.md };
      case 'lg':
        return { margin: tokens.spacing.lg };
      case 'none':
      default:
        return {};
    }
  };

  const cardStyles: ViewStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    ...getVariantStyle(),
    ...getPaddingStyle(),
    ...getMarginStyle(),
    ...style,
  };

  return (
    <View style={cardStyles}>
      {children}
    </View>
  );
};

export default Card;