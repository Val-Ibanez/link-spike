import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useTheme } from '../core/themes/ThemeProvider';
import { ProfileSvg } from './SVG';
import DynamicHeaderLogo from './DynamicHeaderLogo';

interface HeaderProps {
  onMenuPress: () => void;
  onProfilePress: () => void;
  title?: string;
  showBalance?: boolean;
  balance?: string;
}

const { width } = Dimensions.get('window');

export default function Header({ 
  onMenuPress, 
  onProfilePress, 
}: HeaderProps): React.JSX.Element {
  const { theme, tenantConfig } = useTheme();

   const avatarUrl = 'https://example.com/avatar.jpg'; // Reemplaza con tu URL


  return (
    <View style={[styles.container, { backgroundColor: theme.surface }]}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        {/* Menu Burger */}
        <TouchableOpacity 
          style={styles.menuButton} 
          onPress={onMenuPress}
          activeOpacity={0.7}
        >
          <View style={styles.burgerIcon}>
            <View style={[styles.burgerLine, { backgroundColor: theme.text }]} />
            <View style={[styles.burgerLine, { backgroundColor: theme.text }]} />
            <View style={[styles.burgerLine, { backgroundColor: theme.text }]} />
          </View>
        </TouchableOpacity>

        <DynamicHeaderLogo />

        <TouchableOpacity 
          style={styles.avatarContainer} 
          onPress={onProfilePress}
          activeOpacity={0.7}
        >
          <View style={[styles.avatar,
             ]}>
            <ProfileSvg width={20} height={20} color="#989797c2" />
            
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom Border */}
      <View style={[styles.bottomBorder, { backgroundColor: theme.border || '#E9ECEF' }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingBottom: 0,
    height: 'auto',
    flexDirection: 'row',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
    width: '100%'
  },
  image:{
width: 90,
    height: 90,
  },
  menuButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  burgerIcon: {
    width: 20,
    height: 16,
    justifyContent: 'space-between',
  },
  burgerLine: {
    width: '100%',
    height: 2,
    borderRadius: 1,
  },
  
  avatarContainer: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#989797c2',
    borderWidth: 2, 
   
  },
  bottomBorder: {
    height: 1,
    width: '100%',
  },
});
