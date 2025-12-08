import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { MOCK_BOOKS, CATEGORIES } from '../../data/mockData';
import { useCart } from '../../context/CartContext';
import { BookCard } from '../../components';
import "../../global.css";

export default function CatalogScreen() {
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBooks = MOCK_BOOKS.filter(book => {
    const matchesCategory = selectedCategory === 'Todos' || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCategoryPress = (category) => {
    Haptics.selectionAsync();
    setSelectedCategory(category);
  };

  const handleAddToCart = (book) => {
    addToCart(book);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerClassName="px-4 py-4">
        
        {/* Search Bar */}
        <View className="mb-4">
          <View className="bg-white rounded-xl px-4 py-3 flex-row items-center shadow-sm">
            <Text className="text-xl mr-2">🔍</Text>
            <TextInput
              className="flex-1 font-MontserratRegular text-base"
              placeholder="Buscar libros o autores..."
              placeholderTextColor="#94a3b8"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Categories */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              onPress={() => handleCategoryPress(category.name)}
              className={`
                px-4 py-2 rounded-full mr-2
                ${selectedCategory === category.name ? 'bg-nexus-800' : 'bg-white'}
              `}
            >
              <Text
                className={`
                  font-MontserratSemiBold text-sm
                  ${selectedCategory === category.name ? 'text-white' : 'text-nexus-700'}
                `}
              >
                {category.icon} {category.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Results Count */}
        <Text className="text-sm font-MontserratMedium text-nexus-500 mb-3">
          {filteredBooks.length} {filteredBooks.length === 1 ? 'libro encontrado' : 'libros encontrados'}
        </Text>

        {/* Books List */}
        {filteredBooks.length === 0 ? (
          <View className="flex-1 items-center justify-center py-20">
            <Text className="text-6xl mb-4">📚</Text>
            <Text className="text-xl font-MontserratBold text-nexus-800 mb-2">
              No hay libros
            </Text>
            <Text className="text-base font-MontserratRegular text-nexus-500 text-center px-8">
              Intenta con otra búsqueda o categoría
            </Text>
          </View>
        ) : (
          filteredBooks.map(book => (
            <BookCard
              key={book.id}
              book={book}
              onPress={(book) => router.push(`/book/${book.id}`)}
              onAddToCart={handleAddToCart}
            />
          ))
        )}

        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
}