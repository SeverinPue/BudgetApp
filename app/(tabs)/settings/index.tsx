import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useBudget } from '../../../context/Context';

export default function SettingsScreen() {
  const { settings, updateSetting } = useBudget();

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Anzeige-Optionen</Text>

      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Nachkommastellen anzeigen</Text>
          <Text style={styles.settingDesc}>Zeigt Beträge mit Rappen an (z. B. 15.50 CHF)</Text>
        </View>
        <Switch
          value={settings.showDecimals}
          onValueChange={(value) => updateSetting('showDecimals', value)}
          trackColor={{ false: '#767577', true: '#34c759' }}
        />
      </View>

      <View style={styles.settingRow}>
        <View style={styles.textContainer}>
          <Text style={styles.settingTitle}>Beträge runden</Text>
          <Text style={styles.settingDesc}>Rundet Beträge auf den nächsten Franken</Text>
        </View>
        <Switch
          value={settings.roundAmounts}
          onValueChange={(value) => updateSetting('roundAmounts', value)}
          trackColor={{ false: '#767577', true: '#34c759' }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa', padding: 20 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: '#666', marginBottom: 10, textTransform: 'uppercase' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2
  },
  textContainer: { flex: 1, paddingRight: 10 },
  settingTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  settingDesc: { fontSize: 12, color: '#888', marginTop: 2 }
});