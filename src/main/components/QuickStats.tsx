import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';

interface StatItem {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

interface QuickStatsProps {
  stats: StatItem[];
}

export default function QuickStats({ stats }: QuickStatsProps): React.JSX.Element {
  const { theme } = useTheme();

  const getChangeColor = (changeType?: 'positive' | 'negative' | 'neutral') => {
    switch (changeType) {
      case 'positive':
        return theme.success;
      case 'negative':
        return theme.error;
      default:
        return theme.textSecondary;
    }
  };

  const getChangeIcon = (changeType?: 'positive' | 'negative' | 'neutral') => {
    switch (changeType) {
      case 'positive':
        return '↗';
      case 'negative':
        return '↘';
      default:
        return '→';
    }
  };

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View 
          key={index} 
          style={[
            styles.statItem, 
            { 
              backgroundColor: theme.surface,
              borderColor: theme.border || '#E9ECEF'
            }
          ]}
        >
          <Text style={[styles.label, { color: theme.textSecondary }]}>
            {stat.label}
          </Text>
          <Text style={[styles.value, { color: theme.text }]}>
            {stat.value}
          </Text>
          {stat.change && (
            <View style={styles.changeContainer}>
              <Text style={[
                styles.changeIcon, 
                { color: getChangeColor(stat.changeType) }
              ]}>
                {getChangeIcon(stat.changeType)}
              </Text>
              <Text style={[
                styles.change, 
                { color: getChangeColor(stat.changeType) }
              ]}>
                {stat.change}
              </Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    textAlign: 'center',
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  changeIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  change: {
    fontSize: 11,
    fontWeight: '500',
  },
});
