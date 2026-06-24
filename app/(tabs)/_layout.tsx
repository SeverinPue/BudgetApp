import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Für eigene Tab-Icons
import { TouchableOpacity } from 'react-native';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: true }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Budget',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/expenses/details')}
              style={{ marginRight: 15 }}
            >
              <Ionicons name="add" size={28} color="#007AFF" />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ color }) => <Ionicons name="wallet" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="report/index"
        options={{
          title: 'Auswertung',
          tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} />
        }}
      />
      <Tabs.Screen
        name="settings/index"
        options={{
          title: 'Einstellungen',
          tabBarIcon: ({ color }) => <Ionicons name="settings" size={24} color={color} />
        }}
      />
    </Tabs>
  );
}