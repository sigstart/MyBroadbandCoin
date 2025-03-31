import { useState } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseUnits } from 'viem';
import { myBroadbandCoinAddress, myBroadbandCoinAbi } from '../contracts/MyBroadbandCoin';

export function MintForm() {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');

  const { writeContractAsync, isPending } = useWriteContract();

  const handleMint = async () => {
    if (!address || !amount) return;

    setStatus('Minting...');
    try {
      const parsedAmount = parseUnits(amount, 18);
      await writeContractAsync({
        address: myBroadbandCoinAddress,
        abi: myBroadbandCoinAbi,
        functionName: 'mintTokens',
        args: [parsedAmount],
      });

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus(`error:${err.message || 'Mint failed'}`);
    }
  };

  return (
    <section className="mint-form">
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isPending}
      />

      <button onClick={handleMint} disabled={isPending || !amount}>
        {isPending ? 'Minting...' : 'Mint'}
      </button>

      {status && status.startsWith('error:') && (
        <p className="mint-status" style={{ color: 'crimson' }}>{status.replace('error:', '')}</p>
      )}

      {status === 'success' && (
        <p className="mint-status" style={{ color: 'green' }}>
          ✅ Successfully minted {amount} MyBroadbandCoin!
        </p>
      )}
    </section>
  );
}