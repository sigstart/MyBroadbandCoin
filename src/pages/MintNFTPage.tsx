import { useAccount } from 'wagmi';
import { TokenBalance } from '../components/TokenBalance';
import { MintNFT } from '../components/MintNFT';

export default function MintNFTPage() {
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
                  <MintNFT />
                </section>
              </article>
            )}
          </section>);
}