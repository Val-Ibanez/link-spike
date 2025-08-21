import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';

interface ChartData {
  label: string;
  value: number;
  type: 'credit' | 'debit';
}

interface MovementsChartProps {
  data: ChartData[];
  title?: string;
  height?: number;
}

const { width } = Dimensions.get('window');
const CHART_HEIGHT = 200;
const BAR_WIDTH = 30;
const BAR_SPACING = 20;

export default function MovementsChart({ 
  data, 
  title = 'Movimientos del Mes',
  height = CHART_HEIGHT 
}: MovementsChartProps): React.JSX.Element {
  const { theme } = useTheme();

  // Encontrar el valor máximo para escalar el gráfico
  const maxValue = Math.max(...data.map(item => Math.abs(item.value)));
  
  // Generar datos de ejemplo si no hay datos
  const chartData = data.length > 0 ? data : [
    { label: 'Lun', value: 15000, type: 'credit' as const },
    { label: 'Mar', value: 8500, type: 'debit' as const },
    { label: 'Mié', value: 22000, type: 'credit' as const },
    { label: 'Jue', value: 12000, type: 'debit' as const },
    { label: 'Vie', value: 18000, type: 'credit' as const },
    { label: 'Sáb', value: 9500, type: 'debit' as const },
    { label: 'Dom', value: 25000, type: 'credit' as const },
  ];

  const renderBar = (item: ChartData, index: number) => {
    const barHeight = (Math.abs(item.value) / maxValue) * (height - 60);
    const barColor = item.type === 'credit' ? theme.success : theme.error;
    
    return (
      <View key={index} style={styles.barContainer}>
        {/* Barra */}
        <View style={[
          styles.bar, 
          { 
            height: barHeight,
            backgroundColor: barColor,
            width: BAR_WIDTH,
          }
        ]} />
        
        {/* Valor */}
        <Text style={[styles.barValue, { color: theme.text }]}>
          ${(item.value / 1000).toFixed(0)}k
        </Text>
        
        {/* Etiqueta del eje X */}
        <Text style={[styles.axisLabel, { color: theme.textSecondary }]}>
          {item.label}
        </Text>
      </View>
    );
  };

  const renderYAxis = () => {
    const yAxisValues = [0, maxValue / 4, maxValue / 2, (maxValue * 3) / 4, maxValue];
    
    return (
      <View style={styles.yAxis}>
        {yAxisValues.map((value, index) => (
          <View key={index} style={styles.yAxisItem}>
            <Text style={[styles.yAxisLabel, { color: theme.textSecondary }]}>
              ${(value / 1000).toFixed(0)}k
            </Text>
            <View style={[styles.yAxisLine, { borderColor: theme.border || '#E9ECEF' }]} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
      
      <View style={styles.chartContainer}>
        {/* Eje Y */}
        {renderYAxis()}
        
        {/* Gráfico de barras */}
        <View style={styles.chartArea}>
          <View style={styles.barsContainer}>
            {chartData.map((item, index) => renderBar(item, index))}
          </View>
          
          {/* Línea del eje X */}
          <View style={[styles.xAxisLine, { borderColor: theme.border || '#E9ECEF' }]} />
        </View>
      </View>

      {/* Leyenda */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.success }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Ingresos</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: theme.error }]} />
          <Text style={[styles.legendText, { color: theme.textSecondary }]}>Gastos</Text>
        </View>
      </View>
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
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    height: CHART_HEIGHT,
  },
  yAxis: {
    width: 60,
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  yAxisItem: {
    alignItems: 'flex-end',
    height: CHART_HEIGHT / 5,
    justifyContent: 'center',
  },
  yAxisLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginBottom: 5,
  },
  yAxisLine: {
    width: 20,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  chartArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  barsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: CHART_HEIGHT - 60,
    paddingBottom: 10,
  },
  barContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    borderRadius: 4,
    marginBottom: 8,
  },
  barValue: {
    fontSize: 10,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  axisLabel: {
    fontSize: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  xAxisLine: {
    borderTopWidth: 1,
    marginTop: 10,
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    gap: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
