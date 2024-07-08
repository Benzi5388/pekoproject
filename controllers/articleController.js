import ArticleRepository from '../repository/ArticleRepository.js';

export const createArticle = async (req, res) => {
  try {
    const { title, content } = req.body;
    const articleData = { title, content, userId: req.user.id };
    const article = await ArticleRepository.createArticle(articleData);
    res.status(201).json(article);
  } catch (error) {
    console.error('Error creating article:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleRepository.getAllArticles();
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error getting articles:', error);
    res.status(500).json({ error: 'No article found' });
  }
};

export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await ArticleRepository.getArticleById(id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (error) {
    console.error('Error getting article by ID:', error);
    res.status(500).json({ error: 'No article found with this id' });
  }
};

export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const articleData = { title, content };
    const updatedArticle = await ArticleRepository.updateArticle(id, articleData);
    res.status(200).json(updatedArticle);
  } catch (error) {
    console.error('Error updating article:', error);
    res.status(500).json({ error: 'No article found with this id' });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await ArticleRepository.deleteArticle(id);
    res.status(200).json(deletedArticle);
  } catch (error) {
    console.error('Error deleting article:', error);
    res.status(500).json({ error: 'No article found with this id' });
  }
};
