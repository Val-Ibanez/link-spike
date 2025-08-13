import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface ChartSvgProps {
  width?: number;
  height?: number;
  color?: string;
}

const ChartSvg: React.FC<ChartSvgProps> = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
      <Path d="M3 13L9 7L13 11L21 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M21 3V9H15" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M3 21H21V3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
};

export default ChartSvg;