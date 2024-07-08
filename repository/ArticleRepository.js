
import { Article } from '../sequelize.js';

class ArticleRepository {
  async createArticle(articleData) {
    return Article.create(articleData);
  }

  async getAllArticles() {
    return Article.findAll();
  }

  async getArticleById(id) {
    return Article.findByPk(id);
  }

  async updateArticle(id, articleData) {
    const article = await Article.findByPk(id);
    if (!article) throw new Error('Article not found');
    await article.update(articleData);
    return article;
  }

  async deleteArticle(id) {
    const article = await Article.findByPk(id);
    if (!article) throw new Error('Article not found');
    await article.destroy();
    return article;
  }
}

export default new ArticleRepository();
