import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BancoSantaCruzSvgLogo from '../SVG/BancoSantaCruzSvgLogo';
import BancoEntreRiosSvgLogo from '../SVG/BancoEntreRiosSvgLogo';
import BancoSantaFeSvgLogo from '../SVG/BancoSantaFeSvgLogo';
import LinkSvgLogo from '../SVG/LinkSvgLogo';

interface DynamicHeaderLogoProps {
  width?: number;
  height?: number;
  // Props agnósticas para evitar hooks internos
  logoType?: string;
  displayName?: string;
  backgroundColor?: string;
  textColor?: string;
  showBankName?: boolean;
}

const DynamicHeaderLogo: React.FC<DynamicHeaderLogoProps> = ({
  width = 35,
  height = 35,
  logoType = 'bancoSantaCruz', // Valor por defecto
  displayName = 'Banco',
  backgroundColor = '#FFFFFF',
  textColor = '#000000',
  showBankName = true,
}) => {
  // Mapeo seguro de logos con manejo de undefined
  const logoComponents: Record<string, React.ReactElement> = {
    bancoSantaCruz: <BancoSantaCruzSvgLogo width={width} height={height} />,
    bancoEntreRios: <BancoEntreRiosSvgLogo width={width} height={height} />,
    bancoSantaFe: <BancoSantaFeSvgLogo width={width} height={height} />,
    link: <LinkSvgLogo width={width} height={height} />,
  };

  // Obtener el logo de forma segura con fallback
  const getCurrentLogo = (): React.ReactElement | null => {
    if (logoType && logoComponents[logoType]) {
      return logoComponents[logoType];
    }
    // Fallback al primer logo disponible
    return logoComponents.bancoSantaCruz || null;
  };

  const currentLogo = getCurrentLogo();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View>
        {currentLogo}
      </View>

      {showBankName && displayName !== 'Link' && (
        <Text style={[styles.bankName, { color: textColor }]}>
          {displayName}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DynamicHeaderLogo;
