import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Button } from '../components';
import "../global.css";

export default function LandingPage() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-nexus-900">
      <StatusBar style="light" />
      <ScrollView className="flex-1" contentContainerClassName="px-6 py-8">
        
        <View className="items-center mb-12 mt-8">
          <View className="w-32 h-32 bg-nexus-700 rounded-3xl items-center justify-center mb-6">
            <Text className="text-6xl">📚</Text>
          </View>
          
          <Text className="text-5xl font-MontserratBold text-white text-center mb-3">
            Nexus
          </Text>
          
          <Text className="text-xl font-MontserratRegular text-white text-center">
            Tu librería digital favorita
          </Text>
        </View>

        <Button
          title="Explorar catálogo"
          variant="primary"
          size="lg"
          onPress={() => router.push('/(tabs)')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}