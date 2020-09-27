import { getArticles, getFeeds } from '../api'

export const fetchArticles = (offset) => {
  return getArticles(offset)
    .then(data => ({ articles: data }))
}

export const fetchFeeds = (token, offset, limit) => {
  return getFeeds(token, 0)
    .then(data => ({ articles: data }))
}
