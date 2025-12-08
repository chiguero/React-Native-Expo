import React from 'react';
import { View, Text, Pressable } from 'react-native';
import * as Haptics from 'expo-haptics';

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

  return (
    <Pressable
      onPress={handlePress}
      className="bg-white rounded-2xl p-4 mb-3 shadow-sm active:bg-gray-50"
    >
      {/* Badge Bestseller */}
      {book.bestseller && (
        <View className="absolute top-2 right-2 bg-amber-500 px-2 py-1 rounded-lg z-10">
          <Text className="text-xs font-MontserratBold text-white">⭐ Bestseller</Text>
        </View>
      )}

      <View className="flex-row">
        {/* Cover */}
        <View className="w-20 h-28 bg-nexus-100 rounded-xl items-center justify-center mr-4">
          <Text className="text-5xl">{book.cover}</Text>
        </View>

        {/* Info */}
        <View className="flex-1">
          <Text className="text-lg font-MontserratBold text-nexus-900 mb-1" numberOfLines={2}>
            {book.title}
          </Text>
          <Text className="text-sm font-MontserratRegular text-nexus-500 mb-2">
            {book.author}
          </Text>

          {/* Rating */}
          <View className="flex-row items-center mb-2">
            <Text className="text-amber-500 mr-1">⭐</Text>
            <Text className="text-sm font-MontserratMedium text-nexus-700">
              {book.rating}
            </Text>
            <Text className="text-xs font-MontserratRegular text-nexus-400 ml-1">
              ({book.reviews})
            </Text>
          </View>

          {/* Price */}
          <View className="flex-row items-center mb-3">
            <Text className="text-xl font-MontserratBold text-nexus-900 mr-2">
              ${book.price}
            </Text>
            {book.discount > 0 && (
              <>
                <Text className="text-sm font-MontserratRegular text-nexus-400 line-through mr-2">
                  ${book.originalPrice}
                </Text>
                <View className="bg-green-100 px-2 py-0.5 rounded">
                  <Text className="text-xs font-MontserratBold text-green-700">
                    -{book.discount}%
                  </Text>
                </View>
              </>
            )}
          </View>

          {/* Add Button */}
          <Pressable
            onPress={handleAddToCart}
            className="bg-nexus-800 active:bg-nexus-900 py-2 px-4 rounded-lg flex-row items-center justify-center"
          >
            <Text className="text-white text-sm font-MontserratSemiBold">
              🛒 Añadir
            </Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
};