import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import MintCoinsPage from './pages/MintCoinsPage';
import MintNFTPage from './pages/MintNFTPage';
import ViewNFTsPage from './pages/ViewNFTsPage';
import { Navbar } from './components/Navbar';
import {
  Menu,
  X,
} from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileOpen((prev) => !prev);

  return (
    <main>
      {/* Header */}
      <header>
        <div className="header-top">
          <button className="menu-toggle" onClick={toggleMobileMenu}>
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1><span className="logo">🛜</span>MyBroadbandCoin</h1>
          <div className="wallet-connect">
            <ConnectButton />
          </div>
        </div>
        <Navbar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />
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