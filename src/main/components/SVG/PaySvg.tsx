import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface PaySvgProps {
  width?: number;
  height?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

const PaySvg: React.FC<PaySvgProps> = ({ 
  width = 24, 
  height = 24, 
  color = "#000000",
  strokeWidth = 2,
  style 
}) => {
  return (
    <Svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none"
      style={style}
    >
      {/* Card outline */}
      <Path 
        d="M3 8C3 6.34315 4.34315 5 6 5H18C19.6569 5 21 6.34315 21 8V16C21 17.6569 19.6569 19 18 19H6C4.34315 19 3 17.6569 3 16V8Z" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      {/* Card stripe */}
      <Path 
        d="M3 10H21" 
        stroke={color} 
        strokeWidth={strokeWidth}
      />
      {/* Card number/code */}
      <Path 
        d="M14 15L17 15" 
        stroke={color} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default PaySvg;