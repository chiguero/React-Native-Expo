import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
import { useCart } from '../../context/CartContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabsLayout() {
  const { getItemsCount } = useCart();
  const itemsCount = getItemsCount();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1e293b',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: 'Montserrat-Bold',
        },
        tabBarActiveTintColor: '#1e293b',
        tabBarInactiveTintColor: '#64748b',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e2e8f0',
          paddingBottom: insets.bottom,
          paddingTop: 5,
          height: 60 + insets.bottom,
        },
        tabBarLabelStyle: {
          fontFamily: 'Montserrat-Medium',
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Catálogo',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📚</Text>,
        }}
      />
      
      <Tabs.Screen
        name="bestsellers"
        options={{
          title: 'Más Vendidos',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⭐</Text>,
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Carrito',
          tabBarIcon: ({ color }) => (
            <View>
              <Text style={{ fontSize: 24 }}>🛒</Text>
              {itemsCount > 0 && (
                <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-MontserratBold">
                    {itemsCount > 9 ? '9+' : itemsCount}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>👤</Text>,
        }}
      />
    </Tabs>
  );
}