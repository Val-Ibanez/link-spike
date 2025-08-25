import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../core/themes/ThemeProvider';
import { svgAssetManager } from '../../core/utils/SvgAssetManager';
import BancoSantaCruzSvgLogo from '../SVG/BancoSantaCruzSvgLogo';
import BancoEntreRiosSvgLogo from '../SVG/BancoEntreRiosSvgLogo';
import BancoSantaFeSvgLogo from '../SVG/BancoSantaFeSvgLogo';
import LinkSvgLogo from '../SVG/LinkSvgLogo';

interface DynamicHeaderLogoProps {
  width?: number;
  height?: number;
}

const DynamicHeaderLogo: React.FC<DynamicHeaderLogoProps> = ({
  width = 35,
  height = 35,
}) => {
  const { theme, tenantConfig } = useTheme();
  const logoType = svgAssetManager.getCurrentLogoType();

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
    return null;
  };

  const currentLogo = getCurrentLogo();

  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      <View
      >
        {currentLogo}
      </View>

   {tenantConfig?.displayName !== 'Link' &&   <Text style={[styles.bankName, { color: theme.text }]}>
        {tenantConfig?.displayName || 'Banco'}
      </Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    // flex: 1,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default DynamicHeaderLogo;
