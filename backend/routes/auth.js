import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/db.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name?.trim() || !email?.trim() || !password || password.length < 6)
      return res.status(400).json({ message: 'Enter your name, email and a password of at least 6 characters.' });
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email.toLowerCase()]);
    if (existing.length) return res.status(409).json({ message: 'An account with this email already exists.' });
    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query('INSERT INTO users (name,email,password) VALUES (?,?,?)', [name.trim(), email.toLowerCase(), hash]);
    const user = { id: result.insertId, name: name.trim(), email: email.toLowerCase(), role: 'user' };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ token, user });
  } catch (error) { res.status(500).json({ message: 'Could not create account.' }); }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email?.toLowerCase()]);
    if (!rows.length || !(await bcrypt.compare(password || '', rows[0].password)))
      return res.status(401).json({ message: 'Invalid email or password.' });
    const row = rows[0];
    const user = { id: row.id, name: row.name, email: row.email, role: row.role };
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user });
  } catch { res.status(500).json({ message: 'Login failed.' }); }
});

router.get('/me', authenticate, async (req, res) => {
  const [rows] = await db.query('SELECT id,name,email,role FROM users WHERE id=?', [req.user.id]);
  if (!rows.length) return res.status(404).json({ message: 'User not found.' });
  res.json({ user: rows[0] });
});

export default router;
