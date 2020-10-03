import { getArticles, getFeeds, getTags } from '../api'

export const fetchArticles = (...params) => {
  return getArticles(...params)
    .then(data => ({ articles: data }))
}

export const fetchFeeds = (token, offset, limit) => {
  return getFeeds(token, offset)
    .then(data => ({ articles: data }))
}

export const fetchTags = () => {
  return getTags().then(data => data)
}
