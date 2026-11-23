import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';

dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());

app.get('/api/health', async (req, res) => {
  try { await db.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(500).json({ status: 'error', database: 'disconnected' }); }
});
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Unexpected server error.' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`ShopNest API running at http://localhost:${port}`));
