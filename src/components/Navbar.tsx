import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { HandCoins, ImagePlus, ScanEye } from 'lucide-react';

export function Navbar() {

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <NavLink to="/mint" className={({ isActive }) => isActive ? 'active' : ''}>
            <HandCoins size={18} style={{ marginRight: 6 }} />
            Mint
          </NavLink>
        </li>
        <li>
          <NavLink to="/buy" className={({ isActive }) => isActive ? 'active' : ''}>
            <ImagePlus size={18} style={{ marginRight: 6 }} />
            NFTs
          </NavLink>
        </li>
        <li>
          <NavLink to="/view" className={({ isActive }) => isActive ? 'active' : ''}>
            <ScanEye size={18} style={{ marginRight: 6 }} />
            Gallery
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}