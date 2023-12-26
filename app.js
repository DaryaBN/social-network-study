// import { sign } from 'crypto';
import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import bcrypt from 'bcrypt';

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
  user: 'dolphin_production1_user',
  host: 'dpg-clcuiil4lnec73e5938g-a.oregon-postgres.render.com',
  database: 'dolphin_production1',
  password: 'ruqfNxeXxDFLXvdO2yDuAMSDa9Np53jZ',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// let information = await pool.query('SELECT * from posts');
// console.log(information.rows)

app.get('/posts', async (req, res) => {
  let information = await pool.query('SELECT * from posts');
  res.type('json').send(information.rows);
});

app.get('/posts/:id', async (request, response) => {
  const id = Number(request.params.id);
  let information = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  response.type('json').send(information.rows);
});

app.post('/posts', async (req, res) => {
  let information = await pool.query(`INSERT INTO posts VALUES('${req.body.id}' , '${req.body.name}' , '${req.body.nick}' , '${req.body.time}' , '${req.body.mes}')`);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

// let user = {
//   id: '6',
//   name: 'Даша',
//   nick: '@Darya',
//   time: '2023-11-01T12:52:57.173Z',
//   mes: 'Привет'
// };

//  let response = await fetch('/posts', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(user)
//   });
//   let result = await response.json();
//   console.log(result);

app.delete('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  let information = await pool.query('DELETE FROM posts WHERE id = $1', [id]);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

// function remove(id){
//   fetch('/posts' + '/' + id, {
//     method: 'DELETE'
//   }).then(() => {
//      console.log('removed');
//   }).catch(err => {
//     console.error(err)
//   })
// }
// remove('1')

app.post('/posts/:id', async (req, res) => {
  const id = Number(req.params.id);
  let mes = String(req.body.mes);
  let information = await pool.query(`
    UPDATE posts SET mes = '${mes}'
    WHERE id = $1;
    `, [id]);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

// let user = {
//     id: '6',
//     name: 'Даша',
//     nick: '@Darya',
//     time: '2023-11-01T12:52:57.173Z',
//     mes: 'Привет'
//   };
// function edit(id){
//     let response =  fetch('/posts' + '/' + id, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(user)
//     }).then(() => {
//       let result =  response.json();
//         console.log(result);
//   }).catch(err => {
//     console.error(err)
//   })
// }
//   edit('1')

app.get('/users', async (req, res) => {
  let information = await pool.query('SELECT * from users');
  res.type('json').send(information.rows);
});

app.post('/users', async (req, res) => {
  let user = await pool.query(`SELECT FROM users WHERE email = '${req.body.email}'`);
  if (user.rows.length <= 0) {
    // пароль пользователя
    let passwordFromUser = req.body.password;
    // создаем соль
    let salt = bcrypt.genSaltSync(10);
    // шифруем пароль
    let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
    let information = await pool.query(`INSERT INTO users VALUES('${req.body.id}' , '${req.body.username}' , '${req.body.email}' , '${passwordToSave}')`);
    let information1 = await pool.query('SELECT * from users');
    console.log(information1.rows);
    res.status(200).type('json').send(information.rows);
  } else if (user.rows.length > 0) {
    res.status(400);
    console.log('error');
  }
});

// let user = {
//     id: '6',
//     username: 'Даша',
//     email: 'Darya@mail.ru',
//     password: '12345'
//   };
//    let response = await fetch('/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(user)
//     });
//     let result = await response.json();
//     console.log(result);
