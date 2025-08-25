import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { createThemedStyles } from '../../core/themes/styles';
import { DynamicHeaderLogo } from '../../components/DynamicHeaderLogo';
import { ZustandTest } from '../../components/ZustandTest';
import { ProfileSvg } from '../../components/SVG';

export default function ProfileScreen(): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();
  const styles = createThemedStyles(theme);

  const email = 'comercio.' + tenantConfig.id + '@example.com';

  // Datos de ejemplo del usuario
  const userProfile = {
    name: 'Comercio',
    email: email,
    phone: '+1 234 567 8900',
    merchantId: 'MERCH_12345',
    status: 'Activo',
    since: '2024',
  };

  const ProfileItem = ({ label, value }: { label: string; value: string }) => (
    <View style={{ marginBottom: 16 }}>
      <Text
        style={[
          styles.bodyTextSecondary,
          { fontSize: 12, textTransform: 'uppercase' },
        ]}
      >
        {label}
      </Text>
      <Text style={[styles.bodyText, { fontSize: 16, marginTop: 4 }]}>
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: '#989797c2',
                borderWidth: 2,
                marginBottom: 12
              }}
            >
              <ProfileSvg width={28} height={28} color="#989797c2" />
            </View>
            <Text style={styles.heading2}>{userProfile.name}</Text>
            <Text
              style={[
                styles.bodyTextSecondary,
                {
                  backgroundColor:
                    userProfile.status === 'Activo' ? '#28A745' : '#DC3545',
                  color: '#FFFFFF',
                  paddingHorizontal: 8,
                  paddingVertical: 4,
                  borderRadius: 12,
                  fontSize: 12,
                },
              ]}
            >
              {userProfile.status}
            </Text>
          </View>

          <ProfileItem label="Email" value={userProfile.email} />
          <ProfileItem label="Teléfono" value={userProfile.phone} />
          <ProfileItem label="ID de Comercio" value={userProfile.merchantId} />
          <ProfileItem label="Cliente desde" value={userProfile.since} />
        </View>

        {/* 🧪 Test de Zustand */}
        {/* <View style={styles.card}>
          <Text style={styles.heading3}>🧪 Test de Estado Global</Text>
          <ZustandTest />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}
