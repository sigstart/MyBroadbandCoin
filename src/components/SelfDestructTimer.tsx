// src/components/SelfDestructTimer.tsx
import { useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { config } from '../wagmi'; // adjust path as needed
import { myBroadbandCoinAbi, myBroadbandCoinAddress } from '../contracts/MyBroadbandCoin'; // adjust paths as needed

export function SelfDestructTimer({ onComplete }: { onComplete?: () => void }) {
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Fetch EXPIRE_TIME from the contract
  useEffect(() => {
    const loadExpireTime = async () => {
      try {
        const expireTime = await readContract(config, {
          address: myBroadbandCoinAddress,
          abi: myBroadbandCoinAbi,
          functionName: 'EXPIRE_TIME',
          args: [],
        }) as bigint;

        const expireUnix = Number(expireTime);
        const now = Math.floor(Date.now() / 1000);
        const timeLeft = Math.max(0, expireUnix - now);
        setSecondsLeft(timeLeft);
      } catch (err) {
        console.error('Failed to load EXPIRE_TIME:', err);
      }
    };

    loadExpireTime();
  }, []);

  // Countdown logic
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onComplete]);

  const formatTime = (t: number) => {
    const h = Math.floor(t / 3600).toString().padStart(2, '0');
    const m = Math.floor((t % 3600) / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  return (
    <div style={{
      padding: '0.75rem 1.5rem',
      backgroundColor: '#330000',
      color: '#ff4444',
      border: '2px solid #ff4444',
      borderRadius: '8px',
      fontFamily: 'monospace',
      fontSize: '1.5rem',
      textAlign: 'center',
      animation: 'pulse 1s infinite'
    }}>
      {secondsLeft === null
        ? '⏱️ Loading...'
        : secondsLeft > 0
        ? `⏱️ SELF-DESTRUCT IN ${formatTime(secondsLeft)}`
        : '💥 BOOM. It’s over.'}
    </div>
  );
}