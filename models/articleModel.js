import { DataTypes } from 'sequelize';

const ArticleModel = (sequelize) => {
  return sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

export default ArticleModel;