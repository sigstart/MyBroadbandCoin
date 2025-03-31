import { useEffect, useState } from 'react';
import { readContract } from '@wagmi/core';
import { config } from '../wagmi';
import { nftAddress, nftAbi } from '../contracts/NFT';
import { decodeTokenURI } from '../utils/decodeTokenURI';

import './NFTGallery.css'

type NFTData = {
  tokenId: number;
  name: string;
  description: string;
  image: string; // SVG data URI
};

export function NFTGallery() {
  const [nfts, setNfts] = useState<NFTData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadNFTs = async () => {
      setLoading(true);
      try {
        const totalSupply = await readContract(config, {
          address: nftAddress,
          abi: nftAbi,
          functionName: 'totalSupply',
          args: [],
        }) as bigint;

        const tokens: NFTData[] = [];

        for (let i = 0n; i < totalSupply; i++) {
          const tokenId  = await readContract(config, {
            address: nftAddress,
            abi: nftAbi,
            functionName: 'tokenByIndex',
            args: [i],
          }) as bigint;

          const uri = await readContract(config, {
            address: nftAddress,
            abi: nftAbi,
            functionName: 'tokenURI',
            args: [tokenId],
          }) as string;

          const metadata = decodeTokenURI(uri);
          tokens.push({
            tokenId: Number(tokenId),
            name: metadata.name,
            description: metadata.description,
            image: metadata.image,
          });
        }

        setNfts(tokens);
      } catch (err) {
        console.error('Error loading NFTs:', err);
      } finally {
        setLoading(false);
      }
    };

    loadNFTs();
  }, []);

  return (
    <div className="nft-gallery">
      <h2>🖼️ NFT Gallery</h2>
      {loading && <p>Loading NFTs...</p>}
      {!loading && nfts.length === 0 && <p>No NFTs minted yet.</p>}
      <div className="gallery-grid">
        {nfts.map((nft) => (
          <div key={nft.tokenId} className="nft-card">
            <img src={nft.image} alt={nft.name} />
            <h3>{nft.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}