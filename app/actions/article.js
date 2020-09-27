import { getArticles } from '../api'

export const fetchArticles = (offset) => {
  return getArticles(offset)
    .then(data => ({ articles: data }))
}
