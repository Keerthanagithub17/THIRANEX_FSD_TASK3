import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Admin from './pages/Admin';
import { useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function RequireAuth({children,admin=false}) {
  const {user}=useAuth(); const location=useLocation();
  if(!user)return <Navigate to="/login" state={{from:location.pathname}} replace/>;
  if(admin&&user.role!=='admin')return <Navigate to="/" replace/>;
  return children;
}
export default function App() {
  return <CartProvider><Layout><Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Auth/>}/>
    <Route path="/register" element={<Auth mode="register"/>}/>
    <Route path="/product/:id" element={<ProductDetails/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/checkout" element={<RequireAuth><Checkout/></RequireAuth>}/>
    <Route path="/orders" element={<RequireAuth><Orders/></RequireAuth>}/>
    <Route path="/admin" element={<RequireAuth admin><Admin/></RequireAuth>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes></Layout></CartProvider>;
}
