import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useBudget } from '../../context/Context';

export default function BudgetListScreen() {
  const { expenses } = useBudget();

  const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={expenses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <View>
              <Text style={styles.categoryText}>{item.category}</Text>
              <Text style={styles.titleText}>{item.title}</Text>
              {item.description ? <Text style={styles.descText}>{item.description}</Text> : null}
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.amountText}>{item.amount.toFixed(2)} CHF</Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Noch keine Ausgaben vorhanden. Tippe oben auf das "+".</Text>
        }
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalValue}>{totalAmount.toFixed(2)} CHF</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
    backgroundColor: '#fff'
  },
  categoryText: { fontSize: 13, fontWeight: 'bold', color: '#007AFF' },
  titleText: { fontSize: 16, color: '#333', marginTop: 2 },
  descText: { fontSize: 12, color: '#777', fontStyle: 'italic', marginTop: 2 },
  amountText: { fontSize: 16, fontWeight: 'bold', color: '#dc3545' },
  dateText: { fontSize: 12, color: '#999', marginTop: 4 },
  emptyText: { textAlign: 'center', marginTop: 40, color: '#999', paddingHorizontal: 20 },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#dddddd',
  },
  totalLabel: { fontSize: 18, fontWeight: 'bold' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: '#28a745' },
});