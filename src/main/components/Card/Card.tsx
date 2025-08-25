import React from 'react';
import { View, ViewStyle } from 'react-native';
import { getDesignTokens } from '../tokens';

export interface CardProps {
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
    const variantStyles = {
      default: {
        backgroundColor: tokens.colors.surface,
        ...tokens.shadow.sm,
      },
      elevated: {
        backgroundColor: tokens.colors.surface,
        ...tokens.shadow.lg,
      },
      outlined: {
        backgroundColor: tokens.colors.surface,
        borderWidth: 1,
        borderColor: tokens.colors.border,
      },
      filled: {
        backgroundColor: tokens.colors.surfaceVariant,
      },
    } as const;

    return variantStyles[variant as keyof typeof variantStyles] || {};
  };

  const getPaddingStyle = (): ViewStyle => {
    const paddingStyles = {
      sm: { padding: tokens.spacing.sm },
      md: { padding: tokens.spacing.md },
      lg: { padding: tokens.spacing.lg },
      none: {},
    } as const;

    return paddingStyles[padding as keyof typeof paddingStyles] || {};
  };

  const getMarginStyle = (): ViewStyle => {
    const marginStyles = {
      sm: { margin: tokens.spacing.sm },
      md: { margin: tokens.spacing.md },
      lg: { margin: tokens.spacing.lg },
      none: {},
    } as const;

    return marginStyles[margin as keyof typeof marginStyles] || {};
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