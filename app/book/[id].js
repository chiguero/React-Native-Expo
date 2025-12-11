import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image, Animated, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { bookService } from '../../services/bookService';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components';
import "../../global.css";

export default function BookDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scaleAnim] = useState(new Animated.Value(1));
  const [scaleAnim2] = useState(new Animated.Value(1));

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

  const animateButton = (animValue) => {
    Animated.sequence([
      Animated.timing(animValue, {
        toValue: 0.96,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animValue, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const addBookToCart = () => {
    if (!book) return;
    
    for (let i = 0; i < quantity; i++) {
      addToCart({
        ...book,
        author: typeof book.author === 'object' ? book.author?.name : book.author,
      });
    }
  };

  const handleAddToCart = () => {
    // Validar si está logueado
    if (!isAuthenticated) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        'Inicia sesión',
        'Debes iniciar sesión para añadir libros al carrito',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a perfil', onPress: () => router.push('/(tabs)/profile') },
        ]
      );
      return;
    }
    
    animateButton(scaleAnim);
    addBookToCart();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  const handleBuyNow = () => {
    // Validar si está logueado
    if (!isAuthenticated) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        'Inicia sesión',
        'Debes iniciar sesión para comprar libros',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a perfil', onPress: () => router.push('/(tabs)/profile') },
        ]
      );
      return;
    }

    animateButton(scaleAnim2);
    addBookToCart();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => router.push('/(tabs)/cart'), 200);
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

  const authorName = typeof book.author === 'object' ? book.author?.name : book.author;
  const categoryName = typeof book.category === 'object' ? book.category?.name : book.category;
  const publisherName = typeof book.publisher === 'object' ? book.publisher?.name : book.publisher;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Cover Section */}
        <View className="bg-white rounded-3xl p-6 mb-4 items-center shadow-sm">
          {book.coverImage ? (
            <Image 
              source={{ uri: book.coverImage }}
              className="w-40 h-56 rounded-2xl mb-4"
              style={{ width: 160, height: 224 }}
              resizeMode="cover"
            />
          ) : (
            <View className="w-40 h-56 bg-nexus-100 rounded-2xl items-center justify-center mb-4">
              <Text className="text-8xl">📕</Text>
            </View>
          )}
          
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
            {authorName || 'Autor desconocido'}
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

          {/* Category & Publisher */}
          <View className="flex-row flex-wrap items-center mb-4">
            {categoryName && (
              <View className="bg-nexus-100 px-4 py-2 rounded-lg mr-2 mb-2">
                <Text className="text-sm font-MontserratSemiBold text-nexus-700">
                  📚 {categoryName}
                </Text>
              </View>
            )}
            
            {publisherName && (
              <View className="bg-purple-100 px-4 py-2 rounded-lg mr-2 mb-2">
                <Text className="text-sm font-MontserratSemiBold text-purple-700">
                  📖 {publisherName}
                </Text>
              </View>
            )}

            {book.year && (
              <View className="bg-blue-100 px-4 py-2 rounded-lg mb-2">
                <Text className="text-sm font-MontserratSemiBold text-blue-700">
                  📅 {book.year}
                </Text>
              </View>
            )}
          </View>

          {/* ISBN */}
          {book.isbn && (
            <View className="mb-4">
              <Text className="text-xs font-MontserratRegular text-nexus-400">
                ISBN: {book.isbn}
              </Text>
            </View>
          )}

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

        {/* Actions con animación independiente */}
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }} className="mb-3">
          <Button
            title="Añadir al carrito"
            variant="outline"
            size="lg"
            onPress={handleAddToCart}
            icon="🛒"
            haptic={false}
          />
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleAnim2 }] }}>
          <Button
            title="Comprar ahora"
            variant="primary"
            size="lg"
            onPress={handleBuyNow}
            icon="💳"
            haptic={false}
          />
        </Animated.View>

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}