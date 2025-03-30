import { Routes, Route } from 'react-router-dom';
import './App.css';
import MintCoinsPage from './pages/MintCoinsPage';
import MintNFTPage from './pages/MintNFTPage';
import ViewNFTsPage from './pages/ViewNFTsPage';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Navbar } from './components/Navbar';

function App() {
  return (
    <main>
      {/* Header */}
      <header>
        <h1>MyBroadbandCoin 🚀</h1>
        <Navbar />
        <ConnectButton />
      </header>
      <Routes>
        <Route path="/mint" element={<MintCoinsPage />} />
        <Route path="/mint-nft" element={<MintNFTPage />} />
        <Route path="/nfts" element={<ViewNFTsPage />} />
        <Route path="*" element={<MintCoinsPage />} /> {/* fallback */}
      </Routes>
    </main>
  );
}
export default App;