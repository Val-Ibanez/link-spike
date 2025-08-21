import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';

interface Movement {
  id: string;
  description: string;
  amount: string;
  type: 'credit' | 'debit';
  date: string;
  category: string;
}

interface RecentMovementsProps {
  movements: Movement[];
  onMovementPress?: (movement: Movement) => void;
  onViewAllPress?: () => void;
}

export default function RecentMovements({ 
  movements, 
  onMovementPress,
  onViewAllPress 
}: RecentMovementsProps): React.JSX.Element {
  const { theme } = useTheme();

  const renderMovement = ({ item }: { item: Movement }) => (
    <TouchableOpacity 
      style={[styles.movementItem, { borderBottomColor: theme.border || '#E9ECEF' }]}
      onPress={() => onMovementPress?.(item)}
      activeOpacity={0.7}
    >
      <View style={styles.movementLeft}>
        <View style={[styles.categoryIcon, { backgroundColor: theme.primary + '20' }]}>
          <Text style={[styles.categoryText, { color: theme.primary }]}>
            {item.category.charAt(0).toUpperCase()}
          </Text>
        </View>
        <View style={styles.movementInfo}>
          <Text style={[styles.description, { color: theme.text }]} numberOfLines={1}>
            {item.description}
          </Text>
          <Text style={[styles.date, { color: theme.textSecondary }]}>
            {item.date}
          </Text>
        </View>
      </View>
      
      <View style={styles.movementRight}>
        <Text style={[
          styles.amount, 
          { color: item.type === 'credit' ? theme.success : theme.error }
        ]}>
          {item.type === 'credit' ? '+' : '-'}{item.amount}
        </Text>
        <Text style={[styles.category, { color: theme.textSecondary }]}>
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Movimientos Recientes</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text style={[styles.viewAll, { color: theme.primary }]}>Ver todos</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={movements.slice(0, 5)}
        renderItem={renderMovement}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  viewAll: {
    fontSize: 14,
    fontWeight: '500',
  },
  movementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  movementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  movementInfo: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    fontWeight: '400',
  },
  movementRight: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    fontWeight: '400',
  },
});
