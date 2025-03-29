import './App.css';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { MintForm } from './components/MintForm';
import { TokenBalance } from './components/TokenBalance';
import { MintCount } from './components/MintCount';

function App() {
  const { address, isConnected } = useAccount();

  return (
    <main>
      {/* Header */}
      <header>
        <h1>MyBroadbandCoin 🚀</h1>
        <ConnectButton />
      </header>

      {/* Trunk Section */}
      <section>
        {!isConnected ? (
          <p>Please connect your wallet to get started.</p>
        ) : (
          <article>
            <p>
              👋 Hello, <strong>{address?.slice(0, 6)}...{address?.slice(-4)}</strong>
            </p>
            <TokenBalance />

          <section className='card'>
            <MintCount />
            <MintForm />
            </section>
          </article>
        )}
      </section>
    </main>
  );
}

export default App;