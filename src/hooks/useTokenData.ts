import { useAccount, useReadContract, useWatchContractEvent } from 'wagmi';
import { formatUnits } from 'viem';
import { myBroadbandCoinAbi, myBroadbandCoinAddress } from '../contracts/MyBroadbandCoin';
import { useMemo } from 'react';

export function useUserTokenData() {
  const { address, isConnected } = useAccount();

  const {
    data: rawBalance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance,
  } = useReadContract({
    address: myBroadbandCoinAddress,
    abi: myBroadbandCoinAbi,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  const {
    data: rawMintCount,
    isLoading: isCountLoading,
    refetch: refetchMintCount,
  } = useReadContract({
    address: myBroadbandCoinAddress,
    abi: myBroadbandCoinAbi,
    functionName: 'mintCount',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });

  // 🧠 Watch for Transfer events and refetch both values
  useWatchContractEvent<typeof myBroadbandCoinAbi, 'Transfer'>({
    address: myBroadbandCoinAddress,
    abi: myBroadbandCoinAbi,
    eventName: 'Transfer',
    onLogs: (logs) => {
      for (const log of logs) {
        const { from, to } = log.args;
        const user = address?.toLowerCase();

        if (from?.toLowerCase() === user || to?.toLowerCase() === user) {
          refetchBalance();
          refetchMintCount();
        }
      }
    },
  });

  // Format balance for display
  const formattedBalance = useMemo(() => {
    if (!rawBalance) return null;
    return Number(formatUnits(rawBalance as bigint, 18)).toLocaleString(undefined, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 6,
    });
  }, [rawBalance]);

  return {
    address,
    isConnected,
    rawBalance,
    formattedBalance,
    rawMintCount: rawMintCount as bigint | undefined,
    isBalanceLoading,
    isCountLoading,
  };
}