import { useAccount } from 'wagmi';
import { MintForm } from '../components/MintForm';
import { TokenBalance } from '../components/TokenBalance';
import { MintCount } from '../components/MintCount';
import { SelfDestructTimer } from '../components/SelfDestructTimer';

import sparta0 from '../assets/300-01-madness.jpg';
import sparta1 from '../assets/300-02-sparta-mybroadbandcoin.jpg';
import sparta2 from '../assets/300-03-sparta-kick-aprilfools.jpg';

export default function MintCoinsPage() {
    const { isConnected } = useAccount();
    return (
        <section>
          <SelfDestructTimer onComplete={() => console.log('🚨 Destruction complete')} />
          <p style={{ textAlign: 'right', fontStyle: 'italic'}}>
            Don't worry — nothing will happen to your NFTs. But MyBroadbandCoin
            is going bye-bye.
          </p>          
        {!isConnected ? (
          <p>Please connect your wallet to get started or click on Gallery to
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
        <section>
          <img src={sparta0} />
          <img src={sparta1} />
          <img src={sparta2} />
        </section>
      </section>);
}