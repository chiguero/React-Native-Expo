import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { bookService } from '../../services/bookService';
import { useCart } from '../../context/CartContext';
import { Button } from '../../components';
import "../../global.css";

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBook();
  }, [id]);

  const loadBook = async () => {
    setLoading(true);
    const response = await bookService.getBookById(id);
    if (response.success) {
      setBook(response.data);
    }
    setLoading(false);
  };

  const handleAddToCart = () => {
    if (!book) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart(book);
    }
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      '¡Añadido al carrito!',
      `${quantity} ${quantity === 1 ? 'libro' : 'libros'} añadido(s)`,
      [
        { text: 'Seguir comprando', style: 'cancel' },
        { text: 'Ir al carrito', onPress: () => router.push('/(tabs)/cart') },
      ]
    );
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => router.push('/(tabs)/cart'), 500);
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#1e293b" />
        <Text className="mt-4 font-MontserratMedium text-nexus-700">
          Cargando libro...
        </Text>
      </SafeAreaView>
    );
  }

  if (!book) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
        <Text className="text-xl font-MontserratBold text-nexus-800">
          Libro no encontrado
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Cover Section */}
        <View className="bg-white rounded-3xl p-6 mb-4 items-center shadow-sm">
          <View className="w-40 h-56 bg-nexus-100 rounded-2xl items-center justify-center mb-4">
            <Text className="text-8xl">{book.cover || '📕'}</Text>
          </View>
          
          {book.bestseller && (
            <View className="bg-amber-500 px-4 py-2 rounded-full">
              <Text className="text-sm font-MontserratBold text-white">
                ⭐ Bestseller
              </Text>
            </View>
          )}
        </View>

        {/* Info Section */}
        <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
          <Text className="text-2xl font-MontserratBold text-nexus-900 mb-2">
            {book.title}
          </Text>
          
          <Text className="text-lg font-MontserratMedium text-nexus-500 mb-4">
            {book.author}
          </Text>

          {/* Rating */}
          {book.rating && (
            <View className="flex-row items-center mb-4">
              <Text className="text-amber-500 text-2xl mr-2">⭐</Text>
              <Text className="text-xl font-MontserratBold text-nexus-900 mr-2">
                {book.rating}
              </Text>
              {book.reviews && (
                <Text className="text-base font-MontserratRegular text-nexus-400">
                  ({book.reviews.toLocaleString()} reseñas)
                </Text>
              )}
            </View>
          )}

          {/* Category */}
          <View className="flex-row items-center mb-4">
            <View className="bg-nexus-100 px-4 py-2 rounded-lg">
              <Text className="text-sm font-MontserratSemiBold text-nexus-700">
                📚 {book.category || book.genre || 'General'}
              </Text>
            </View>
            
            {book.stock && (
              <View className="bg-green-100 px-4 py-2 rounded-lg ml-2">
                <Text className="text-sm font-MontserratSemiBold text-green-700">
                  ✓ En stock: {book.stock}
                </Text>
              </View>
            )}
          </View>

          {/* Description */}
          {book.description && (
            <>
              <Text className="text-sm font-MontserratBold text-nexus-700 mb-2">
                Descripción
              </Text>
              <Text className="text-base font-MontserratRegular text-nexus-600 leading-6">
                {book.description}
              </Text>
            </>
          )}
        </View>

        {/* Price Section */}
        <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
          <View className="flex-row items-center justify-between mb-4">
            <View>
              <Text className="text-sm font-MontserratRegular text-nexus-500 mb-1">
                Precio
              </Text>
              <View className="flex-row items-center">
                <Text className="text-3xl font-MontserratBold text-nexus-900 mr-3">
                  ${book.price || 19.99}
                </Text>
                {book.discount > 0 && book.originalPrice && (
                  <>
                    <Text className="text-lg font-MontserratRegular text-nexus-400 line-through mr-2">
                      ${book.originalPrice}
                    </Text>
                    <View className="bg-green-100 px-3 py-1 rounded-lg">
                      <Text className="text-sm font-MontserratBold text-green-700">
                        -{book.discount}%
                      </Text>
                    </View>
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Quantity Selector */}
          <View className="mb-4">
            <Text className="text-sm font-MontserratSemiBold text-nexus-700 mb-3">
              Cantidad
            </Text>
            <View className="flex-row items-center">
              <Pressable
                onPress={() => {
                  if (quantity > 1) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setQuantity(quantity - 1);
                  }
                }}
                className="bg-nexus-100 w-12 h-12 rounded-xl items-center justify-center"
              >
                <Text className="text-nexus-900 text-2xl font-MontserratBold">−</Text>
              </Pressable>

              <Text className="mx-6 text-2xl font-MontserratBold text-nexus-900">
                {quantity}
              </Text>

              <Pressable
                onPress={() => {
                  if (!book.stock || quantity < book.stock) {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setQuantity(quantity + 1);
                  }
                }}
                className="bg-nexus-800 w-12 h-12 rounded-xl items-center justify-center"
              >
                <Text className="text-white text-2xl font-MontserratBold">+</Text>
              </Pressable>

              {book.stock && (
                <Text className="ml-4 text-base font-MontserratRegular text-nexus-500">
                  Max: {book.stock}
                </Text>
              )}
            </View>
          </View>

          {/* Total */}
          <View className="border-t border-gray-100 pt-4">
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-MontserratSemiBold text-nexus-700">
                Total
              </Text>
              <Text className="text-3xl font-MontserratBold text-nexus-900">
                ${((book.price || 19.99) * quantity).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>

        {/* Actions */}
        <Button
          title="Añadir al carrito"
          variant="outline"
          size="lg"
          onPress={handleAddToCart}
          icon="🛒"
          className="mb-3"
        />

        <Button
          title="Comprar ahora"
          variant="primary"
          size="lg"
          onPress={handleBuyNow}
          icon="💳"
        />

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}