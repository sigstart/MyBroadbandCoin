import { Routes, Route } from 'react-router-dom';
import './App.css';
import MintCoinsPage from './pages/MintCoinsPage';
import MintNFTPage from './pages/MintNFTPage';
import ViewNFTsPage from './pages/ViewNFTsPage';
import { Navbar } from './components/Navbar';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  return (
    <main>
      {/* Header */}
      <header>
        <h1><span className="logo">🛜</span>MyBroadbandCoin</h1>
        <Navbar />
        <ConnectButton />
      </header>
      <Routes>
        <Route path="/mint" element={<MintCoinsPage />} />
        <Route path="/buy" element={<MintNFTPage />} />
        <Route path="/view" element={<ViewNFTsPage />} />
        <Route path="*" element={<MintCoinsPage />} /> {/* fallback */}
      </Routes>
    </main>
  );
}
export default App;