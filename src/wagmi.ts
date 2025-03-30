import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bscTestnet } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MyBroadbandCoin',
  projectId: 'YOUR_PROJECT_ID',
  chains: [bscTestnet],
});
