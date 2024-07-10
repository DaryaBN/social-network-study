// import { sign } from 'crypto';
import express from 'express';
import fs from 'fs';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import cookies from 'cookie-parser';

const app = express();
const port = 3000;

const html = fs.readFileSync('index.html', 'utf8');
// app.use(express.static('main'));
app.use(express.json());
app.use(cookies());
app.use(express.static('public'));

// app.get('/', (req, res) => res.type('html').send(html));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Pool } = pkg;
const pool = new Pool({
  user: 'dolphin_production1_7jgj_user',
  host: 'dpg-cp4siq779t8c73eknfd0-a.oregon-postgres.render.com',
  database: 'dolphin_production1_7jgj',
  password: 'AfwNJcLhsaIDdBGWSBBxrHZ7UwcsAMCM',
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

app.get('/posts/:id_user', async (request, response) => {
  const id = Number(request.params.id_user);
  let information = await pool.query('SELECT * FROM posts WHERE id_user = $1', [id]);
  response.type('json').send(information.rows);
});

app.post('/posts', async (req, res) => {
  let information = await pool.query(`INSERT INTO posts VALUES('${req.body.id}' , '${req.body.id_user}'  , '${req.body.name}' , '${req.body.nick}' , '${req.body.time}' , '${req.body.mes}')`);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

// let user = {
//   id: '5',
//   id_user: '5',
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

app.delete('/posts/:id_user', async (req, res) => {
  const id = Number(req.params.id_user);
  let information = await pool.query('DELETE FROM posts WHERE id_user = $1', [id]);
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
// remove('5')

app.post('/posts/:id_user', async (req, res) => {
  const id = Number(req.params.id_user);
  let mes = String(req.body.mes);
  let information = await pool.query(`
    UPDATE posts SET mes = '${mes}'
    WHERE id_user = $1;
    `, [id]);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

// let user = {
//     id: '5',
//     id_user: '5',
//     name: 'Даша',
//     nick: '@Darya',
//     time: '2023-11-01T12:52:57.173Z',
//     mes: 'Пока'
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
//   edit('5')

app.get('/users', async (req, res) => {
  let information = await pool.query('SELECT * from users');
  res.type('json').send(information.rows);
});

app.post('/users', async (req, res) => {
  let user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  if (user.rows.length <= 0) {
    // пароль пользователя
    let passwordFromUser = req.body.password;
    // создаем соль
    let salt = bcrypt.genSaltSync(10);
    // шифруем пароль
    let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
    let information = await pool.query(`INSERT INTO users VALUES('${req.body.id}', '${req.body.id_user}' , '${req.body.username}' , '${req.body.email}' , '${passwordToSave}')`);
    let information1 = await pool.query('SELECT * from users');
    console.log(information1.rows);
    let dat = new Date();
    // console.log(dat)
    let token = crypto.randomUUID();
    // console.log(token)
    await pool.query(`INSERT INTO sessions VALUES('${req.body.id}' , '${dat}', '${req.body.email}' , '${token}')`);
    res.cookie('token', `'${token}'`, {
      maxAge: 86400000,
      secure: true,
    });
    res.cookie('email', `'${req.body.email}'`, {
      maxAge: 86400000,
      secure: true,
    });
    res.status(200).type('json').send(information.rows);
  } else if (user.rows.length > 0) {
    res.status(400).type('json').send('error');
    // console.log('error');
  }
});

// let user = {
//   id: '5',
//   id_user: '5',
//   username: 'Даша',
//   email: 'darya@mail.ru',
//   password: '12345'
// };
//   let response = await fetch('/users', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json;charset=utf-8'
//     },
//     body: JSON.stringify(user)
//   });
//   let result = await response.json();
//   console.log(result);

app.post('/login', async (req, res) => {
  // console.log(req.body)
  let passwordFromUser = req.body.password;
  let user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  if (bcrypt.compareSync(passwordFromUser, user.rows[0].password)) {
    let dateToken = await pool.query(`SELECT * FROM sessions WHERE  email = '${req.body.email}'`);
    let a = dateToken.rows[dateToken.rows.length - 1];
    let days = ((new Date().getTime() - new Date(a.date).getTime()) / 86400000);
    if (Number(days) <= 1) {
      res.status(200).type('json').send(user.rows);
    } else if (Number(days) > 1) {
      let dat = new Date();
      let token = crypto.randomUUID();
      await pool.query(`INSERT INTO sessions VALUES( '${req.body.id}' , '${dat}', '${req.body.email}' , '${token}')`);
      res.cookie('token', `'${token}'`, {
        maxAge: 86400000,
        secure: true,
      });
      res.cookie('email', `'${req.body.email}'`, {
        maxAge: 86400000,
        secure: true,
      });
      res.status(200).type('json').send(user.rows);
    }
  } else {
    res.status(400).type('json').send('error');
  }
});

// let user = {
//   id: '6', должно менятся иначе на занесется в таблицу
//   id_user: '5',
//   username: 'Даша',
//   email: 'darya@mail.ru',
//   password: '12345'
// };
// let response = await fetch('/login', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json;charset=utf-8'
//   },
//     body: JSON.stringify(user)
//   });
//   let result = await response.json();
//   console.log(result);

app.get('/feed1', async (req, res) => {
  try {
    let cook = req.cookies;
    let sess = await pool.query(`SELECT * FROM sessions WHERE token = ${cook.token}`);
    let days = ((new Date().getTime() - new Date(sess.rows[0].date).getTime()) / 86400000);
    if (Number(days) <= 1) {
      res.status(200).type('text').send('ok');
    } else if (Number(days) > 1) {
      res.status(400).type('text').send('error');
    }
  } catch (error) {
    res.status(400).type('text').send('проблемы с куки');
  }
});

app.get('/Data1', async (req, res) => {
  let user = await pool.query('SELECT COUNT (*) FROM users');
  res.status(200).type('json').send(user.rows);
});
app.get('/DataMess', async (req, res) => {
  let user = await pool.query('SELECT COUNT (*) FROM posts');
  res.status(200).type('json').send(user.rows);
});
app.get('/DataMessToday', async (req, res) => {
  let dat = new Date().toDateString();
  let user = await pool.query('SELECT * FROM posts');
  let r = user.rows.filter((item) => new Date(item.time).toDateString() === dat);
  let a = String(r.length);
  res.status(200).type('text').send(a);
});
app.get('/top', async (req, res) => {
  let information = await pool.query('SELECT * from hashtag');
  res.type('json').send(information.rows);
});
app.get('/blog', async (req, res) => {
  let information = await pool.query('SELECT * from bloggers');
  res.type('json').send(information.rows);
});
