import { configManager } from '../ConfigManager';

export type LogoType = 'bancoSantaCruz' | 'bancoEntreRios' | 'bancoSantaFe' | 'link';

class SvgAssetManager {
  /**
   * Obtiene el tipo de logo basado en el flavor actual
   */
  public getCurrentLogoType(): LogoType {
    const flavor = configManager.getAppInfo().flavor;
    
    switch (flavor) {
      case 'bancoSantaCruz':
        return 'bancoSantaCruz';
      case 'bancoEntreRios':
        return 'bancoEntreRios';
      case 'bancoSantaFe':
        return 'bancoSantaFe';
      case 'link':
        return 'link';
      default:
        return 'bancoSantaCruz'; // Default fallback
    }
  }

  /**
   * Obtiene el logo SVG para un flavor específico
   */
  public getLogoType(flavor: string): LogoType {
    switch (flavor) {
      case 'bancoSantaCruz':
        return 'bancoSantaCruz';
      case 'bancoEntreRios':
        return 'bancoEntreRios';
      case 'bancoSantaFe':
        return 'bancoSantaFe';
      case 'link':
        return 'link';
      default:
        return 'bancoSantaCruz';
    }
  }

  /**
   * Valida que el tipo de logo sea válido
   */
  public isValidLogoType(logoType: string): logoType is LogoType {
    return ['bancoSantaCruz', 'bancoEntreRios', 'bancoSantaFe', 'link'].includes(logoType);
  }
}

// Exportar instancia singleton
export const svgAssetManager = new SvgAssetManager();