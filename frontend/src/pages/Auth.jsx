import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export default function Auth({ mode='login' }) {
  const isRegister = mode==='register';
  const [form,setForm] = useState({name:'',email:'',password:''});
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false);
  const {login,register} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const change = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { isRegister ? await register(form.name,form.email,form.password) : await login(form.email,form.password); navigate(location.state?.from || '/'); }
    catch(err) { setError(err.response?.data?.message || 'Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };
  return <div className="auth-wrap"><form className="auth-card" onSubmit={submit}><span className="eyebrow">WELCOME TO SHOPNEST</span><h1>{isRegister?'Create your account':'Welcome back'}</h1><p className="muted">{isRegister?'Join us and find your everyday favorites.':'Sign in to continue shopping.'}</p>
    {isRegister&&<label>Full name<input name="name" value={form.name} onChange={change} required placeholder="Your name"/></label>}
    <label>Email address<input name="email" type="email" value={form.email} onChange={change} required placeholder="you@example.com"/></label>
    <label>Password<input name="password" type="password" value={form.password} onChange={change} required minLength="6" placeholder="At least 6 characters"/></label>
    {error&&<div className="notice error">{error}</div>}<button className="primary-btn full" disabled={loading}>{loading?'Please wait...':isRegister?'Create account':'Sign in'}</button>
    <p className="auth-switch">{isRegister?'Already have an account?':'New to ShopNest?'} <Link to={isRegister?'/login':'/register'}>{isRegister?'Sign in':'Create an account'}</Link></p>
  </form></div>;
}
