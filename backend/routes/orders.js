import { Router } from 'express';
import db from '../config/db.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = Router();

router.post('/', authenticate, async (req, res) => {
  const { items, customer_name, phone, address, city, postal_code } = req.body;
  if (!Array.isArray(items) || !items.length || !customer_name || !phone || !address || !city || !postal_code)
    return res.status(400).json({ message: 'Complete the delivery details and add items to your cart.' });
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    let total = 0;
    const checked = [];
    for (const item of items) {
      const [rows] = await connection.query('SELECT id,name,price,stock FROM products WHERE id=? FOR UPDATE', [item.product_id]);
      if (!rows.length) throw new Error('A product in your cart is no longer available.');
      const product = rows[0], quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1 || product.stock < quantity) throw new Error(`Insufficient stock for ${product.name}.`);
      total += Number(product.price) * quantity;
      checked.push({ ...product, quantity });
    }
    const [order] = await connection.query(
      'INSERT INTO orders (user_id,total,customer_name,phone,address,city,postal_code) VALUES (?,?,?,?,?,?,?)',
      [req.user.id, total, customer_name, phone, address, city, postal_code]
    );
    for (const p of checked) {
      await connection.query('INSERT INTO order_items (order_id,product_id,product_name,quantity,unit_price) VALUES (?,?,?,?,?)',
        [order.insertId, p.id, p.name, p.quantity, p.price]);
      await connection.query('UPDATE products SET stock=stock-? WHERE id=?', [p.quantity, p.id]);
    }
    await connection.commit();
    res.status(201).json({ message: 'Order placed successfully.', orderId: order.insertId });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ message: error.message || 'Could not place order.' });
  } finally { connection.release(); }
});

router.get('/mine', authenticate, async (req, res) => {
  const [orders] = await db.query('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC', [req.user.id]);
  for (const order of orders) {
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id=?', [order.id]);
    order.items = items;
  }
  res.json(orders);
});

router.get('/', authenticate, adminOnly, async (req, res) => {
  const [orders] = await db.query(
    `SELECT o.*,u.email FROM orders o JOIN users u ON u.id=o.user_id ORDER BY o.created_at DESC`
  );
  for (const order of orders) {
    const [items] = await db.query('SELECT * FROM order_items WHERE order_id=?', [order.id]);
    order.items = items;
  }
  res.json(orders);
});

router.patch('/:id/status', authenticate, adminOnly, async (req, res) => {
  const allowed = ['Pending','Processing','Shipped','Delivered','Cancelled'];
  if (!allowed.includes(req.body.status)) return res.status(400).json({ message: 'Invalid order status.' });
  const [result] = await db.query('UPDATE orders SET status=? WHERE id=?', [req.body.status, req.params.id]);
  if (!result.affectedRows) return res.status(404).json({ message: 'Order not found.' });
  res.json({ message: 'Order status updated.' });
});

export default router;
