# 🎨 Banking Design System

## 🎯 ¿Qué es esto?

Un **Design System completo** que se adapta automáticamente al **banco activo** (flavor). Los componentes cambian colores, fuentes y branding según el banco sin código duplicado.

## ✨ Características

### 🔄 **Adaptable por Banco**
- **Colores dinámicos** según el flavor activo
- **Fuentes corporativas** únicas por banco
- **Branding consistente** automático

### 🧩 **Componentes Reutilizables**
- **Button** - Botones adaptables con múltiples variantes
- **Card** - Tarjetas con elevación y estilos
- **Typography** - Textos con fuentes del banco
- **Forms** - Inputs y formularios branded

### 🎨 **Design Tokens**
- **Spacing** - Espaciado consistente
- **Colors** - Paleta dinámica por banco
- **Typography** - Escalas tipográficas
- **Shadows** - Elevaciones estandarizadas

### 📱 **Banking Specific**
- **CreditCard** - Componente de tarjeta de crédito
- **TransactionItem** - Items de transacciones
- **AccountBalance** - Balances de cuenta
- **PaymentMethod** - Métodos de pago

## 🚀 Uso Básico

```typescript
import { Button, Card } from 'app/design-system/components';

// Se adapta automáticamente al banco activo
<Button 
  title="Pagar" 
  variant="primary"    // Usa color primario del banco
  onPress={handlePay}
/>

<Card variant="elevated">
  <Text>Contenido que se adapta al branding</Text>
</Card>
```

## 🎯 Ejemplos por Banco

### Banco Nacional
- **Primary Color**: #0066CC (azul corporativo)
- **Font**: BancoNacional-Regular
- **Style**: Profesional y confiable

### Banco Popular
- **Primary Color**: #E31837 (rojo corporativo)  
- **Font**: BancoPopular-Bold
- **Style**: Dinámico y accesible

## 📁 Estructura

```
app/design-system/
├── components/          # Componentes reutilizables
│   ├── Button/
│   ├── Card/
│   ├── Typography/
│   └── index.ts
├── tokens/             # Design tokens dinámicos
│   └── index.ts
├── hooks/              # Hooks personalizados
├── utils/              # Utilidades de diseño
└── README.md
```

## 🔧 Agregar Componentes

### 1. Crear Componente
```typescript
// app/design-system/components/NewComponent/NewComponent.tsx
import { getDesignTokens } from '../../tokens';

export const NewComponent = () => {
  const tokens = getDesignTokens(); // Tokens dinámicos del banco activo
  
  return (
    <View style={{ backgroundColor: tokens.colors.primary }}>
      {/* Componente que se adapta automáticamente */}
    </View>
  );
};
```

### 2. Exportar
```typescript
// app/design-system/components/index.ts
export { NewComponent } from './NewComponent/NewComponent';
```

### 3. Usar
```typescript
import { NewComponent } from 'app/design-system/components';

<NewComponent /> {/* Se adapta al banco activo */}
```

## 🎨 Personalizar por Banco

Los tokens se obtienen automáticamente del **sistema de theming** existente:

```typescript
const tokens = getDesignTokens();

// Colores del banco activo
tokens.colors.primary     // Color primario del banco
tokens.colors.secondary   // Color secundario
tokens.colors.accent      // Color de acento

// Fuentes del banco activo  
tokens.typography.fontFamily.regular  // Fuente regular
tokens.typography.fontFamily.bold     // Fuente negrita

// Espaciado consistente
tokens.spacing.md         // 16px
tokens.borderRadius.md    // 12px
```

## 🔄 Flujo de Desarrollo

### 1. **Diseñar Componente**
- Crear con tokens dinámicos
- Probar con ambos bancos
- Documentar variantes

### 2. **Implementar**
- Usar `getDesignTokens()`
- Styles adaptativos
- Props flexibles

### 3. **Validar**
- Test en ambos flavors:
  - `npm run android:banco-nacional`
  - `npm run android:banco-popular`
- Verificar adaptación automática

## 🚀 Beneficios

### ✅ **Para Desarrolladores**
- **Un solo código** para todos los bancos
- **Componentes consistentes**
- **Desarrollo más rápido**
- **Menos bugs de styling**

### ✅ **Para Bancos**
- **Branding automático**
- **Experiencia consistente**
- **Personalización fácil**
- **Time-to-market menor**

### ✅ **Para Usuarios**
- **UX familiar** entre bancos
- **Performance optimizada**
- **Accesibilidad mejorada**

## 📋 Roadmap

### ✅ **Implementado**
- [x] Design tokens dinámicos
- [x] Button component
- [x] Card component
- [x] Integración con theming

### 🔄 **En Proceso**
- [ ] Typography components
- [ ] Form components
- [ ] Navigation components

### 📅 **Próximo**
- [ ] Banking specific components
- [ ] Animation system
- [ ] Storybook documentation
- [ ] Testing suite

## 🎉 ¡Listo para Usar!

El Design System está **100% integrado** con tu arquitectura white-label existente. Los componentes se adaptan automáticamente sin configuración adicional.

```bash
# Probar con diferentes bancos
npm run android:banco-nacional  # Componentes con branding BN
npm run android:banco-popular   # Componentes con branding BP
```

**¡Cada banco tendrá su propia experiencia visual sin código duplicado!** 🚀