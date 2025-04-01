import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { useState } from 'react';
import { myBroadbandCoinAddress, myBroadbandCoinAbi } from '../contracts/MyBroadbandCoin';
import { nftAddress, nftAbi } from '../contracts/NFT';

import { TokenBalance } from './TokenBalance';

export function MintNFT() {
  const { address, isConnected } = useAccount();
  const [status, setStatus] = useState<'idle' | 'approving' | 'minting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const { writeContractAsync } = useWriteContract();
  const mintCost = parseUnits('100', 18); // 100 tokens

  const handleMint = async () => {
    if (!isConnected || !address) return;

    setStatus('approving');
    setError(null);

    try {
      // Step 1: Approve the NFT contract to spend tokens
      await writeContractAsync({
        address: myBroadbandCoinAddress,
        abi: myBroadbandCoinAbi,
        functionName: 'approve',
        args: [nftAddress, mintCost],
      });

      setStatus('minting');

      // Step 2: Call mintNFT
      await writeContractAsync({
        address: nftAddress,
        abi: nftAbi,
        functionName: 'mintNFT',
        gas: 1_600_000n,
        args: [],
      });

      setStatus('success');
    } catch (err: any) {
      console.error('Minting failed:', err);
      setStatus('error');
      setError(err?.message || 'Something went wrong');
    }
  };

  return (
    <div className="mint-form">
      <p>
        💸 You need <strong>100</strong> MyBroadbandCoins to mint an NFT.
        <TokenBalance />
      </p>
      <button
        onClick={handleMint}
        disabled={status === 'approving' || status === 'minting'}
      >
        {status === 'approving'
          ? 'Approving...'
          : status === 'minting'
          ? 'Minting...'
          : 'Mint NFT'}
      </button>

      <p>
        Note: Clicking mint will trigger two transactions: A spending approval
        and the actual NFT mint. If you don't close the approval confirmation
        in Metamask, you may incorrectly receive an error message that your
        transaction has been reverted. However, looking at the transaction 
        record in Metamask will confirm that your mint was successful.
      </p>

      {status === 'success' && (
        <p style={{ color: 'green', marginTop: '0.5rem' }}>
          ✅ NFT minted successfully!
        </p>
      )}

      {status === 'error' && (
        <p style={{ color: 'crimson', marginTop: '0.5rem' }}>
          ❌ Error: {error}
        </p>
      )}
    </div>
  );
}