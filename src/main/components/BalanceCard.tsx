import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';

interface BalanceCardProps {
  balance: string;
  currency: string;
  accountType: string;
  accountNumber: string;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

export default function BalanceCard({
  balance,
  currency,
  accountType,
  accountNumber,
  onPress,
}: BalanceCardProps): React.JSX.Element {
  const { theme } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: theme.primary, marginTop: 12 }]}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Balance */}
      <View style={styles.balanceContainer}>
        <Text style={styles.currency}>{currency}</Text>
        <Text style={styles.balance}>{balance}</Text>
      </View>

      <View style={styles.content}>
        {/* Account Info */}
        <View style={styles.accountInfo}>
          <Text style={styles.accountType}>{accountType}</Text>
          <Text style={styles.accountNumber}>
            ****{accountNumber.slice(-4)}
          </Text>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <View style={styles.actionButton}>
            <Text style={styles.actionText}>Ver detalle</Text>
          </View>
        </View>
      </View>

      {/* Decorative Elements */}
      <View style={styles.decorativeCircle1} />
      <View style={styles.decorativeCircle2} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    height: 170,
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 4,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    zIndex: 2,
    marginTop: 8,
  },
  accountInfo: {
    alignItems: 'flex-start',
  },
  accountType: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  accountNumber: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    fontWeight: '400',
  },
  balanceContainer: {
    alignItems: 'center',
  },
  currency: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  balance: {
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
  },
  quickActions: {
    alignItems: 'flex-end',
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  actionText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  decorativeCircle1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    zIndex: 1,
  },
  decorativeCircle2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.18)',
    zIndex: 1,
  },
});
