import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import { useCart } from '../context/CartContext';
export default function Checkout() {
  const {cart,total,clear}=useCart(); const navigate=useNavigate();
  const [form,setForm]=useState({customer_name:'',phone:'',address:'',city:'',postal_code:''});
  const [error,setError]=useState(''); const [loading,setLoading]=useState(false);
  const change=e=>setForm({...form,[e.target.name]:e.target.value});
  const submit=async e=>{e.preventDefault();setLoading(true);setError('');try{const {data}=await api.post('/orders',{...form,items:cart.map(p=>({product_id:p.id,quantity:p.quantity}))});clear();navigate('/orders',{state:{success:`Order #${data.orderId} placed successfully!`}});}catch(err){setError(err.response?.data?.message||'Could not place order.');}finally{setLoading(false);}};
  if(!cart.length)return <div className="container empty"><h2>Your bag is empty</h2><Link to="/">Continue shopping</Link></div>;
  return <div className="container page-section"><Link to="/cart" className="back-link">← Back to bag</Link><div className="section-heading"><div><span className="eyebrow">ALMOST YOURS</span><h2>Checkout</h2></div></div><div className="checkout-layout"><form className="checkout-form" onSubmit={submit}><h3>Delivery information</h3><div className="form-grid"><label>Full name<input name="customer_name" value={form.customer_name} onChange={change} required/></label><label>Phone number<input name="phone" value={form.phone} onChange={change} required/></label><label className="span-2">Address<textarea name="address" value={form.address} onChange={change} required rows="3"/></label><label>City<input name="city" value={form.city} onChange={change} required/></label><label>Postal code<input name="postal_code" value={form.postal_code} onChange={change} required/></label></div><h3>Payment method</h3><div className="payment-option"><span className="radio-dot"/> Cash on Delivery <small>Pay when your order arrives</small></div>{error&&<div className="notice error">{error}</div>}<button className="primary-btn" disabled={loading}>{loading?'Placing order...':`Place order · ₹${total.toLocaleString('en-IN')}`}</button></form><aside className="summary-card"><h3>Your order</h3>{cart.map(p=><div key={p.id}><span>{p.name} × {p.quantity}</span><strong>₹{(p.price*p.quantity).toLocaleString('en-IN')}</strong></div>)}<div className="summary-total"><span>Total</span><strong>₹{total.toLocaleString('en-IN')}</strong></div></aside></div></div>;
}
