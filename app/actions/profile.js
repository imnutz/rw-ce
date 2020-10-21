import { getProfileArticles } from '../api'

export const fetchProfileArticles = async (options) => {
  const response = await getProfileArticles(options)  

  return { profileArticles: response.articles, profileArticlesCount: response.articlesCount }
}
