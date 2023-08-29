import express from 'express';
import fs from 'fs';
import pkg from 'pg';

const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');
app.use(express.static('public'));

app.use(express.static('public'));

app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Pool } = pkg;
const pool = new Pool({
  user: 'dolphin_production_user',
  host: 'dpg-cjeajigcfp5c73cvvct0-a.oregon-postgres.render.com',
  database: 'dolphin_production',
  password: 'XbOoZZSSJYY7vSSfTfDt1vMic5qzCSe2',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

let information = await pool.query('SELECT * from posts');
app.get('/posts', (req, res) => res.type('json').send(information.rows));
