import { NFTGallery } from '../components/NFTGallery'

import jpeg from '../assets/NFT-jpeg-owns-motivation.jpg'

export default function ViewNFTsPage() {
    return (
        <section>
            <img src={jpeg} />
            <p style={{ textAlign: 'center', fontStyle: 'italic' }}>
                (I guess it's good news that these aren't jpegs, but SVGs then!)
            </p>
            <NFTGallery />
        </section>
    );
}