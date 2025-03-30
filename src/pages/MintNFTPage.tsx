import { useAccount } from 'wagmi';
import { TokenBalance } from '../components/TokenBalance';
import { MintNFT } from '../components/MintNFT';

export default function MintNFTPage() {
    const { isConnected } = useAccount();
        return (
            <section>
            {!isConnected ? (
              <p>Please connect your wallet to get started.</p>
            ) : (
              <article>
                <section className='card'>
                  <TokenBalance />
                  <MintNFT />
                </section>
              </article>
            )}
          </section>);
}