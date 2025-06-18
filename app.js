import express from 'express';
import pkg from 'pg';
import bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import cookies from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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

app.get('/feed', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
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
  let information = await pool.query(`SELECT * FROM posts WHERE id_user = ${id}`);
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
  let information = await pool.query( `DELETE FROM posts WHERE id_user = ${id}`);
  res.type('json').send(information.rows);
});

app.post('/posts/:id_user', async (req, res) => {
  const id = Number(req.params.id_user);
  let mes = String(req.body.mes);
  let information = await pool.query(`
    UPDATE posts SET mes = '${mes}'
    WHERE id_user = ${id};
    `);
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
    let dat = new Date();
    let passwordFromUser = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let passwordToSave = bcrypt.hashSync(passwordFromUser, salt);
    let information = await pool.query(`INSERT INTO users (username, email, password, dataNewPassword) VALUES ('${req.body.username}' , '${req.body.email}' , '${passwordToSave}' , '${dat}')`);
    let UserInfo = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
    let userId = UserInfo.rows[0].id;
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
      let userId = UserInfo.rows[0].id;
      await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${userId}', '${dat}', '${req.body.email}' , '${token}')`);
      res.cookie('token', `'${token}'`, {
        maxAge: 86400000,
        secure: true,
      });
      res.cookie('email', `'${req.body.email}'`, {
        maxAge: 86400000,
        secure: true,
      });
      res.status(200).type('json').send(UserInfo.rows);
    } else if (dateToken.rows.length > 0) {
      let a = dateToken.rows[dateToken.rows.length - 1];
      let days = Number((new Date().getTime() - new Date(a.date).getTime()) / 86400000);
      if (days <= 1 && dateToken.rows.email === req.body.email) {
        res.status(200).type('json').send(user.rows);
      } else if (days > 1) {
        let dat = new Date();
        let token = crypto.randomUUID();
        let UserInfo = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
        let userId = UserInfo.rows[0].id;
        await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${userId}', '${dat}', '${req.body.email}' , '${token}')`);
        res.cookie('token', `'${token}'`, {
          maxAge: 86400000,
          secure: true,
        });
        res.cookie('email', `'${req.body.email}'`, {
          maxAge: 86400000,
          secure: true,
        });
        res.status(200).type('json').send(UserInfo.rows);
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
      res.status(200).type('text').send('error');
    }
  } else if (cook.email === undefined) {
    res.status(200).type('text').send('error');
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
  let information = await pool.query('SELECT * FROM hashtag ORDER BY CAST(hashtaglot AS INT) DESC LIMIT 5');
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
  for (let key in inf) {
    if (key === 'usernick') {
      let nick = await pool.query(`SELECT * FROM usersinfo WHERE usernick = '${inf.usernick}'`);
      if (nick.rows.length === 0) {
        await pool.query(`UPDATE usersinfo SET ${key} = '${inf[key]}'  WHERE user_id = '${userID}'`);
        res.status(200).type('text').send('Данные успешно изменены');
        return;
      } if (nick.rows.length > 0) {
        res.status(200).type('text').send('Данный никнейм уже используется');
        return;
      }
    } else if (key !== 'usernick') {
      await pool.query(`UPDATE usersinfo SET ${key} = '${inf[key]}'  WHERE user_id = '${userID}'`);
      res.status(200).type('json').send('Данные успешно изменены');
      return;
    }
  }
});

app.post('/settingsOldPassword', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let oldPass = req.body.oldPassword;
  if (bcrypt.compareSync(oldPass, user.rows[0].password)) {
    res.status(200).type('text').send('ok');
  } else {
    res.status(400).type('text').send('error');
  }
});

app.post('/settingsNewPassword', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let newPass = req.body.newPassword;
  let datPass = user.rows[0].datanewpassword;
  let dat = new Date();
  let days = Number((new Date().getTime() - new Date(datPass).getTime()) / 86400000);
  if (bcrypt.compareSync(newPass, user.rows[0].password) === true) {
    res.status(200).type('text').send('новый пароль не должен совпадать со старым');
  } else if (bcrypt.compareSync(newPass, user.rows[0].password) === false) {
    if (newPass.length >= 7 && days > 1) {
      let salt = bcrypt.genSaltSync(10);
      let passwordToSave = bcrypt.hashSync(newPass, salt);
      await pool.query(`UPDATE users SET password = '${passwordToSave}', datanewpassword = '${dat}'  WHERE email = ${cookEmail}`);
      res.status(200).type('text').send('Пароль успешно изменен');
    } else if (newPass.length < 7) {
      res.status(200).type('text').send('количесво символов должно быть не менее 7');
    } else if (days < 1) {
      res.status(200).type('text').send('пароль нельзя менять чаще, чем один раз в сутки');
    }
  }
});

