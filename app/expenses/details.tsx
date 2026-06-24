import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useBudget } from '../../context/Context';

const CATEGORIES = ['Lebensmittel/Haushalt', 'Restaurant & Café', 'Hobbies', 'Ausgang', 'Sonstiges'];

export default function AddExpenseScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState('');
  const { addExpense } = useBudget();

  const handleSave = () => {
    const parsedAmount = parseFloat(amount);
    if (!title || isNaN(parsedAmount) || parsedAmount <= 0) {
      Alert.alert('Fehler', 'Bitte gib einen gültigen Titel und Betrag ein.');
      return;
    }

    addExpense({
      title,
      category,
      amount: parsedAmount,
      description: description || undefined
    });

    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kategorie:</Text>
      <View style={styles.categoryRow}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryButton, category === cat && styles.categoryButtonActive]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.categoryButtonText, category === cat && styles.categoryButtonTextActive]}>
              {cat.split('/')[0]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Titel / Geschäft:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="z. B. Migros, Konzertticket"
      />

      <Text style={styles.label}>Betrag (CHF):</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        placeholder="15.50"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Kommentar (optional):</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        value={description}
        onChangeText={setDescription}
        placeholder="Beschreibung hinzufügen..."
        multiline
      />

      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color="#007AFF" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, fontSize: 16, backgroundColor: '#f9f9f9' },
  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 10 },
  categoryButton: { paddingVertical: 8, paddingHorizontal: 12, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, backgroundColor: '#f0f0f0' },
  categoryButtonActive: { backgroundColor: '#007AFF', borderColor: '#007AFF' },
  categoryButtonText: { color: '#333', fontSize: 13 },
  categoryButtonTextActive: { color: '#fff' },
  buttonContainer: { marginTop: 30 }
});