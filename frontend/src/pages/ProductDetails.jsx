import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ShoppingCart } from 'lucide-react';
import api from '../api';
import { useCart } from '../context/CartContext';
export default function ProductDetails() {
  const {id}=useParams(); const [product,setProduct]=useState(null); const [error,setError]=useState('');
  const {add}=useCart();
  useEffect(()=>{api.get(`/products/${id}`).then(r=>setProduct(r.data)).catch(e=>setError(e.response?.data?.message||'Product not found.'));},[id]);
  if(error)return <div className="container empty"><h2>{error}</h2><Link to="/" className="text-link">Back to shop</Link></div>;
  if(!product)return <div className="container loading">Loading product...</div>;
  return <div className="container detail-page"><Link to="/" className="back-link"><ArrowLeft size={16}/> Back to shop</Link><div className="detail-grid"><div className="detail-image"><img src={product.image_url} alt={product.name}/></div><div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><div className="detail-price">₹{Number(product.price).toLocaleString('en-IN')}</div><p>{product.description}</p><p className="stock-line">{product.stock>0?`${product.stock} items in stock`:'Currently out of stock'}</p><button className="primary-btn" disabled={!product.stock} onClick={()=>add(product)}><ShoppingCart size={18}/> Add to cart</button><div className="detail-note">Secure checkout · Cash on delivery</div></div></div></div>;
}
