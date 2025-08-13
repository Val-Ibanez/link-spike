// 🏦 Exportaciones principales de la aplicación
// Este archivo exporta todos los componentes y utilidades compartidas

// Configuración centralizada de flavors
export * from './main/core/FlavorConfig';
export * from './main/core/ConfigManager';

// Solo exportar componentes que realmente existen
export { default as DynamicHeaderLogo } from './main/components/DynamicHeaderLogo';
