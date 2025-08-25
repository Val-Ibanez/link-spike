import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';

interface ChartPoint {
  date: string;
  value: number;
}

interface BalanceLineChartProps {
  data: ChartPoint[];
  title?: string;
  height?: number;
  showPercentage?: boolean;
  percentageChange?: number;
}

const { width } = Dimensions.get('window');
const CHART_HEIGHT = 120;

export default function BalanceLineChart({ 
  data, 
  height = CHART_HEIGHT,
  showPercentage = true,
  percentageChange = 12.5
}: BalanceLineChartProps): React.JSX.Element {
  const { theme } = useTheme();

  // Generar datos de ejemplo si no hay datos
  const chartData = data.length > 0 ? data : [
    { date: '15', value: 65000 },
    { date: '16', value: 68000 },
    { date: '17', value: 72000 },
    { date: '18', value: 69000 },
    { date: '19', value: 75000 },
    { date: '20', value: 78435 },
    { date: '21', value: 82000 },
  ];

  const maxValue = Math.max(...chartData.map(item => item.value));
  const minValue = Math.min(...chartData.map(item => item.value));
  const valueRange = maxValue - minValue;

  const renderLineChart = () => {
    const points = chartData.map((item, index) => {
      const x = (index / (chartData.length - 1)) * (width - 80);
      const y = height - 20 - ((item.value - minValue) / valueRange) * (height - 40);
      
      return { x, y, value: item.value, date: item.date };
    });

    return (
      <View style={styles.chartContainer}>
        {/* Línea del gráfico */}
        <View style={styles.lineContainer}>
          {points.map((point, index) => {
            if (index === 0) return null;
            
            const prevPoint = points[index - 1];
            const lineLength = Math.sqrt(
              Math.pow(point.x - prevPoint.x, 2) + Math.pow(point.y - prevPoint.y, 2)
            );
            const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
            
            return (
              <View
                key={index}
                style={[
                  styles.line,
                  {
                    width: lineLength,
                    height: 2,
                    backgroundColor: theme.primary,
                    position: 'absolute',
                    left: prevPoint.x,
                    top: prevPoint.y,
                    transform: [{ rotate: `${angle}rad` }],
                    transformOrigin: 'left center',
                  }
                ]}
              />
            );
          })}
        </View>

        {/* Puntos del gráfico */}
        {points.map((point, index) => (
          <View
            key={index}
            style={[
              styles.point,
              {
                left: point.x - 4,
                top: point.y - 4,
                backgroundColor: theme.primary,
                borderColor: theme.surface,
              }
            ]}
          >
          </View>
        ))}

        {/* Etiquetas del eje X */}
        <View style={styles.xAxis}>
          {chartData.map((item, index) => (
            <Text key={index} style={[styles.xAxisLabel, { color: theme.textSecondary }]}>
              {item.date}
            </Text>
          ))}
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View style={styles.header}>
      <View style={styles.balanceInfo}>
        <Text style={[styles.balanceLabel, { color: theme.textSecondary }]}>
          Balance Actual
        </Text>
        <Text style={[styles.balanceValue, { color: theme.text }]}>
          ${chartData[chartData.length - 1]?.value.toLocaleString('es-AR', {
      currency: 'ARS'
    }) || '0'}
        </Text>
      </View>
        {showPercentage && (
          <View style={[styles.percentageContainer, { backgroundColor: theme.success + '20' }]}>
            <Text style={[styles.percentageText, { color: theme.success }]}>
              +{percentageChange}%
            </Text>
          </View>
        )}
      </View>

      {renderLineChart()}

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginVertical: 16,
    borderRadius: 16,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  percentageContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    height: CHART_HEIGHT,
    position: 'relative',
    marginBottom: 10,
  },
  lineContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  line: {
    borderRadius: 1,
  },
  point: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    borderWidth: 2,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  xAxisLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  balanceInfo: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    fontWeight: '500',
   // marginBottom: 4,
  },
  balanceValue: {
    fontSize: 24,
    fontWeight: '700',
  },
});
