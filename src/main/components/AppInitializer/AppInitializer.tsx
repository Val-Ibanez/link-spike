import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { useInitializeConfig } from '../../stores';
import Config from 'react-native-config';

interface AppInitializerProps {
  children: React.ReactNode;
}

/**
 * Componente que inicializa la configuración de la aplicación UNA SOLA VEZ
 * Evita llamadas repetidas a getFlavorNativeSync() y configura el estado inicial
 */
const AppInitializer: React.FC<AppInitializerProps> = ({ children }) => {
  // ✅ USAR SELECTOR INDIVIDUAL: Referencia estable, no cambia en cada render
  const initializeConfig = useInitializeConfig();

  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ✅ SOLO UNA VEZ: Inicializar configuración
    const initializeApp = async () => {
      try {
        console.log('🚀 AppInitializer: Inicializando aplicación...');
        
        // Inicializar configuración del store
        await initializeConfig();
        
        setIsInitialized(true);
        console.log('✅ AppInitializer: Aplicación inicializada correctamente');
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        console.error('❌ AppInitializer: Error al inicializar:', errorMessage);
        setError(errorMessage);
      }
    };

    // ✅ SOLO UNA VEZ: Sin dependencias circulares
    initializeApp();
  }, [initializeConfig]); 
  
  // ← ✅ SOLO initializeConfig como dependencia

  // Mostrar loading mientras se inicializa
  if (!isInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0066CC" />
        <Text style={{ marginTop: 16, fontSize: 16 }}>Inicializando aplicación...</Text>
        {error && (
          <Text style={{ marginTop: 8, color: 'red', textAlign: 'center' }}>
            Error: {error}
          </Text>
        )}
      </View>
    );
  }

  // Renderizar children cuando esté inicializado
  return <>{children}</>;
};

export default AppInitializer;
