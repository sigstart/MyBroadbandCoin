import { useAccount } from 'wagmi';

import { MintForm } from '../components/MintForm';
import { TokenBalance } from '../components/TokenBalance';
import { MintCount } from '../components/MintCount';



export default function MintCoinsPage() {
    const { isConnected } = useAccount();
    return (
        <section>
        {!isConnected ? (
          <p>Please connect your wallet to get started.</p>
        ) : (
          <article>
            <TokenBalance />

            <section className='card'>
                <MintCount />
                <MintForm />
            </section>
          </article>
        )}
      </section>);
}