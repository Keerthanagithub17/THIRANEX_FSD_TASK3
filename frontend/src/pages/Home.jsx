import { useEffect, useMemo, useState } from 'react';
import { Search, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products,setProducts] = useState([]);
  const [search,setSearch] = useState('');
  const [category,setCategory] = useState('All');
  const [error,setError] = useState('');
  useEffect(() => { api.get('/products').then(r=>setProducts(r.data)).catch(()=>setError('Could not connect to the store. Start the backend and check your database.')); }, []);
  const categories = useMemo(()=>['All',...new Set(products.map(p=>p.category).filter(Boolean))],[products]);
  const visible = products.filter(p => (category==='All'||p.category===category) && p.name.toLowerCase().includes(search.toLowerCase()));
  return <div className="container">
    <section className="hero"><div className="hero-copy"><span className="eyebrow"><Sparkles size={14}/> THE EVERYDAY EDIT</span><h1>Good things.<br/><em>Better living.</em></h1><p>Discover useful, beautiful finds that make every day feel a little more special.</p><a href="#catalog" className="primary-btn">Explore collection <ArrowRight size={17}/></a></div><div className="hero-art"><img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?auto=format&fit=crop&w=1200&q=85" alt="Curated everyday essentials"/></div><div className="hero-stamp">CURATED<br/>FOR YOU</div></section>
    <section id="catalog" className="catalog"><div className="section-heading"><div><span className="eyebrow">FIND YOUR NEXT FAVORITE</span><h2>Shop the collection</h2></div><span className="muted">{products.length} products</span></div>
      <div className="catalog-tools"><div className="search-box"><Search size={18}/><input placeholder="Search products..." value={search} onChange={e=>setSearch(e.target.value)}/></div><div className="filters">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={category===c?'filter active':'filter'}>{c}</button>)}</div></div>
      {error ? <div className="notice error">{error}</div> : visible.length ? <div className="product-grid">{visible.map(p=><ProductCard key={p.id} product={p}/>)}</div> : <div className="empty"><h3>No products found</h3><p>Try another search or category.</p></div>}
    </section>
    <section className="bottom-banner"><div><span className="eyebrow">A LITTLE MORE YOU</span><h2>Find something<br/>worth keeping.</h2></div><Link to="/cart" className="outline-btn">View your bag <ArrowRight size={16}/></Link></section>
  </div>;
}
