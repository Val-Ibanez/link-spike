import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useTheme } from '../../../core/themes/ThemeProvider';




import { PaySvg, SettingsSvg, HomeSvg, ProfileSvg } from '../../../components/SVG';

interface DashboardSantaCruzExactProps {
  onNavigateToPayments: () => void;
  onNavigateToTransactions: () => void;
  onNavigateToSettings: () => void;
}

const { width } = Dimensions.get('window');

export default function DashboardSantaCruzExact({ 
  onNavigateToPayments, 
  onNavigateToTransactions, 
  onNavigateToSettings 
}: DashboardSantaCruzExactProps): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();

  // Estilos dinámicos basados en el theme actual
  const dynamicStyles = StyleSheet.create({
    navPillActive: {
      backgroundColor: theme.primary, // Dinámico
    },
    heroSection: {
      backgroundColor: theme.primary, // Dinámico
    },
    quickAccessIcon: {
      backgroundColor: 'transparent', // Fondo transparente
    },
    productCTAText: {
      color: theme.primary, // Dinámico
    },
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Principal - Como la Web */}
      <View style={styles.mainHeader}>
        
        
        {/* Navigation Pills - Como la Web */}
        <View style={styles.navPills}>
          <TouchableOpacity style={[styles.navPill, dynamicStyles.navPillActive]}>
            <Text style={styles.navPillTextActive}>Hacete cliente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navPill}>
            <Text style={styles.navPillText}>Homebanking</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Hero Section - Exacto como la Web */}
      <View style={dynamicStyles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Tu banco de confianza</Text>
          <Text style={styles.heroSubtitle}>
            Más de 50 años acompañando tu crecimiento
          </Text>
          <Text style={styles.heroDescription}>
            Descubrí todas las ventajas de ser cliente del banco que mejor te conoce
          </Text>
          
         
        </View>
        
       
      </View>

      {/* Accesos Rápidos - Como la Web */}
      <View style={styles.quickAccessSection}>
        <Text style={styles.sectionTitle}>Accesos Rápidos</Text>
        
        <View style={styles.quickAccessGrid}>
          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={onNavigateToPayments}
          >
            <View style={dynamicStyles.quickAccessIcon}>
              <PaySvg width={24} height={24} color={theme.primary} />
            </View>
            <Text style={styles.quickAccessTitle}>Homebanking</Text>
            <Text style={styles.quickAccessSubtitle}>Accedé a tu cuenta</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={() => Alert.alert('Turnos', 'Sistema de turnos')}
          >
            <View style={dynamicStyles.quickAccessIcon}>
              <SettingsSvg width={24} height={24} color={theme.primary} />
            </View>
            <Text style={styles.quickAccessTitle}>Turnos</Text>
            <Text style={styles.quickAccessSubtitle}>Reservá tu turno</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={() => Alert.alert('Sucursales', 'Encontrá tu sucursal')}
          >
            <View style={dynamicStyles.quickAccessIcon}>
              <HomeSvg width={24} height={24} color={theme.primary} />
            </View>
            <Text style={styles.quickAccessTitle}>Sucursales</Text>
            <Text style={styles.quickAccessSubtitle}>Encontrá la más cercana</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.quickAccessCard}
            onPress={onNavigateToSettings}
          >
            <View style={dynamicStyles.quickAccessIcon}>
              <ProfileSvg width={24} height={24} color={theme.primary} />
            </View>
            <Text style={styles.quickAccessTitle}>Contacto</Text>
            <Text style={styles.quickAccessSubtitle}>Hablá con nosotros</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Productos Destacados - Como la Web */}
      <View style={styles.productsSection}>
        <Text style={styles.sectionTitle}>Productos Destacados</Text>
        
        <View style={styles.productCardsContainer}>
          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>Cuenta Corriente</Text>
              <Text style={styles.productBadge}>Sin costo</Text>
            </View>
            <Text style={styles.productDescription}>
              La cuenta que se adapta a tu día a día con todos los beneficios incluidos
            </Text>
            <View style={styles.productFeatures}>
              <Text style={styles.productFeature}>• Tarjeta de débito gratis</Text>
              <Text style={styles.productFeature}>• Homebanking sin costo</Text>
              <Text style={styles.productFeature}>• Transferencias ilimitadas</Text>
            </View>
            <TouchableOpacity style={styles.productCTA}>
              <Text style={dynamicStyles.productCTAText}>Más información</Text>
            </TouchableOpacity>
          </TouchableOpacity>

          <TouchableOpacity style={styles.productCard}>
            <View style={styles.productHeader}>
              <Text style={styles.productTitle}>Tarjeta de Crédito</Text>
              <Text style={styles.productBadge}>Promoción</Text>
            </View>
            <Text style={styles.productDescription}>
              Sin costo anual de por vida para nuevos clientes
            </Text>
            <View style={styles.productFeatures}>
              <Text style={styles.productFeature}>• Sin costo anual</Text>
              <Text style={styles.productFeature}>• Hasta 12 cuotas sin interés</Text>
              <Text style={styles.productFeature}>• Descuentos exclusivos</Text>
            </View>
            <TouchableOpacity style={styles.productCTA}>
              <Text style={dynamicStyles.productCTAText}>Solicitar ahora</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>

      {/* Promociones Especiales - Como la Web */}
      <View style={styles.promotionsSection}>
        <Text style={styles.sectionTitle}>Promociones Especiales</Text>
        
        <TouchableOpacity style={styles.promotionBanner}>
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>¡Especial Día de la Niñez!</Text>
            <Text style={styles.promotionSubtitle}>
              Hasta 50% de descuento en jugueterías seleccionadas
            </Text>
            <Text style={styles.promotionCTA}>Ver promoción</Text>
          </View>
          <View style={styles.promotionIcon}>
            <Text style={styles.promotionIconText}>🎁</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.promotionBanner}>
          <View style={styles.promotionContent}>
            <Text style={styles.promotionTitle}>Ganá un viaje a Londres</Text>
            <Text style={styles.promotionSubtitle}>
              Participá con cada compra y viajá con todo pago
            </Text>
            <Text style={styles.promotionCTA}>Participar</Text>
          </View>
          <View style={styles.promotionIcon}>
            <Text style={styles.promotionIconText}>✈️</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Información de Seguridad - Como la Web */}
      <View style={styles.securitySection}>
        <View style={styles.securityHeader}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityTitle}>Seguridad Bancaria</Text>
        </View>
        <Text style={styles.securityText}>
          ¡Cuidado con los troyanos bancarios! El banco nunca te va a pedir datos por mail o teléfono.
        </Text>
        <TouchableOpacity style={styles.securityCTA}>
          <Text style={styles.securityCTAText}>Conocé más sobre seguridad</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Info */}
      <View style={styles.footer}>
                    <Text style={styles.footerText}>{tenantConfig.displayName}</Text>
        <Text style={styles.footerSubtext}>Ser local tiene beneficios</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  
  // Main Header - Como la Web
  mainHeader: {
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  mainLogo: {
    width: 120,
    height: 50,
  },
  
  // Navigation Pills - Como la Web
  navPills: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  navPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
  navPillActive: {
    // Movido a dynamicStyles
  },
  navPillText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  navPillTextActive: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
  },

  // Hero Section - Exacto como la Web
  heroSection: {
    // backgroundColor movido a dynamicStyles
    paddingHorizontal: 24,
    paddingVertical: 32,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroContent: {
    flex: 2,
    padding: 20,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    lineHeight: 34,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#E8F0FE',
    marginBottom: 12,
    fontWeight: '500',
  },
  heroDescription: {
    fontSize: 14,
    color: '#BDC7D8',
    lineHeight: 20,
    marginBottom: 20,
  },
  heroCTA: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  heroCTAText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  heroImageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  heroImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImageText: {
    fontSize: 32,
  },

  // Quick Access - Como la Web
  quickAccessSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 24,
    textAlign: 'center',
  },
  quickAccessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAccessCard: {
    width: (width - 48 - 15) / 2,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  quickAccessIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    // backgroundColor movido a dynamicStyles
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickAccessIconText: {
    fontSize: 24,
  },
  quickAccessTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
    textAlign: 'center',
  },
  quickAccessSubtitle: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Products Section - Como la Web
  productsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 8,
  },
  productCardsContainer: {
    gap: 16,
  },
  productCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 24,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  productBadge: {
    backgroundColor: '#F59E0B',
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  productDescription: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 20,
    marginBottom: 16,
  },
  productFeatures: {
    marginBottom: 20,
  },
  productFeature: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 4,
  },
  productCTA: {
    alignSelf: 'flex-start',
  },
  productCTAText: {
    fontSize: 14,
    fontWeight: '600',
    // color movido a dynamicStyles
  },

  // Promotions - Como la Web
  promotionsSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 32,
    marginTop: 8,
  },
  promotionBanner: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  promotionContent: {
    flex: 1,
    paddingRight: 16,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 6,
  },
  promotionSubtitle: {
    fontSize: 13,
    color: '#495057',
    lineHeight: 18,
    marginBottom: 8,
  },
  promotionCTA: {
    fontSize: 13,
    fontWeight: '600',
    color: '#F59E0B',
  },
  promotionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  promotionIconText: {
    fontSize: 20,
  },

  // Security Section - Como la Web
  securitySection: {
    backgroundColor: '#FEF3C7',
    marginHorizontal: 24,
    marginTop: 16,
    marginBottom: 24,
    borderRadius: 8,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  securityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  securityIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  securityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#92400E',
  },
  securityText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
    marginBottom: 12,
  },
  securityCTA: {
    alignSelf: 'flex-start',
  },
  securityCTAText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400E',
    textDecorationLine: 'underline',
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: '#6C757D',
    fontStyle: 'italic',
  },
});