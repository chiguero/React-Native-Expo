import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components';
import "../../global.css";

export default function ProfileScreen() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOption = (option) => {
    Haptics.selectionAsync();
    Alert.alert('Función en desarrollo', `Has seleccionado: ${option}`);
  };

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const result = login(email, password);
    
    if (result.success) {
      Alert.alert('¡Bienvenido!', 'Has iniciado sesión correctamente');
      setEmail('');
      setPassword('');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  const handleLogout = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: () => {
            logout();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          },
        },
      ]
    );
  };

  // Vista cuando NO está autenticado
  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <ScrollView className="flex-1" contentContainerClassName="px-4 py-8">
          
          {/* Header */}
          <View className="items-center mb-8">
            <View className="w-24 h-24 bg-nexus-800 rounded-full items-center justify-center mb-4">
              <Text className="text-5xl">🔒</Text>
            </View>
            <Text className="text-2xl font-MontserratBold text-nexus-900 mb-2">
              Inicia sesión
            </Text>
            <Text className="text-base font-MontserratRegular text-nexus-500 text-center">
              Accede a tu cuenta para comprar libros
            </Text>
          </View>

          {/* Login Form */}
          <View className="bg-white rounded-3xl p-6 mb-4 shadow-sm">
            <Text className="text-sm font-MontserratBold text-nexus-700 mb-2">
              Email
            </Text>
            <TextInput
              className="bg-gray-50 rounded-xl px-4 py-3 mb-4 font-MontserratRegular text-base"
              placeholder="tu@email.com"
              placeholderTextColor="#94a3b8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text className="text-sm font-MontserratBold text-nexus-700 mb-2">
              Contraseña
            </Text>
            <TextInput
              className="bg-gray-50 rounded-xl px-4 py-3 mb-6 font-MontserratRegular text-base"
              placeholder="••••••••"
              placeholderTextColor="#94a3b8"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button
              title="Iniciar sesión"
              variant="primary"
              size="lg"
              onPress={handleLogin}
              icon="🔓"
            />
          </View>

          {/* Demo Info */}
          <View className="bg-blue-50 rounded-2xl p-4 border border-blue-200">
            <Text className="text-sm font-MontserratBold text-blue-900 mb-2">
              💡 Demo
            </Text>
            <Text className="text-sm font-MontserratRegular text-blue-700">
              Puedes usar cualquier email y contraseña para probar la app
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  // Vista cuando SÍ está autenticado
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Profile Header */}
        <View className="bg-nexus-800 rounded-3xl p-6 mb-6 items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">👤</Text>
          </View>

          <Text className="text-2xl font-MontserratBold text-white mb-1">
            {user?.name || 'Usuario'}
          </Text>
          <Text className="text-sm font-MontserratRegular text-nexus-100">
            {user?.email}
          </Text>

          <View className="bg-amber-500 px-4 py-2 rounded-full mt-4">
            <Text className="text-xs font-MontserratSemiBold text-white">
              ⭐ Cliente Premium
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View className="flex-row mb-6">
          <View className="flex-1 bg-white rounded-2xl p-4 mr-2 shadow-sm">
            <Text className="text-3xl font-MontserratBold text-nexus-900">12</Text>
            <Text className="text-sm font-MontserratRegular text-nexus-500">
              Compras
            </Text>
          </View>
          <View className="flex-1 bg-white rounded-2xl p-4 ml-2 shadow-sm">
            <Text className="text-3xl font-MontserratBold text-nexus-900">45</Text>
            <Text className="text-sm font-MontserratRegular text-nexus-500">
              Libros
            </Text>
          </View>
        </View>

        {/* Account Section */}
        <Text className="text-sm font-MontserratBold text-nexus-500 uppercase mb-3 ml-1">
          Cuenta
        </Text>
        
        <OptionItem
          icon="📝"
          title="Mis pedidos"
          subtitle="Ver historial de compras"
          onPress={() => handleOption('Mis pedidos')}
        />
        <OptionItem
          icon="❤️"
          title="Favoritos"
          subtitle="Libros guardados"
          onPress={() => handleOption('Favoritos')}
        />
        <OptionItem
          icon="⭐"
          title="Reseñas"
          subtitle="Mis valoraciones"
          onPress={() => handleOption('Reseñas')}
        />

        {/* Settings Section */}
        <Text className="text-sm font-MontserratBold text-nexus-500 uppercase mb-3 ml-1 mt-6">
          Configuración
        </Text>
        
        <OptionItem
          icon="🔔"
          title="Notificaciones"
          subtitle="Gestiona tus alertas"
          onPress={() => handleOption('Notificaciones')}
        />
        <OptionItem
          icon="🌍"
          title="Idioma"
          subtitle="Español"
          onPress={() => handleOption('Idioma')}
        />
        <OptionItem
          icon="📳"
          title="Retroalimentación háptica"
          subtitle="Vibraciones activadas"
          badge="✓"
          onPress={() => handleOption('Háptica')}
        />

        {/* Help Section */}
        <Text className="text-sm font-MontserratBold text-nexus-500 uppercase mb-3 ml-1 mt-6">
          Ayuda
        </Text>
        
        <OptionItem
          icon="❓"
          title="Centro de ayuda"
          subtitle="Preguntas frecuentes"
          onPress={() => handleOption('Ayuda')}
        />
        <OptionItem
          icon="📧"
          title="Contacto"
          subtitle="soporte@nexus.com"
          onPress={() => handleOption('Contacto')}
        />
        <OptionItem
          icon="ℹ️"
          title="Acerca de"
          subtitle="Versión 1.0.0"
          onPress={() => handleOption('Acerca de')}
        />

        {/* Logout Button */}
        <Pressable
          onPress={handleLogout}
          className="bg-red-600 active:bg-red-700 rounded-xl py-4 mt-6 mb-4"
        >
          <Text className="text-white text-center text-base font-MontserratSemiBold">
            Cerrar sesión
          </Text>
        </Pressable>

        <Text className="text-center text-xs font-MontserratRegular text-nexus-400 mt-4 mb-8">
          Nexus • Tu librería digital
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const OptionItem = ({ icon, title, subtitle, badge, onPress }) => (
  <Pressable
    onPress={onPress}
    className="bg-white rounded-2xl p-4 mb-2 flex-row items-center shadow-sm active:bg-gray-50"
  >
    <View className="w-12 h-12 bg-nexus-100 rounded-xl items-center justify-center mr-4">
      <Text className="text-2xl">{icon}</Text>
    </View>

    <View className="flex-1">
      <Text className="text-base font-MontserratSemiBold text-nexus-800 mb-0.5">
        {title}
      </Text>
      <Text className="text-sm font-MontserratRegular text-nexus-500">
        {subtitle}
      </Text>
    </View>

    {badge ? (
      <Text className="text-lg text-green-600">{badge}</Text>
    ) : (
      <Text className="text-nexus-400">›</Text>
    )}
  </Pressable>
);