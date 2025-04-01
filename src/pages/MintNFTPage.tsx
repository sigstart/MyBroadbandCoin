import { useAccount } from 'wagmi';
import { MintNFT } from '../components/MintNFT';

export default function MintNFTPage() {
    const { isConnected } = useAccount();
        return (
            <section>
              <p style={{
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
                ⚠️ NFT minting will stop working when the MyBroadbandCoin token
                contract self-destructs. However, your NFTs will not be 
                destroyed.
              </p>
            {!isConnected ? (
              <p>Please connect your wallet to get started or click on Gallery to
            look at the NFTs that have already been minted.</p>
            ) : (
              <article>
                <section className='card'>
                  <MintNFT />
                </section>
              </article>
            )}
          </section>);
}