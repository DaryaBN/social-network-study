import express from 'express';
import fs from 'fs';
import pkg from 'pg';


const app = express();
const port = 3000;

const html = fs.readFileSync('public/main.html', 'utf8');
app.use(express.static('public'));
app.use(express.json());

// app.use(express.static('public'));

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

app.get('/posts/:id', (req, res) => {
  information.rows.forEach((item, index) => {
    if(item.id === req.params.id) {
     res.type('json').send(item)
   }
   });
  res.send(404)
 });


app.post('/posts', (req, res) => {
  let NewPost = {
   "id": +(new Date()),
   "name" : req.body.name,
   "nick": req.body.nick,
   "time": new Date(),
   "mes":  req.body.mes
  }
  information.rows.push(NewPost)
  // console.log(req.body)
  res.status(201).type('json').send(NewPost)
 });
 

 app.delete('/posts/:id', (req, res) => {
  information.rows.forEach((item, index) => {
  if(information.rows[index].id === req.params.id) {
      information.rows.slice(index, 1)
      res.send(201)
    }
  })
  console.log(req.body)
  res.send(404)
 });

 app.post('/posts/:id', (req, res) => {
  information.rows.forEach((item, index) => {
    if(item.id === req.params.id) {
      item.mes = req.body.mes
     res.type('json').send(information.rows)
   }
   });
  res.send(404)
 }); //исправление поста не лучше слелать через put
 
// let user = {
//   name: 'John',
//   surname: 'Smith'
// };

// let response = await fetch('/posts', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//   body: JSON.stringify(user)
// });

// let result = await response.json();
// alert(result.message);
