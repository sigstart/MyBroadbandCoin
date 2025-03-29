import { useUserTokenData } from '../hooks/useTokenData';

export function MintCount() {
  const { isConnected, rawMintCount, isCountLoading } = useUserTokenData();

  if (!isConnected) return null;

  return (
    <div style={{ marginTop: '0.75rem' }}>
      🧮 You have minted: <strong>{isCountLoading ? <span className="shimmer" /> : rawMintCount?.toString() ?? '0'}</strong> times
    </div>
  );
}