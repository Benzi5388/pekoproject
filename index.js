import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoute from './routes/userRoutes.js';
import articleRoute from './routes/articleRoutes.js';
import { connection, User } from './sequelize.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import verifySource from './middlewares/verifysource.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  }
}));

app.use(cors());
app.use(express.json());
app.use(verifySource);
app.use(bodyParser.json());

app.use('/api', userRoute);
app.use('/articles', articleRoute);

connection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });