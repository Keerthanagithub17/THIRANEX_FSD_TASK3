import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
const steps=['Pending','Processing','Shipped','Delivered'];
export default function Orders() {
  const [orders,setOrders]=useState([]); const [error,setError]=useState('');
  const location=useLocation();
  useEffect(()=>{api.get('/orders/mine').then(r=>setOrders(r.data)).catch(()=>setError('Could not load your orders.'));},[]);
  return <div className="container page-section"><div className="section-heading"><div><span className="eyebrow">YOUR SHOPPING JOURNEY</span><h2>My orders</h2></div></div>{location.state?.success&&<div className="notice success">{location.state.success}</div>}{error&&<div className="notice error">{error}</div>}
    {!orders.length&&!error?<div className="empty"><h3>No orders yet</h3><p>Your placed orders will appear here.</p></div>:<div className="orders-list">{orders.map(o=><article className="order-card" key={o.id}><div className="order-head"><div><small>ORDER #{o.id}</small><h3>{new Date(o.created_at).toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'})}</h3></div><span className={`status status-${o.status.toLowerCase()}`}>{o.status}</span><strong>₹{Number(o.total).toLocaleString('en-IN')}</strong></div><div className="order-products">{o.items?.map(i=><span key={i.id}>{i.product_name} × {i.quantity}</span>)}</div><div className="tracking">{steps.map((s,i)=><div className={steps.indexOf(o.status)>=i?'track-step done':'track-step'} key={s}><i/><span>{s}</span></div>)}</div><small className="muted">Delivering to {o.city} · {o.payment_method}</small></article>)}</div>}
  </div>;
}
