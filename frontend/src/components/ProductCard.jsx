import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
export default function ProductCard({ product }) {
  const { add } = useCart();
  return <article className="product-card">
    <Link to={`/product/${product.id}`} className="product-image"><img src={product.image_url || 'https://placehold.co/600x450?text=ShopNest'} alt={product.name} onError={e => e.currentTarget.src='https://placehold.co/600x450?text=ShopNest'}/><span className="category-pill">{product.category}</span></Link>
    <div className="product-info"><Link to={`/product/${product.id}`} className="product-name">{product.name}</Link><div className="product-bottom"><strong>₹{Number(product.price).toLocaleString('en-IN')}</strong><button className="add-btn" disabled={product.stock < 1} onClick={() => add(product)}><ShoppingCart size={16}/> {product.stock < 1 ? 'Sold out' : 'Add'}</button></div><small>{product.stock} available</small></div>
  </article>;
}
