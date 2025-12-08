import React from 'react';
import { View, Text, ScrollView, Pressable, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import "../../global.css";

export default function ProfileScreen() {
  const router = useRouter();

  const handleOption = (option) => {
    Haptics.selectionAsync();
    Alert.alert('Función en desarrollo', `Has seleccionado: ${option}`);
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
          onPress: () => router.replace('/'),
        },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Profile Header */}
        <View className="bg-nexus-800 rounded-3xl p-6 mb-6 items-center">
          <View className="w-24 h-24 bg-white rounded-full items-center justify-center mb-4">
            <Text className="text-5xl">👤</Text>
          </View>

          <Text className="text-2xl font-MontserratBold text-white mb-1">
            Usuario Demo
          </Text>
          <Text className="text-sm font-MontserratRegular text-nexus-100">
            demo@nexus.com
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

        <Text className="text-center text-xs font-MontserratRegular text-nexus-400 mt-4">
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