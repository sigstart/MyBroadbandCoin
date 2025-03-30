import { NavLink } from 'react-router-dom';
import './Navbar.css';
import { HandCoins, ImagePlus, ScanEye } from 'lucide-react';

type NavbarProps = {
  isMobileOpen: boolean;
  setIsMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export function Navbar({ isMobileOpen, setIsMobileOpen }: NavbarProps) {
  const closeMenu = () => setIsMobileOpen(false);

  return (
    <nav className="navbar">
      <ul className={`navbar-links ${isMobileOpen ? 'open' : ''}`}>
        <li>
          <NavLink to="/mint" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            <HandCoins size={18} style={{ marginRight: 6 }} />
            Mint
          </NavLink>
        </li>
        <li>
          <NavLink to="/buy" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            <ImagePlus size={18} style={{ marginRight: 6 }} />
            NFTs
          </NavLink>
        </li>
        <li>
          <NavLink to="/view" className={({ isActive }) => isActive ? 'active' : ''} onClick={closeMenu}>
            <ScanEye size={18} style={{ marginRight: 6 }} />
            Gallery
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}