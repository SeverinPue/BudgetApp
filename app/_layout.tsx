import { Stack } from 'expo-router';
import { BudgetProvider } from '../context/Context';

export default function RootLayout() {
  return (
    <BudgetProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="expenses" />
      </Stack>
    </BudgetProvider>
  );
}