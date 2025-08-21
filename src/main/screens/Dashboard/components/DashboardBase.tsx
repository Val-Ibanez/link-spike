import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../core/themes/ThemeProvider';
import { 
  Header, 
  BalanceCard, 
  QuickStats, 
  RecentMovements,
  BalanceLineChart,
  StatsCard
} from '../../../components';
import { PaySvg, SettingsSvg, HomeSvg, ProfileSvg, QrSvg, ContactlessSvg } from '../../../components/SVG';

interface DashboardBaseProps {
  onNavigateToPayments: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToSettings: () => void;
}

export default function DashboardBase({ 
  onNavigateToPayments, 
  onNavigateToTransactions, 
  onNavigateToSettings 
}: DashboardBaseProps): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();

  // Datos de ejemplo para el dashboard
  const mockBalance = {
    balance: '$125.430,50',
    currency: 'ARS',
    accountType: 'Cuenta Corriente',
    accountNumber: '1234567890',
  };

  const mockStats = [
    { label: 'Ingresos', value: '+$89.450', change: '8%', changeType: 'positive' as const, icon: '💰' },
    { label: 'Gastos', value: '-$45.230', change: '12%', changeType: 'negative' as const, icon: '💸' },
    { label: 'Ahorros', value: '$23.120', change: '5%', changeType: 'neutral' as const, icon: '🏦' },
  ];

  const mockMovements = [
    {
      id: '1',
      description: 'Transferencia recibida',
      amount: '$15,000',
      type: 'credit' as const,
      date: 'Hoy, 14:30',
      category: 'Transferencia',
    },
    {
      id: '2',
      description: 'Supermercado La Anónima',
      amount: '$8,450',
      type: 'debit' as const,
      date: 'Ayer, 18:15',
      category: 'Compras',
    },
    {
      id: '3',
      description: 'Depósito en efectivo',
      amount: '$25,000',
      type: 'credit' as const,
      date: '15 Ago, 10:00',
      category: 'Depósito',
    },
    {
      id: '4',
      description: 'Restaurante El Bodegón',
      amount: '$3,200',
      type: 'debit' as const,
      date: '14 Ago, 21:30',
      category: 'Gastronomía',
    },
    {
      id: '5',
      description: 'Pago de servicios',
      amount: '$12,800',
      type: 'debit' as const,
      date: '13 Ago, 09:15',
      category: 'Servicios',
    },
  ];

  // Datos para el gráfico de línea del balance
  const balanceChartData = [
    { date: '15', value: 65000 },
    { date: '16', value: 68000 },
    { date: '17', value: 72000 },
    { date: '18', value: 69000 },
    { date: '19', value: 75000 },
    { date: '20', value: 78435 },
    { date: '21', value: 82000 },
  ];

 // Estilos dinámicos basados en el theme actual
  const dynamicStyles = StyleSheet.create({
    navPillActive: {
      backgroundColor: theme.primary, // Dinámico
    },
    heroSection: {
      backgroundColor: theme.primary, // Dinámico
    },
    quickAccessIcon: {
      backgroundColor: 'transparent', // Fondo transparente
    },
    productCTAText: {
      color: theme.primary, // Dinámico
    },
  });

  const handleBalancePress = () => {
    onNavigateToTransactions();
  };

  const handleMovementPress = (movement: any) => {
    Alert.alert('Movimiento', `Detalle de: ${movement.description}`);
  };

  const handleViewAllMovements = () => {
    onNavigateToTransactions();
  };

  return (
    <View style={styles.container}>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Mensaje de bienvenida */}
        <View style={styles.welcomeSection}>
          <Text style={[styles.welcomeTitle, { color: theme.text }]}>
            Hola, Comercio!
          </Text>
         


        </View>

<View style={styles.navPills}>
          <TouchableOpacity style={[styles.navPill, dynamicStyles.navPillActive]}>
            <Text style={styles.navPillTextActive}>Movimientos </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navPill}>
            <Text style={styles.navPillText}>Detalle</Text>
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        {/* <BalanceCard
          balance={mockBalance.balance}
          currency={mockBalance.currency}
          accountType={mockBalance.accountType}
          accountNumber={mockBalance.accountNumber}
          onPress={handleBalancePress}
        /> */}

        {/* Gráfico de Balance */}
        <BalanceLineChart
          data={balanceChartData}
          title="Balance Total"
          showPercentage={true}
          percentageChange={12.5}
        />

        {/* Estadísticas Rápidas */}
        <View style={styles.statsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Resumen del Mes</Text>
          <View style={styles.statsGrid}>
            {mockStats.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat.label}
                value={stat.value}
                change={stat.change}
                changeType={stat.changeType}
                icon={stat.icon}
                color={stat.changeType === 'positive' ? theme.success : 
                       stat.changeType === 'negative' ? theme.error : theme.primary}
              />
            ))}
          </View>
        </View>

        {/* Acciones Rápidas
        <View style={styles.quickActionsSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Acciones Rápidas</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
              onPress={onNavigateToPayments}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.primary + '20' }]}>
                <PaySvg width={24} height={24} color={theme.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Pagar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
              onPress={() => Alert.alert('QR', 'Pago con QR')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.primary + '20' }]}>
                <QrSvg width={24} height={24} color={theme.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.text }]}>QR</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
              onPress={() => Alert.alert('Contactless', 'Pago sin contacto')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.primary + '20' }]}>
                <ContactlessSvg width={24} height={24} color={theme.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Sin contacto</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quickActionCard, { backgroundColor: theme.surface }]}
              onPress={() => Alert.alert('Transferir', 'Transferir dinero')}
            >
              <View style={[styles.actionIcon, { backgroundColor: theme.primary + '20' }]}>
                <HomeSvg width={24} height={24} color={theme.primary} />
              </View>
              <Text style={[styles.actionTitle, { color: theme.text }]}>Transferir</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Movimientos Recientes */}
        <RecentMovements
          movements={mockMovements}
          onMovementPress={handleMovementPress}
          onViewAllPress={handleViewAllMovements}
        />

        {/* Promociones Section */}
        <View style={[styles.promotionsSection, { backgroundColor: theme.surface }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Promociones</Text>
          
          <TouchableOpacity style={[styles.promotionCard, { backgroundColor: theme.primary + '10' }]}>
            <View style={styles.promotionContent}>
              <Text style={[styles.promotionTitle, { color: theme.primary }]}>
                🎉 20% OFF en Supermercados
              </Text>
              <Text style={[styles.promotionSubtitle, { color: theme.textSecondary }]}>
                Con tu tarjeta de débito hasta el 31 de agosto
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            {tenantConfig.displayName}
          </Text>
          <Text style={[styles.footerSubtext, { color: theme.textSecondary }]}>
            Tu banco de confianza
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  scrollView: {
    flex: 1,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  welcomeSubtitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  statsSection: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: 'center',
   // shadowColor: '#000',
   // shadowOffset: { width: 0, height: 2 },
   // shadowOpacity: 0.1,
   // shadowRadius: 4,
    //elevation: 3,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  promotionsSection: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    //shadowColor: '#000',
    //shadowOffset: { width: 0, height: 2 },
    //shadowOpacity: 0.1,
    //shadowRadius: 4,
    //elevation: 3,
  },
  navPills: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  navPill: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 12,
    backgroundColor: 'transparent',
  },
   navPillTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },
   navPillText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  promotionCard: {
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  promotionContent: {
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  promotionSubtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});