import { View, Text, Button } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/profile">Ir a Profile</Link>
    </View>
  );
}