app.post('/settingsEmail', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let pass = req.body.password;
  let ID = user.rows[0].id;
  if (bcrypt.compareSync(pass, user.rows[0].password)) {
    if (String(req.body.email) !== user.rows[0].email) {
      let us = await pool.query(`SELECT * FROM users WHERE email = '${req.body.email}'`);
      if (us.rows.length <= 0) {
        await pool.query(`UPDATE users SET email = '${req.body.email}' WHERE users.id = '${ID}'`);
        await pool.query(`UPDATE sessions SET email = '${req.body.email}' WHERE id_user = '${ID}'`);
        let token = crypto.randomUUID();
        res.cookie('token', `'${token}'`, {
          maxAge: 86400000,
          secure: true,
        });
        res.cookie('email', `'${req.body.email}'`, {
          maxAge: 86400000,
          secure: true,
        });
        let dat = new Date();
        await pool.query(`INSERT INTO sessions (id_user, date, email, token) VALUES ('${ID}', '${dat}', '${req.body.email}' , '${token}')`);
        res.status(200).type('text').send('Email успешно изменен');
      } else if (us.rows.length > 0) {
        res.status(200).type('text').send('Этот адрес электронной почты уже используется');
      }
    } else if (String(req.body.email) === user.rows[0].email) {
      res.status(200).type('text').send('Новый email не должен совпадать с текущим email');
    }
  } else {
    res.status(400).type('text').send('неверный пароль');
  }
});

app.get('/UserPosts', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let id = user.rows[0].id;
  let information = await pool.query(`SELECT ps.*, photo FROM posts ps, usersinfo if WHERE ps.id_user = if.user_id AND ps.id_user = '${id}' ORDER BY id DESC`);
  res.type('json').send(information.rows);
});

app.get('/NumberUserPosts', async (req, res) => {
  let cook = req.cookies;
  let cookEmail = cook.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
  let id = user.rows[0].id;
  let post = await pool.query(`SELECT COUNT (*) FROM posts WHERE id_user = '${id}'`);
  let subscriptions = await pool.query(`SELECT COUNT (*) FROM subscriptions WHERE follower_id = '${id}'`);
  let subscribers = await pool.query(`SELECT COUNT (*) FROM subscriptions WHERE user_id = '${id}'`);
  let number = {
    post: post.rows[0].count,
    subscriptions: subscriptions.rows[0].count,
    subscribers: subscribers.rows[0].count,
  };
  res.status(200).type('json').send(number);
});

app.post('/someUserPost', async (req, res) => {
  let id = req.body.id.substring(1);
  let information = await pool.query(`SELECT ps.*, photo FROM posts ps, usersinfo if WHERE ps.id_user = if.user_id AND ps.id_user = '${id}' ORDER BY id DESC`);
  res.status(200).type('json').send(information.rows);
});

app.post('/someUserInfo', async (req, res) => {
  let id = req.body.id.substring(1);
  let userInfo = await pool.query(`SELECT * FROM usersinfo WHERE user_id = '${id}'`);
  res.type('json').send(userInfo.rows);
});

app.post('/someNumberUserPosts', async (req, res) => {
  let id = req.body.id.substring(1);
  let post = await pool.query(`SELECT COUNT (*) FROM posts WHERE id_user = '${id}'`);
  let subscriptions = await pool.query(`SELECT COUNT (*) FROM subscriptions WHERE follower_id = '${id}'`);
  let subscribers = await pool.query(`SELECT COUNT (*) FROM subscriptions WHERE user_id = '${id}'`);
  let number = {
    post: post.rows[0].count,
    subscriptions: subscriptions.rows[0].count,
    subscribers: subscribers.rows[0].count,
  };
  res.status(200).type('json').send(number);
});

app.post('/subscription', async (req, res) => {
  let followerEmail = req.cookies.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${followerEmail}`);
  let followerId = user.rows[0].id;
  let userId = req.body.user_id;
  let subscribeFrom = await pool.query(`SELECT * FROM subscriptions WHERE follower_id = '${followerId}'  AND user_id = '${userId}'`);
  if(subscribeFrom.rows.length === 0) {
    await pool.query(`INSERT INTO subscriptions (follower_id, user_id) VALUES ('${followerId}', '${userId}')`);
    res.status(200).type('text').send('читаю');
  } else if(subscribeFrom.rows.length > 0) {
    await pool.query(`DELETE FROM subscriptions WHERE follower_id = '${followerId}' AND user_id = '${userId}'`);
    res.status(200).type('text').send('читать');
  }
});

app.post('/subscriptionNow', async (req, res) => {
  let followerEmail = req.cookies.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${followerEmail}`);
  let followerId = user.rows[0].id;
  let userId = req.body.id.substring(1);
  let subscribeFrom = await pool.query(`SELECT * FROM subscriptions WHERE follower_id = '${followerId}'  AND user_id = '${userId}'`);
  if(subscribeFrom.rows.length === 0) {
    res.status(200).type('text').send('читать');
  } else if(subscribeFrom.rows.length > 0) {
    res.status(200).type('text').send('читаю');
  }
});

