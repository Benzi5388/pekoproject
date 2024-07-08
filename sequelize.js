import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import UserModel from './models/userModel.js';
import ArticleModel from './models/articleModel.js';

dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

const User = UserModel(sequelize);
const Article = ArticleModel(sequelize);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
    await sequelize.sync();
    console.log('Models synced with the database.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export { sequelize, connectToDatabase as connection, User, Article};