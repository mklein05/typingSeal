import 'dotenv/config';   
import express from 'express';
import { pool } from './db.js';

const app = express();
app.use(express.json()); 

app.get('/health', async (_req, res) => {
  try {
    const { rows } = await pool.query('select now() as now');
    res.json({ ok: true, db: rows[0].now });
  } catch (err) {
    console.error('[health] db error:', err instanceof Error ? err.message : err);
    res.status(500).json({ ok: false, detail: 'db unreachable' });
  }
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`listening on http://localhost:${port}`));