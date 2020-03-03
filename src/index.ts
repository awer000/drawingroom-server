import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as expressSession from 'express-session';
import * as dotenv from 'dotenv';
import * as passport from 'passport';
import { createConnection, getConnectionOptions } from 'typeorm';
import userAPIRouter from './routes/user';
import postAPIRouter from './routes/post';
import postsAPIRouter from './routes/posts';
import hashtagAPIRouter from './routes/hashtag';
import passportConfig from './passport';

dotenv.config();

const { COOKIE_SECRET, PORT } = process.env
async function initialize() {
  try {
    await createConnection();
    console.log('MYSQL RDBMS connection is established');
  } catch (e) {
    console.log(e);
  }
}
initialize();

const app = express();
passportConfig()

app.use(morgan("dev"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: true,
  credentials: true
}))
app.use(cookieParser(COOKIE_SECRET))
app.use(expressSession({
  resave: false,
  saveUninitialized: false,
  secret: COOKIE_SECRET,
  cookie: {
    httpOnly: true
  },
  name: 'ILoveRedVelvet'
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/api/user', userAPIRouter)
app.use('/api/post', postAPIRouter)
app.use('/api/posts', postsAPIRouter)
app.use('/api/hashtag', hashtagAPIRouter)
app.listen(PORT, () => {
  console.log('server is running')
})