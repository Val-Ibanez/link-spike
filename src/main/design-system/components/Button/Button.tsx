import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { getDesignTokens } from '../../tokens';

interface ButtonProps {
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
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: tokens.colors.primary,
          borderRadius: tokens.borderRadius.md,
          ...tokens.shadow.sm,
        };
      case 'secondary':
        return {
          backgroundColor: tokens.colors.secondary,
          borderRadius: tokens.borderRadius.md,
          ...tokens.shadow.sm,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: tokens.colors.primary,
          borderWidth: 2,
          borderRadius: tokens.borderRadius.md,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderRadius: tokens.borderRadius.md,
        };
      default:
        return {};
    }
  };

  const getSizeStyle = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 36,
        };
      case 'md':
        return {
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.lg,
          minHeight: 48,
        };
      case 'lg':
        return {
          paddingVertical: tokens.spacing.lg,
          paddingHorizontal: tokens.spacing.xl,
          minHeight: 56,
        };
      default:
        return {};
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: '600',
      textAlign: 'center',
    };

    const variantTextStyle: TextStyle = {
      ...baseTextStyle,
      fontSize: tokens.fontSize.md,
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...variantTextStyle,
          color: '#FFFFFF',
        };
      case 'outline':
      case 'ghost':
        return {
          ...variantTextStyle,
          color: tokens.colors.primary,
        };
      default:
        return variantTextStyle;
    }
  };

  const getSizeTextStyle = (): TextStyle => {
    switch (size) {
      case 'sm':
        return { fontSize: tokens.fontSize.sm };
      case 'md':
        return { fontSize: tokens.fontSize.md };
      case 'lg':
        return { fontSize: tokens.fontSize.lg };
      default:
        return { fontSize: tokens.fontSize.md };
    }
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