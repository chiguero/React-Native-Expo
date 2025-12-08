import React from 'react';
import { Pressable, Text, ActivityIndicator } from 'react-native';
import * as Haptics from 'expo-haptics';

export const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  haptic = true,
  className = '',
  icon = null,
}) => {
  const handlePress = async () => {
    if (disabled || loading) return;
    if (haptic) {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    onPress?.();
  };

  const variants = {
    primary: 'bg-nexus-800 active:bg-nexus-900',
    secondary: 'bg-nexus-500 active:bg-nexus-700',
    outline: 'bg-transparent border-2 border-nexus-800 active:bg-nexus-50',
  };

  const textVariants = {
    primary: 'text-white',
    secondary: 'text-white',
    outline: 'text-nexus-800',
  };

  const sizes = {
    sm: 'px-3 py-2',
    md: 'px-5 py-3',
    lg: 'px-6 py-4',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-xl
        flex-row
        items-center
        justify-center
        ${disabled || loading ? 'opacity-50' : ''}
        ${className}
      `}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#1e293b' : 'white'} />
      ) : (
        <>
          {icon && <Text className="mr-2">{icon}</Text>}
          <Text className={`${textVariants[variant]} ${textSizes[size]} font-MontserratSemiBold`}>
            {title}
          </Text>
        </>
      )}
    </Pressable>
  );
};