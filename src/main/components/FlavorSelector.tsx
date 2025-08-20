import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp, useFlavorConfig } from '../stores';

// 🏦 Flavor Selector - Componente de ejemplo usando Zustand
export const FlavorSelector: React.FC = () => {
  const { currentFlavor, changeFlavor, isLoading } = useApp();
  const { config } = useFlavorConfig();

  const flavors = ['bancoSantaCruz', 'bancoEntreRios', 'bancoSantaFe'];

  const handleFlavorChange = async (flavorName: string) => {
    try {
      await changeFlavor(flavorName);
    } catch (error) {
      console.error('Error cambiando flavor:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selector de Flavor</Text>
      <Text style={styles.currentFlavor}>
        Flavor actual: {config?.displayName || 'Cargando...'}
      </Text>
      
      <View style={styles.flavorButtons}>
        {flavors.map((flavor) => (
          <TouchableOpacity
            key={flavor}
            style={[
              styles.flavorButton,
              currentFlavor === flavor && styles.activeFlavorButton
            ]}
            onPress={() => handleFlavorChange(flavor)}
            disabled={currentFlavor === flavor}
          >
            <Text style={[
              styles.flavorButtonText,
              currentFlavor === flavor && styles.activeFlavorButtonText
            ]}>
              {flavor.replace('banco', 'Banco ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {config && (
        <View style={styles.configInfo}>
          <Text style={styles.configTitle}>Configuración del Flavor:</Text>
          <Text>• Tema: {config.theme?.primary}</Text>
          <Text>• Dashboard: {config.features?.dashboardVariant}</Text>
          <Text>• Multi-currency: {config.features?.multiCurrency ? 'Sí' : 'No'}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  currentFlavor: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  flavorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  flavorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeFlavorButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  flavorButtonText: {
    fontSize: 16,
    color: '#333',
  },
  activeFlavorButtonText: {
    color: '#fff',
  },
  configInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  configTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

