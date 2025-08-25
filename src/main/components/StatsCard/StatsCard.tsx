import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
  color?: string;
}

export default function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon,
  color 
}: StatsCardProps): React.JSX.Element {
  const { theme } = useTheme();

  const getChangeColor = (changeType: 'positive' | 'negative' | 'neutral') => {
    const changeColors = {
      positive: theme.success,
      negative: theme.error,
      neutral: theme.textSecondary,
    } as const;

    return changeColors[changeType] || changeColors.neutral;
  };

  const getChangeIcon = (changeType: 'positive' | 'negative' | 'neutral') => {
    const changeIcons = {
      positive: '↗',
      negative: '↘',
      neutral: '→',
    } as const;

    return changeIcons[changeType] || changeIcons.neutral;
  };

  const cardColor = color || theme.primary;

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.textSecondary }]}>
          {title}
        </Text>
        {icon && (
          <View style={[styles.iconContainer, { backgroundColor: cardColor + '20' }]}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        )}
      </View>

      <Text style={[styles.value, { color: theme.text }]}>
        {value}
      </Text>

      {change && (
        <View style={styles.changeContainer}>
          <Text style={[
            styles.changeIcon, 
            { color: getChangeColor(changeType) }
          ]}>
            {getChangeIcon(changeType)}
          </Text>
          <Text style={[
            styles.change, 
            { color: getChangeColor(changeType) }
          ]}>
            {change}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 14,
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  change: {
    fontSize: 14,
    fontWeight: '600',
  },
});
