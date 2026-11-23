import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, ShoppingCart, UserRound, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();
  const signOut = () => { logout(); navigate('/'); };
  return <div className="app-shell">
    <header className="topbar"><Link to="/" className="brand"><span className="brand-mark"><ShoppingBag size={19}/></span> shopnest<span className="brand-dot">.</span></Link>
      <nav><NavLink to="/">Shop</NavLink>{user && <NavLink to="/orders">My orders</NavLink>}{user?.role === 'admin' && <NavLink to="/admin"><LayoutDashboard size={15}/> Admin</NavLink>}</nav>
      <div className="nav-actions"><Link className="cart-link" to="/cart"><ShoppingCart size={19}/><span>Cart</span>{count > 0 && <b>{count}</b>}</Link>
        {user ? <><span className="welcome">Hi, {user.name.split(' ')[0]}</span><button className="icon-btn" onClick={signOut} title="Log out"><LogOut size={18}/></button></> : <Link className="login-link" to="/login"><UserRound size={17}/> Sign in</Link>}
      </div>
    </header>
    <main>{children}</main>
    <footer><div className="footer-inner"><Link to="/" className="brand">shopnest<span className="brand-dot">.</span></Link><span>Thoughtful finds for everyday living.</span><span>© {new Date().getFullYear()} ShopNest</span></div></footer>
  </div>;
}
