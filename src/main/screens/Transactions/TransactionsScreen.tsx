import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';

export default function TransactionsScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');

  // Datos de ejemplo de transacciones
  const transactions = [
    { id: '1', amount: 150.00, type: 'QR', time: '14:30', status: 'Completada', card: '****1234' },
    { id: '2', amount: 89.50, type: 'Contactless', time: '13:15', status: 'Completada', card: '****5678' },
    { id: '3', amount: 200.00, type: 'Cuotas', time: '12:45', status: 'Pendiente', card: '****9012' },
    { id: '4', amount: 45.75, type: 'Tarjeta', time: '11:20', status: 'Completada', card: '****3456' },
    { id: '5', amount: 120.00, type: 'QR', time: '10:15', status: 'Completada', card: '****7890' },
  ];

  const totalToday = transactions.reduce((sum, t) => t.status === 'Completada' ? sum + t.amount : sum, 0);

  const FilterButton = ({ filterType, label }: { filterType: 'all' | 'today' | 'week'; label: string }) => (
    <TouchableOpacity
      style={[
        styles.primaryButton,
        {
          backgroundColor: filter === filterType ? theme.primary : theme.surface,
          borderColor: theme.primary,
          borderWidth: 1,
          marginRight: 8,
          paddingHorizontal: 16,
          paddingVertical: 8
        }
      ]}
      onPress={() => setFilter(filterType)}
    >
      <Text style={{
        color: filter === filterType ? '#FFFFFF' : theme.primary,
        fontSize: 14,
        fontWeight: 'bold'
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const TransactionItem = ({ transaction }: { transaction: any }) => (
    <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}>
      <View style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: transaction.status === 'Completada' ? '#28A745' : '#FFC107',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12
      }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16 }}>
          {transaction.type === 'QR' ? '📱' : 
           transaction.type === 'Contactless' ? '📡' :
           transaction.type === 'Cuotas' ? '📊' : '💳'}
        </Text>
      </View>
      
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.heading3}>${transaction.amount.toFixed(2)}</Text>
          <Text style={styles.bodyTextSecondary}>{transaction.time}</Text>
        </View>
        <Text style={styles.bodyTextSecondary}>{transaction.type} • {transaction.card}</Text>
        <Text style={[
          styles.bodyTextSecondary,
          {
            color: transaction.status === 'Completada' ? '#28A745' : '#FFC107',
            fontSize: 12,
            fontWeight: 'bold'
          }
        ]}>
          {transaction.status}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.card, styles.headerCard]}>
          <Text style={[styles.heading1, styles.whiteText]}>Transacciones</Text>
          <Text style={[styles.bodyText, styles.whiteText]}>{tenantConfig.displayName}</Text>
        </View>

        {/* Resumen del día */}
        <View style={styles.card}>
          <Text style={styles.heading2}>Resumen de Hoy</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
            <View>
              <Text style={styles.bodyTextSecondary}>Total Vendido</Text>
              <Text style={[styles.heading1, { color: theme.primary }]}>${totalToday.toFixed(2)}</Text>
            </View>
            <View>
              <Text style={styles.bodyTextSecondary}>Transacciones</Text>
              <Text style={[styles.heading1, { color: theme.primary }]}>{transactions.length}</Text>
            </View>
          </View>
        </View>

        {/* Filtros */}
        <View style={styles.card}>
          <Text style={styles.heading3}>Filtrar por:</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <FilterButton filterType="all" label="Todas" />
            <FilterButton filterType="today" label="Hoy" />
            <FilterButton filterType="week" label="Semana" />
          </View>
        </View>

        {/* Lista de transacciones */}
        <View style={styles.card}>
          <Text style={styles.heading3}>Historial de Transacciones</Text>
        </View>
        
        {transactions.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}