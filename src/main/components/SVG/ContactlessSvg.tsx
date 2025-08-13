import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ContactlessSvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const ContactlessSvg: React.FC<ContactlessSvgProps> = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M7 11.5C7 11.5 7 8.5 12 8.5C17 8.5 17 11.5 17 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M9 11.5C9 11.5 9 9.5 12 9.5C15 9.5 15 11.5 15 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M11 11.5C11 11.5 11 10.5 12 10.5C13 10.5 13 11.5 13 11.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M12 11.5H12.01" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M2 4H22C22.5523 4 23 4.44772 23 5V19C23 19.5523 22.5523 20 22 20H2C1.44772 20 1 19.5523 1 19V5C1 4.44772 1.44772 4 2 4Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default ContactlessSvg;