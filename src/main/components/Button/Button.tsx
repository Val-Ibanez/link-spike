import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { getDesignTokens } from '../tokens';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
  iconPosition = 'left',
}) => {
  const tokens = getDesignTokens();
  
  // Estilos dinámicos
  const getVariantStyle = (): ViewStyle => {
    const variantStyles = {
      primary: {
        backgroundColor: tokens.colors.primary,
        borderRadius: tokens.borderRadius.md,
        ...tokens.shadow.sm,
      },
      secondary: {
        backgroundColor: tokens.colors.secondary,
        borderRadius: tokens.borderRadius.md,
        ...tokens.shadow.sm,
      },
      outline: {
        backgroundColor: 'transparent',
        borderColor: tokens.colors.primary,
        borderWidth: 2,
        borderRadius: tokens.borderRadius.md,
      },
      ghost: {
        backgroundColor: 'transparent',
        borderRadius: tokens.borderRadius.md,
      },
    } as const;

    return variantStyles[variant as keyof typeof variantStyles] || {};
  };

  const getSizeStyle = (): ViewStyle => {
    const sizeStyles = {
      sm: {
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        minHeight: 36,
      },
      md: {
        paddingVertical: tokens.spacing.md,
        paddingHorizontal: tokens.spacing.lg,
        minHeight: 48,
      },
      lg: {
        paddingVertical: tokens.spacing.lg,
        paddingHorizontal: tokens.spacing.xl,
        minHeight: 56,
      },
    } as const;

    return sizeStyles[size as keyof typeof sizeStyles] || {};
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const variantTextStyle: TextStyle = {
      ...baseTextStyle,
      fontSize: 16, // Valor hardcodeado en lugar de tokens.fontSize.md
    };

    const variantTextStyles = {
      primary: {
        ...variantTextStyle,
        color: '#FFFFFF',
      },
      secondary: {
        ...variantTextStyle,
        color: '#FFFFFF',
      },
      outline: {
        ...variantTextStyle,
        color: tokens.colors.primary,
      },
      ghost: {
        ...variantTextStyle,
        color: tokens.colors.primary,
      },
    } as const;

    return variantTextStyles[variant as keyof typeof variantTextStyles] || variantTextStyle;
  };

  const getSizeTextStyle = (): TextStyle => {
    const sizeTextStyles = {
      sm: { fontSize: 14 }, // Valor hardcodeado
      md: { fontSize: 16 }, // Valor hardcodeado
      lg: { fontSize: 18 }, // Valor hardcodeado
    } as const;

    return sizeTextStyles[size as keyof typeof sizeTextStyles] || {};
  };

  const buttonStyles: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    ...getVariantStyle(),
    ...getSizeStyle(),
    ...(fullWidth && { width: '100%' }),
    ...(disabled && { opacity: 0.6, backgroundColor: tokens.colors.surfaceVariant }),
    ...style,
  };

  const textStyles: TextStyle = {
    ...getTextStyle(),
    ...getSizeTextStyle(),
    ...(disabled && { color: tokens.colors.textDisabled }),
    ...textStyle,
  };

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={variant === 'primary' ? '#FFFFFF' : tokens.colors.primary}
          size="small"
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && icon}
          <Text style={textStyles}>{title}</Text>
          {icon && iconPosition === 'right' && icon}
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;