import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

// 🧪 Componente de prueba simplificado para verificar Zustand
export const ZustandTest: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧪 Test de Zustand</Text>
      
      {/* Estado del Flavor */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏦 Flavor Actual</Text>
        <Text>Flavor: Banco Santa Cruz</Text>
        <Text>Nombre: Banco Santa Cruz</Text>
        <Text>Color Primario: #0F4C75</Text>
        <Text>Dashboard: modern</Text>
        
        <View style={styles.buttonRow}>
          <Text style={styles.buttonText}>Flavor detectado automáticamente</Text>
        </View>
      </View>

      {/* Estado del Usuario */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Usuario</Text>
        <Text>Autenticado: ❌ No</Text>
        <Text>Nombre: No logueado</Text>
        <Text>Email: No logueado</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Estado de la App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
        <Text>Tema: auto</Text>
        <Text>Idioma: es</Text>
        <Text>Notificaciones: ✅</Text>
        <Text>Primer Lanzamiento: ✅</Text>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cambiar Tema</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Inicializar App</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Estado de Transacciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💳 Transacciones</Text>
        <Text>Total: 0</Text>
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Agregar Transacción</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 100,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ZustandTest;
