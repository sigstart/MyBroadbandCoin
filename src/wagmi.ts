import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { bsc } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'MyBroadbandCoin',
  projectId: '94de01a01de088e8f81c84489afdd0fc',
  chains: [bsc],
});
