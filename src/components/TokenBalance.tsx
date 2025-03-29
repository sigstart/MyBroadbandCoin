import { useUserTokenData } from '../hooks/useTokenData';

export function TokenBalance() {
  const { isConnected, formattedBalance, isBalanceLoading } = useUserTokenData();
  if (!isConnected) return null;

  return (
    <p style={{ marginTop: '1rem' }}>
      💰 Your MyBroadbandCoin balance:{' '}
      <strong>{isBalanceLoading ? <span className="shimmer" /> : formattedBalance ?? '0'}</strong>
    </p>
  );
}