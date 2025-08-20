import React from 'react';
import { SafeAreaView, ScrollView, Text, View, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';
import DynamicHeaderLogo from '../../components/DynamicHeaderLogo';
import ZustandTest from '../../components/ZustandTest';

export default function ProfileScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);

  const email = 'usuario' + tenantConfig.displayName + '@example.com'

  // Datos de ejemplo del usuario
  const userProfile = {
    name: 'Usuario Demo',
    email: email,
    phone: '+1 234 567 8900',
    merchantId: 'MERCH_12345',
    status: 'Activo',
    since: '2024'
  };


  console.log('holis')
  const ProfileItem = ({ label, value }: { label: string; value: string }) => (
    <View style={{ marginBottom: 16 }}>
      <Text style={[styles.bodyTextSecondary, { fontSize: 12, textTransform: 'uppercase' }]}>{label}</Text>
      <Text style={[styles.bodyText, { fontSize: 16, marginTop: 4 }]}>{value}</Text>
      <Text style={[styles.bodyText, { fontSize: 16, marginTop: 4 }]}>theme: {theme.primary}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={[styles.card, styles.headerCard, { alignItems: 'center' }]}>
          <View style={{ alignItems: 'center', marginBottom: 10 }}>
            <DynamicHeaderLogo width={50} height={50} />
          </View>
          <Text style={[styles.heading1, styles.whiteText]}>Mi Perfil</Text>
          <Text style={[styles.bodyText, styles.whiteText]}>{tenantConfig.displayName}</Text>
        </View>

        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: theme.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 10
            }}>
              <Text style={{ fontSize: 32, color: '#FFFFFF' }}>👤</Text>
            </View>
            <Text style={styles.heading2}>{userProfile.name}</Text>
            <Text style={[styles.bodyTextSecondary, {
              backgroundColor: userProfile.status === 'Activo' ? '#28A745' : '#DC3545',
              color: '#FFFFFF',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
              fontSize: 12
            }]}>
              {userProfile.status}
            </Text>
          </View>

          <ProfileItem label="Email" value={userProfile.email} />
          <ProfileItem label="Teléfono" value={userProfile.phone} />
          <ProfileItem label="ID de Comercio" value={userProfile.merchantId} />
          <ProfileItem label="Cliente desde" value={userProfile.since} />
        </View>

        <View style={styles.card}>
          <Text style={styles.heading3}>Acciones de Cuenta</Text>
          
          <TouchableOpacity 
            style={[styles.primaryButton, { marginTop: 10 }]}
            onPress={() => Alert.alert('Editar Perfil', 'Funcionalidad en desarrollo')}
          >
            <Text style={styles.primaryButtonText}>✏️ Editar Perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.primaryButton, { marginTop: 10, backgroundColor: theme.accent }]}
            onPress={() => Alert.alert('Cambiar Contraseña', 'Funcionalidad en desarrollo')}
          >
            <Text style={styles.primaryButtonText}>🔒 Cambiar Contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.primaryButton, { marginTop: 10, backgroundColor: '#DC3545' }]}
            onPress={() => Alert.alert('Cerrar Sesión', '¿Estás seguro que deseas cerrar sesión?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Cerrar Sesión', style: 'destructive' }
            ])}
          >
            <Text style={styles.primaryButtonText}>😪 Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

        {/* 🧪 Test de Zustand */}
        <View style={styles.card}>
          <Text style={styles.heading3}>🧪 Test de Estado Global</Text>
          <ZustandTest />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}