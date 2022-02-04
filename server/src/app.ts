import express = require('express');
import { Request, Response } from 'express';
import './connect';
import cors = require('cors');
require('dotenv').config();
import { UserModule as User } from './routes/user';
import { PostModule as Post } from './routes/post';

const app = express();
const PORT = process.env.PORT || 5000;
const version = process.env.version || 'v1';

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`/api/${version}/users`, User.userRouter);
app.use(`/api/${version}/posts`, Post.postRouter);

app.get('*', (_: Request, res: Response) => {
  res.send('<h1>Welcome to server apis</h1>');
  res.end();
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
