import { useAccount } from 'wagmi';
import { MintForm } from '../components/MintForm';
import { TokenBalance } from '../components/TokenBalance';
import { MintCount } from '../components/MintCount';

export default function MintCoinsPage() {
    const { isConnected } = useAccount();
    return (
        <section>
        {!isConnected ? (
          <p>Please connect your wallet to get started or click on Gallary to
            look at the NFTs that have already been minted.</p>
        ) : (
          <article>
            <section className='card'>
              <TokenBalance />
              <MintCount />
              <MintForm />
            </section>
          </article>
        )}
      </section>);
}