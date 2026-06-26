import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { BudgetProvider } from '../context/Context';
import { registerForPushNotificationsAsync } from '../services/NotificationService';

export default function RootLayout() {
  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <BudgetProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="expenses" />
      </Stack>
    </BudgetProvider>
  );
}