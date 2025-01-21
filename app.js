import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import cookies from 'cookie-parser';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cookies());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const { Pool } = pkg;
const pool = new Pool({
  user: 'postgres.wjhzxmxjdymabaosjlyh',
  host: 'aws-0-eu-central-1.pooler.supabase.com',
  database: 'postgres',
  password: 'yYM_Y9xxNjux@d.',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/posts', async (req, res) => {
  let information = await pool.query('SELECT ps.*, photo FROM posts ps, usersinfo if WHERE ps.id_user = if.user_id  ORDER BY id DESC');
  res.type('json').send(information.rows);
});

app.get('/postsHome', async (req, res) => {
  let information = await pool.query('SELECT ps.*, photo FROM posts ps, usersinfo if WHERE ps.id_user = if.user_id  ORDER BY id DESC LIMIT 1');
  res.type('json').send(information.rows);
});

app.get('/posts/:id_user', async (request, response) => {
  const id = Number(request.params.id_user);
  let information = await pool.query('SELECT * FROM posts WHERE id_user = $1', [id]);
  response.type('json').send(information.rows);
});

app.post('/posts', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let User = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let userId = User.rows[0].id;
  let userNick = User.rows[0].username;
  let UserInfo = await pool.query(`SELECT * FROM usersinfo WHERE user_id = '${userId}'`);
  let userName = UserInfo.rows[0].username;
  let userTime = new Date();
  let information = await pool.query(`INSERT INTO posts (id_user, username, usernick, time, mess, img) VALUES ('${userId}', '${userName}', '${userNick}', '${userTime}', '${req.body.mes}', '${req.body.img}')`);
  res.type('json').send(information.rows);
});

app.delete('/posts/:id_user', async (req, res) => {
  const id = Number(req.params.id_user);
  let information = await pool.query('DELETE FROM posts WHERE id_user = $1', [id]);
  let information1 = await pool.query('SELECT * from posts');
  console.log(information1.rows);
  res.type('json').send(information.rows);
});

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

app.get('/users', async (req, res) => {
  let information = await pool.query('SELECT * from users');
  res.type('json').send(information.rows);
});

app.post('/users', async (req, res) => {
  let user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  if (user.rows.length <= 0) {
    let passwordFromUser = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
    let information = await pool.query(`INSERT INTO users (username, email, password) VALUES ('${req.body.username}' , '${req.body.email}' , '${passwordToSave}')`);
    let UserInfo = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
    let userId = UserInfo.rows[0].id;
    let dat = new Date();
    let token = crypto.randomUUID();
    let nameUser = req.body.username.substring(1);
    await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${userId}', '${dat}', '${req.body.email}' , '${token}')`);
    await pool.query(`INSERT INTO usersinfo (user_id, username, usernick) VALUES ('${userId}', '${nameUser}', '${req.body.username}')`);
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
  }
});

app.post('/login', async (req, res) => {
  let passwordFromUser = req.body.password;
  let user = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
  if (bcrypt.compareSync(passwordFromUser, user.rows[0].password)) {
    let dateToken = await pool.query(`SELECT * FROM sessions WHERE  email = '${req.body.email}'`);
    if (dateToken.rows.length === 0) {
      let dat = new Date();
      let token = crypto.randomUUID();
      let UserInfo = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
      let userId = UserInfo.rows[0].id_user;
      await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${userId}', '${dat}', '${req.body.email}' , '${token}')`);
      res.cookie('token', `'${token}'`, {
        maxAge: 86400000,
        secure: true,
      });
      res.cookie('email', `'${req.body.email}'`, {
        maxAge: 86400000,
        secure: true,
      });
    } else if (dateToken.rows.length > 0) {
      let a = dateToken.rows[dateToken.rows.length - 1];
      let days = Number((new Date().getTime() - new Date(a.date).getTime()) / 86400000);
      if (days <= 1) {
        res.status(200).type('json').send(user.rows);
      } else if (days > 1) {
        let dat = new Date();
        let token = crypto.randomUUID();
        let UserInfo = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
        let userId = UserInfo.rows[0].id_user;
        await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${userId}', '${dat}', '${req.body.email}' , '${token}')`);
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
    }
  } else {
    res.status(400).type('json').send('error');
  }
});

app.get('/DolphinFeed', async (req, res) => {
  let cook = req.cookies;
  if (cook.email !== undefined) {
    let sess = await pool.query(`SELECT * FROM sessions WHERE token = ${cook.token}`);
    let days = Number((new Date().getTime() - new Date(sess.rows[0].date).getTime()) / 86400000);
    if (days <= 1) {
      res.status(200).type('text').send('ok');
    } else if (days > 1) {
      res.status(400).type('text').send('error');
    }
  } else if (cook.email === undefined) {
    res.status(400).type('text').send('error');
  }
});

app.get('/DataUsers', async (req, res) => {
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
  res.type('text').send(a);
});

app.get('/top', async (req, res) => {
  let information = await pool.query('SELECT * from hashtag');
  res.type('json').send(information.rows);
});

app.get('/blog', async (req, res) => {
  let information = await pool.query('SELECT * from bloggers');
  res.type('json').send(information.rows);
});

app.get('/feedUser', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let userID = String(user.rows[0].id);
  let userInfo = await pool.query(`SELECT * FROM usersinfo WHERE user_id = '${userID}'`);
  res.type('json').send(userInfo.rows);
});

app.post('/userInfo', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let userID = String(user.rows[0].id);
  let inf = req.body;
  /* eslint-disable no-restricted-syntax */
  for (let key in inf) {
    if (key === 'usernick') {
      /* eslint-disable no-await-in-loop */
      let nick = await pool.query(`SELECT * FROM usersinfo WHERE usernick = '${inf.usernick}'`);
      if (nick.rows.length === 0) {
        /* eslint-disable no-await-in-loop */
        await pool.query(`UPDATE usersinfo SET ${key} = '${inf[key]}'  WHERE user_id = '${userID}'`);
        res.status(200).type('text').send('Данные успешно изменены');
        return;
      } if (nick.rows.length > 0) {
        res.status(200).type('text').send('Данный никнейм уже используется');
        return;
      }
    } else if (key !== 'usernick') {
      /* eslint-disable no-await-in-loop */
      await pool.query(`UPDATE usersinfo SET ${key} = '${inf[key]}'  WHERE user_id = '${userID}'`);
      res.status(200).type('json').send('Данные успешно изменены');
      return;
    }
  }
});
