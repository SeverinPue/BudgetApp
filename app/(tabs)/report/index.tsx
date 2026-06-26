import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBudget } from '../../../context/Context';

export default function ReportScreen() {
  const { expenses, settings } = useBudget();
  const formatAmount = (amount: number) => {
    let finalAmount = amount;
    if (settings.roundAmounts) {
      finalAmount = Math.round(finalAmount);
    }
    return settings.showDecimals
      ? `${finalAmount.toFixed(2)} CHF`
      : `${Math.floor(finalAmount)} CHF`;
  };

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Kompakte Übersicht</Text>

      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportRow}>
            <View>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemCategory}>{item.category}</Text>
            </View>
            <Text style={styles.itemAmount}>{formatAmount(item.amount)}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Keine Daten für die Auswertung vorhanden.</Text>
        }
      />

      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Gesamtausgaben:</Text>
        <Text style={styles.totalValue}>{formatAmount(totalAmount)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 15, textTransform: 'uppercase' },
  reportRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  itemTitle: { fontSize: 16, fontWeight: '500', color: '#333' },
  itemCategory: { fontSize: 12, color: '#777', marginTop: 2 },
  itemAmount: { fontSize: 16, fontWeight: '600', color: '#333' },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999' },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#ccc',
    marginTop: 10
  },
  totalLabel: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#dc3545' }
});