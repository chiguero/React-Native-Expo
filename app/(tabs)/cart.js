import React from 'react';
import { View, Text, ScrollView, Pressable, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components';
import "../../global.css";

export default function CartScreen() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart, getItemsCount } = useCart();
  const { isAuthenticated } = useAuth();

  const handleRemove = (bookId) => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Eliminar del carrito',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => removeFromCart(bookId),
        },
      ]
    );
  };

  const handleClearCart = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Vaciar carrito',
      '¿Estás seguro de que quieres eliminar todos los libros?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: () => {
            clearCart();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      Alert.alert(
        'Inicia sesión',
        'Debes iniciar sesión para realizar la compra',
        [
          { text: 'Cancelar', style: 'cancel' },
          { text: 'Ir a perfil', onPress: () => router.push('/(tabs)/profile') },
        ]
      );
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert(
      '¡Compra realizada!',
      `Total: $${getTotal().toFixed(2)}\n\nGracias por tu compra en Nexus`,
      [
        {
          text: 'OK',
          onPress: () => clearCart(),
        },
      ]
    );
  };

  if (cart.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 items-center justify-center px-8">
          <Text className="text-6xl mb-4">🛒</Text>
          <Text className="text-2xl font-MontserratBold text-nexus-800 mb-2 text-center">
            Tu carrito está vacío
          </Text>
          <Text className="text-base font-MontserratRegular text-nexus-500 text-center">
            Explora nuestro catálogo y añade libros
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Header con botón volver */}
        <View className="flex-row items-center mb-4">
          <Pressable
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.back();
            }}
            className="w-10 h-10 bg-white rounded-xl items-center justify-center mr-3 shadow-sm active:bg-gray-100"
          >
            <Text className="text-xl">←</Text>
          </Pressable>

          <Text className="text-2xl font-MontserratBold text-nexus-900 flex-1">
            🛒 Mi Carrito
          </Text>
          
          {/* Botón vaciar carrito */}
          <Pressable
            onPress={handleClearCart}
            className="bg-red-100 px-4 py-2 rounded-lg active:bg-red-200"
          >
            <Text className="text-red-600 font-MontserratSemiBold text-sm">
              🗑️ Vaciar
            </Text>
          </Pressable>
        </View>

        {/* Items Count */}
        <View className="bg-nexus-800 rounded-xl p-4 mb-4">
          <Text className="text-white font-MontserratMedium">
            {getItemsCount()} {getItemsCount() === 1 ? 'artículo' : 'artículos'} en tu carrito
          </Text>
        </View>

        {/* Cart Items */}
        {cart.map(item => (
          <Pressable 
            key={item.id} 
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              router.push(`/book/${item.id}`);
            }}
            className="bg-white rounded-2xl p-4 mb-3 shadow-sm active:bg-gray-50"
          >
            <View className="flex-row">
              {/* Cover con imagen */}
              {item.coverImage ? (
                <Image 
                  source={{ uri: item.coverImage }}
                  className="w-16 h-24 rounded-xl mr-4"
                  style={{ width: 64, height: 96 }}
                  resizeMode="cover"
                />
              ) : (
                <View className="w-16 h-24 bg-nexus-100 rounded-xl items-center justify-center mr-4">
                  <Text className="text-4xl">📕</Text>
                </View>
              )}

              {/* Info */}
              <View className="flex-1">
                <Text className="text-base font-MontserratBold text-nexus-900 mb-1" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-sm font-MontserratRegular text-nexus-500 mb-2">
                  {item.author}
                </Text>
                <Text className="text-lg font-MontserratBold text-nexus-900">
                  ${item.price}
                </Text>
              </View>
            </View>

            {/* Quantity Controls */}
            <View className="flex-row items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <View className="flex-row items-center">
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    updateQuantity(item.id, item.quantity - 1);
                  }}
                  className="bg-nexus-100 w-8 h-8 rounded-lg items-center justify-center"
                >
                  <Text className="text-nexus-900 font-MontserratBold">−</Text>
                </Pressable>

                <Text className="mx-4 text-base font-MontserratSemiBold text-nexus-900">
                  {item.quantity}
                </Text>

                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    updateQuantity(item.id, item.quantity + 1);
                  }}
                  className="bg-nexus-800 w-8 h-8 rounded-lg items-center justify-center"
                >
                  <Text className="text-white font-MontserratBold">+</Text>
                </Pressable>
              </View>

              {/* Remove Button */}
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  handleRemove(item.id);
                }}
                className="bg-red-100 px-4 py-2 rounded-lg"
              >
                <Text className="text-red-600 font-MontserratSemiBold text-sm">
                  🗑️ Eliminar
                </Text>
              </Pressable>
            </View>

            {/* Subtotal */}
            <View className="mt-3 pt-3 border-t border-gray-100">
              <Text className="text-right text-sm font-MontserratRegular text-nexus-500">
                Subtotal: <Text className="font-MontserratBold text-nexus-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </Text>
              </Text>
            </View>
          </Pressable>
        ))}

        <View className="h-32" />
      </ScrollView>

      {/* Checkout Footer */}
      <View className="bg-white border-t border-gray-200 px-4 py-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-MontserratBold text-nexus-900">
            Total
          </Text>
          <Text className="text-2xl font-MontserratBold text-nexus-900">
            ${getTotal().toFixed(2)}
          </Text>
        </View>

        <Button
          title="Finalizar compra"
          variant="primary"
          size="lg"
          onPress={handleCheckout}
          icon="💳"
        />
      </View>
    </SafeAreaView>
  );
}