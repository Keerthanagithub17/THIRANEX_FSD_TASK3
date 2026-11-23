import { Router } from 'express';
import db from '../config/db.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const { search = '', category = '' } = req.query;
    const [rows] = await db.query(
      `SELECT * FROM products WHERE name LIKE ? AND (? = '' OR category = ?) ORDER BY created_at DESC`,
      [`%${search}%`, category, category]
    );
    res.json(rows);
  } catch { res.status(500).json({ message: 'Could not load products.' }); }
});

router.get('/:id', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM products WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Product not found.' });
  res.json(rows[0]);
});

router.post('/', authenticate, adminOnly, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;
  if (!name || Number(price) < 0 || Number(stock) < 0) return res.status(400).json({ message: 'Valid name, price and stock are required.' });
  const [result] = await db.query('INSERT INTO products (name,description,price,image_url,category,stock) VALUES (?,?,?,?,?,?)',
    [name, description || '', price, image_url || '', category || 'General', stock || 0]);
  const [rows] = await db.query('SELECT * FROM products WHERE id=?', [result.insertId]);
  res.status(201).json(rows[0]);
});

router.put('/:id', authenticate, adminOnly, async (req, res) => {
  const { name, description, price, image_url, category, stock } = req.body;
  await db.query('UPDATE products SET name=?,description=?,price=?,image_url=?,category=?,stock=? WHERE id=?',
    [name, description || '', price, image_url || '', category || 'General', stock, req.params.id]);
  const [rows] = await db.query('SELECT * FROM products WHERE id=?', [req.params.id]);
  if (!rows.length) return res.status(404).json({ message: 'Product not found.' });
  res.json(rows[0]);
});

router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM products WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Product not found.' });
    res.json({ message: 'Product deleted.' });
  } catch { res.status(409).json({ message: 'This product is part of an order and cannot be deleted.' }); }
});

export default router;
