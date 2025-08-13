import React from 'react';
import Svg, { Path, G, Defs, ClipPath, Rect } from 'react-native-svg';

interface BancoEntreRiosSvgLogoProps {
  width?: number;
  height?: number;
  color?: string; // Optional color prop for dynamic coloring
  style?: any;
}

const BancoEntreRiosSvgLogo: React.FC<BancoEntreRiosSvgLogoProps> = ({ 
  width = 120, 
  height = 60, 
  color = "#DA1E28", // Default red color
  style 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 512 512" fill="none" style={style}>
      <G clipPath="url(#clip0_1_160)">
        <Path d="M512 0H0V512H512V0Z" fill="white"/>
        <Path 
          d="M130.358 211.469C125.582 287.23 189.638 358.373 291.022 404.494C314.209 385.166 334.012 362.327 349.86 336.325C397.467 258.128 404.522 160.761 377.444 63.1419H255.277C181.699 98.4444 134.186 150.702 130.358 211.469Z" 
          fill={color}
        />
        <Path 
          d="M220.575 447.858C136.273 395.822 85.1225 321.674 90.0889 242.782C94.8023 168.317 148.642 104.545 230.508 63.1059H63.106V447.858H220.006C220.196 447.795 220.385 447.953 220.575 447.858Z" 
          fill={color}
        />
        <Path 
          d="M447.955 63.1419H401.96C405.661 75.5421 408.951 88.0371 411.672 100.659C436.535 214.253 420.023 326.518 365.171 416.673C362.577 420.975 346.982 443.75 344.23 447.894H447.923V63.1419H447.955Z" 
          fill={color}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1_160">
          <Rect width="512" height="512" fill="white"/>
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default BancoEntreRiosSvgLogo;