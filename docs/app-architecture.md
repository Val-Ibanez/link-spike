# Arquitectura de Navegación - App de Adquirencia

## Diagrama de Flujo de Navegación

```mermaid
graph TD
    A[App.tsx] --> B[ThemeProvider]
    B --> C[AppNavigationContainer]
    C --> D[MainBottomTabNavigator]
    
    D --> E[Dashboard<br/>🏠 Inicio]
    D --> F[Payments Stack<br/>💳 Pagos]
    D --> G[Transactions<br/>📊 Transacciones]
    D --> H[Profile<br/>👤 Perfil]
    D --> I[Settings<br/>⚙️ Configuración]
    
    F --> J[PaymentsMainScreen<br/>Métodos de Pago]
    F --> K[QRPaymentScreen<br/>🛡️ Pago QR]
    F --> L[ContactlessPaymentScreen<br/>📡 Sin Contacto]
    F --> M[InstallmentsScreen<br/>📊 Cuotas]
    
    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style C fill:#e8f5e8
    style D fill:#fff3e0
    style E fill:#fce4ec
    style F fill:#f1f8e9
    style G fill:#e3f2fd
    style H fill:#fdf2c0
    style I fill:#ede7f6
```

## Estructura de Navegación

### Navegación Principal (Bottom Tabs)
- **Dashboard** 🏠 - Pantalla principal con resumen
- **Payments** 💳 - Stack de métodos de pago
- **Transactions** 📊 - Historial de transacciones
- **Profile** 👤 - Perfil del usuario
- **Settings** ⚙️ - Configuración de la app

### Stack de Pagos
- **PaymentsMain** - Selección de método de pago
- **QRPayment** - Generación de códigos QR
- **ContactlessPayment** - Pagos NFC/contactless
- **InstallmentsPayment** - Pagos en cuotas

### Características
- ✅ Navegación adaptable por flavor/banco
- ✅ Temas dinámicos según configuración
- ✅ Feature flags para funcionalidades opcionales
- ✅ Componentes reutilizables
- ✅ Design system integrado