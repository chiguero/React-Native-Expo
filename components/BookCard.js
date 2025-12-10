import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';

export const BookCard = ({ book, onPress, onAddToCart }) => {
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(book);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onAddToCart?.(book);
  };

  const authorName = typeof book.author === 'object' ? book.author?.name : book.author;

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-3xl p-5 mb-4 shadow-lg border border-gray-100 active:scale-98"
      style={{
        shadowColor: '#1e293b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
      }}
    >
      {/* Badge Bestseller */}
      {book.bestseller && (
        <View className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1.5 rounded-full z-10 shadow-md">
          <Text className="text-xs font-MontserratBold text-white">⭐ Bestseller</Text>
        </View>
      )}

      <View className="flex-row">
        {/* Cover con gradiente */}
        <View className="relative mr-4">
          <View className="w-24 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl items-center justify-center shadow-md">
            <Text className="text-6xl">{book.cover || '📕'}</Text>
          </View>
          {/* Brillo decorativo */}
          <View className="absolute top-2 left-2 w-8 h-8 bg-white/30 rounded-full blur-sm" />
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-xl font-MontserratBold text-nexus-900 mb-1.5 leading-6" numberOfLines={2}>
            {book.title}
          </Text>
          <Text className="text-sm font-MontserratMedium text-indigo-600 mb-3">
            {authorName || 'Autor desconocido'}
          </Text>

          {/* Rating con estrellas */}
          {book.rating && (
            <View className="flex-row items-center mb-3 bg-amber-50 px-2 py-1 rounded-lg self-start">
              <Text className="text-amber-500 mr-1">⭐</Text>
              <Text className="text-sm font-MontserratBold text-amber-700">
                {book.rating}
              </Text>
              {book.reviews && (
                <Text className="text-xs font-MontserratRegular text-amber-600 ml-1">
                  ({book.reviews})
                </Text>
              )}
            </View>
          )}

          {/* Price con diseño moderno */}
          <View className="flex-row items-center mb-4">
            <View className="bg-nexus-900 px-3 py-1.5 rounded-xl mr-2">
              <Text className="text-lg font-MontserratBold text-white">
                ${book.price || '19.99'}
              </Text>
            </View>
            {book.discount > 0 && book.originalPrice && (
              <>
                <Text className="text-sm font-MontserratRegular text-gray-400 line-through mr-2">
                  ${book.originalPrice}
                </Text>
                <View className="bg-green-500 px-2 py-1 rounded-lg">
                  <Text className="text-xs font-MontserratBold text-white">
                    -{book.discount}%
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Add Button con gradiente */}
          <Pressable
            onPress={handleAddToCart}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 active:from-indigo-700 active:to-purple-700 py-3 px-4 rounded-xl flex-row items-center justify-center shadow-md"
            style={{
              shadowColor: '#6366f1',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
            }}
          >
            <Text className="text-white text-sm font-MontserratBold mr-2">
              Añadir al carrito
            </Text>
            <Text className="text-lg">🛒</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};