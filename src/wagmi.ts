import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { arbitrum, bsc, bscTestnet, optimism, polygon } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MyBroadbandCoin',
  projectId: 'YOUR_PROJECT_ID',
  chains: [bscTestnet, bsc, polygon, optimism, arbitrum,],
});