app.get('/newsFeed', async (req, res) => {
  let followerEmail = req.cookies.email;
  let user = await pool.query(`SELECT * FROM users WHERE email = ${followerEmail}`);
  let followerId = user.rows[0].id;
  let userID = await pool.query(`SELECT * FROM subscriptions WHERE follower_id = '${followerId}'`);
  let userIDarray = userID.rows.map((item) => item.user_id);
  if (userIDarray.length > 0) {
    userIDarray.push(followerId);
    const placeholders = userIDarray.map((_, index) => `$${index + 1}`).join(', ');
    let information = await pool.query(`
      SELECT ps.*, ui.photo 
      FROM posts ps 
      JOIN usersinfo ui ON ps.id_user = ui.user_id 
      WHERE ui.user_id IN (${placeholders}) 
      ORDER BY ps.id DESC
    `,userIDarray);
    res.type('json').send(information.rows);
  } else {
    let information = [];
    res.type('json').send(information);
  }
});

app.get('/userFollowing', async (req, res) => {
  let emailCook = req.cookies.email;
  let email = emailCook.replace(/'/g, '').trim();
  let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  let id = user.rows[0].id;
  let arrayFollovers = await pool.query('SELECT user_id FROM subscriptions WHERE follower_id = $1', [id]);
  let arrayIDFollovers = arrayFollovers.rows.map(row => row.user_id );
  if (arrayIDFollovers.length > 0) {
    const placeholders = arrayIDFollovers.map((_, index) => `$${index + 1}`).join(', ');
    let information = await pool.query(`SELECT * FROM usersinfo WHERE user_id IN (${placeholders}) `,arrayIDFollovers);
    res.type('json').send(information.rows);
  } else {
    let information = [];
    res.type('json').send(information);
  }
});

app.get('/userFollowers', async (req, res) => {
  let emailCook = req.cookies.email;
  let email = emailCook.replace(/'/g, '').trim();
  let user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  let id = user.rows[0].id;
  let arrayFollovers = await pool.query('SELECT follower_id FROM subscriptions WHERE user_id = $1', [id]);
  let arrayIDFollovers = arrayFollovers.rows.map(row => row.follower_id );
  if (arrayIDFollovers.length > 0) {
    const placeholders = arrayIDFollovers.map((_, index) => `$${index + 1}`).join(', ');
    let information = await pool.query(`SELECT * FROM usersinfo WHERE user_id IN (${placeholders}) `,arrayIDFollovers);
    res.type('json').send(information.rows);
  } else {
    let information = [];
    res.type('json').send(information);
  }
});

app.post('/someUserFollowing', async (req, res) => {
  let id = req.body.id.substring(1);;
  let arrayFollovers = await pool.query('SELECT user_id FROM subscriptions WHERE follower_id = $1', [id]);
  let arrayIDFollovers = arrayFollovers.rows.map(row => row.user_id );
  if (arrayIDFollovers.length > 0) {
    const placeholders = arrayIDFollovers.map((_, index) => `$${index + 1}`).join(', ');
    let information = await pool.query(`SELECT * FROM usersinfo WHERE user_id IN (${placeholders}) `,arrayIDFollovers);
    res.type('json').send(information.rows);
  } else {
    let information = [];
    res.type('json').send(information);
  }
});

app.post('/someUserFollowers', async (req, res) => {
  let id = req.body.id.substring(1);;
  let arrayFollovers = await pool.query('SELECT follower_id FROM subscriptions WHERE user_id = $1', [id]);
  let arrayIDFollovers = arrayFollovers.rows.map(row => row.follower_id );
  if (arrayIDFollovers.length > 0) {
    const placeholders = arrayIDFollovers.map((_, index) => `$${index + 1}`).join(', ');
    let information = await pool.query(`SELECT * FROM usersinfo WHERE user_id IN (${placeholders}) `,arrayIDFollovers);
    res.type('json').send(information.rows);
  } else {
    let information = [];
    res.type('json').send(information);
  }
});

app.get('/recommendations', async (req, res) => {
  if(req.cookies.email){
    let cookEmail = req.cookies.email;
    let user = await pool.query(`SELECT * FROM users WHERE email = ${cookEmail}`);
    let excludedUserId = user.rows[0].id;
    let recom = await pool.query('SELECT user_id, COUNT(*) AS count FROM subscriptions WHERE user_id != $1 GROUP BY user_id ORDER BY count DESC LIMIT 3', [excludedUserId]);
    let arrayRecom = recom.rows.map((item) => item.user_id);
    if(arrayRecom.length > 0){
      let arrayRecomId = arrayRecom.map((_, index) => `$${index + 1}`).join(', ');
      let UsersRecom = await pool.query(`SELECT id, user_id, username, usernick, photo FROM usersinfo WHERE user_id IN (${arrayRecomId})`, arrayRecom);
      res.type('json').send(UsersRecom.rows);
    } else {
      res.type('json').send([]);
    }
  } else {
    let recom = await pool.query('SELECT user_id, COUNT(*) AS count FROM subscriptions GROUP BY user_id ORDER BY count DESC LIMIT 3');
    let arrayRecom = recom.rows.map((item) => item.user_id);
    if(arrayRecom.length > 0){
      let arrayRecomId = arrayRecom.map((_, index) => `$${index + 1}`).join(', ');
      let UsersRecom = await pool.query(`SELECT id, user_id, username, usernick, photo FROM usersinfo WHERE user_id IN (${arrayRecomId})`, arrayRecom);
      res.type('json').send(UsersRecom.rows);
    } else {
      res.type('json').send([]);
    }
  }
});

app.post('/hashtagWords', async (req, res) => {
  let hashtag = req.body;
  let arrayHashtag = hashtag.map((_, index) => `$${index + 1}`).join(', ');
  let  hashtagTabl = await pool.query(`SELECT * FROM hashtag WHERE hashtagname IN (${arrayHashtag})`, hashtag );
  if(hashtagTabl.rows.length > 0){
    await pool.query(`UPDATE hashtag SET hashtaglot = CAST(CAST(hashtaglot AS INTEGER) + 1 AS CHARACTER VARYING) WHERE hashtagname IN (${arrayHashtag})`, hashtag);
    res.status(200).type('text').send('OK');
  } else {
    const insertPlaceholders = hashtag.map((_, i) => `($${i + 1}, '1')`).join(', ');
    await pool.query(`INSERT INTO hashtag (hashtagname, hashtaglot) VALUES ${insertPlaceholders}`, hashtag);
    res.status(200).type('text').send('OK');
  }
});

app.post('/hashtagPosts', async (req, res) => {
  let hashtag = req.body.hashtagt;
  const searchPattern = `%#${hashtag}%`;
  try {
    const result = await pool.query(
      'SELECT ps.*, photo  FROM posts ps, usersinfo if WHERE  ps.id_user = if.user_id AND mess ILIKE $1 ORDER BY id DESC',
      [searchPattern],
    );
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при поиске');
  }
});

app.get('/myId', async (req, res) => {
  let emailCook = req.cookies.email;
  let email = emailCook.replace(/'/g, '').trim();
  let user = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  res.status(200).json(user.rows);
});

app.post('/deleteANDputLike', async (req, res) => {
  let idPost = req.body.idPost
  let emailCook = req.cookies.email;
  let email = emailCook.replace(/'/g, '').trim();
  let user = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  let idUser = user.rows[0].id;
  let likeAnswer = await pool.query(`SELECT id FROM likes WHERE user_id = $1 AND post_id = $2`, [idUser, idPost]); //стоит ли лайк
  if(likeAnswer.length > 0){
    await pool.query(`DELETE FROM likes WHERE user_id = $1 AND post_id = $2`, [idUser, idPost]);   //удалаем лайк
    res.status(200).type('text').send('no');
  } else if (likeAnswer.length < 0) {
    await pool.query(`INSERT INTO likes (user_id, post_id) VALUES ($1, $2)`, [idUser, idPost]);
    res.status(200).type('text').send('yes'); //ставим лайк
  }
})

app.post('/myLike', async (req, res) => {
  let idPost = req.body.idPost
  let emailCook = req.cookies.email;
  let email = emailCook.replace(/'/g, '').trim();
  let user = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  let idUser = user.rows[0].id;
  let likeAnswer = await pool.query(`SELECT id FROM likes WHERE user_id = $1 AND post_id = $2`, [idUser, idPost]); //стоит ли лайк
  if(likeAnswer.length > 0){
    res.status(200).type('text').send('yes');
  } else if (likeAnswer.length < 0) {
    res.status(200).type('text').send('no');
  }
})

app.post('/LikePost', async (req, res) => {
  let idPost = req.body.idPost
  let likeAnswerResult = await pool.query(`SELECT COUNT(*) AS count FROM post_likes WHERE post_id = $1`, [idPost]); //колличество лайков 
  res.status(200).send(likeAnswerResult.rows[0].count);
})
