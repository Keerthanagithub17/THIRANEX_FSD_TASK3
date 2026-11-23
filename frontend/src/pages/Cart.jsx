import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
export default function Cart() {
  const {cart,update,remove,total}=useCart(); const navigate=useNavigate();
  return <div className="container page-section"><div className="section-heading"><div><span className="eyebrow">YOUR PICKS</span><h2>Shopping bag</h2></div><span className="muted">{cart.length} items</span></div>
    {!cart.length?<div className="empty"><ShoppingBag size={35}/><h3>Your bag is waiting</h3><p>Explore the collection and add something you love.</p><Link className="primary-btn" to="/">Start shopping <ArrowRight size={16}/></Link></div>:
    <div className="cart-layout"><div className="cart-items">{cart.map(p=><div className="cart-item" key={p.id}><img src={p.image_url} alt={p.name}/><div className="cart-item-info"><Link to={`/product/${p.id}`}>{p.name}</Link><span>₹{Number(p.price).toLocaleString('en-IN')}</span><small>{p.stock} available</small></div><div className="quantity"><button onClick={()=>update(p.id,p.quantity-1)}><Minus size={14}/></button><span>{p.quantity}</span><button disabled={p.quantity>=p.stock} onClick={()=>update(p.id,p.quantity+1)}><Plus size={14}/></button></div><strong>₹{(p.price*p.quantity).toLocaleString('en-IN')}</strong><button className="icon-btn danger-text" onClick={()=>remove(p.id)}><Trash2 size={17}/></button></div>)}</div>
    <aside className="summary-card"><h3>Order summary</h3><div><span>Subtotal</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><div><span>Delivery</span><strong className="green">Free</strong></div><div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><button className="primary-btn full" onClick={()=>navigate('/checkout')}>Continue to checkout <ArrowRight size={16}/></button><p>Taxes included. Delivery details collected at checkout.</p></aside></div>}
  </div>;
}
