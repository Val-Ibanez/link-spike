import React from 'react';
import { useTheme } from '../../core/themes/ThemeProvider';
import { useSvgAsset } from '../../stores/svgAssetStore';
import DynamicHeaderLogo from './DynamicHeaderLogo';

interface DynamicHeaderLogoWrapperProps {
  width?: number;
  height?: number;
  showBankName?: boolean;
}

/**
 * Wrapper que usa hooks y pasa props al componente agnóstico
 * Este componente se puede usar en lugares donde necesites la lógica de estado
 */
const DynamicHeaderLogoWrapper: React.FC<DynamicHeaderLogoWrapperProps> = (props) => {
  const { theme, tenantConfig } = useTheme();
  const { getCurrentLogoType } = useSvgAsset();
  
  const logoType = getCurrentLogoType();
  const displayName = tenantConfig?.displayName || 'Banco';

  return (
    <DynamicHeaderLogo
      {...props}
      logoType={logoType}
      displayName={displayName}
      backgroundColor={theme.surface}
      textColor={theme.text}
    />
  );
};

export default DynamicHeaderLogoWrapper;
