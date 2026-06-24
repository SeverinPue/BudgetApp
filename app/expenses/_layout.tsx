import { Stack } from 'expo-router';

export default function ExpensesLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="details"
        options={{ title: 'Ausgabe erfassen' }}
      />
    </Stack>
  );
}