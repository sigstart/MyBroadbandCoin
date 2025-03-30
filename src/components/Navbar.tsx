import { NavLink } from 'react-router-dom';
import './Navbar.css';

export function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li><NavLink to="/mint" title="Mint MyBroadbandCoin" className={({ isActive }) => (isActive ? 'active' : '')}>Mint</NavLink></li>
        <li><NavLink to="/mint-nft" title="Mint MyBroadband NFTs" className={({ isActive }) => (isActive ? 'active' : '')}>Buy</NavLink></li>
        <li><NavLink to="/nfts" title="View NFTs" className={({ isActive }) => (isActive ? 'active' : '')}>View</NavLink></li>
      </ul>
    </nav>
  );
}