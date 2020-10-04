import {
  getArticles,
  getFeeds,
  getTags,
  favorite,
  getArticle,
  getComments
} from '../api'

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

export const fetchArticle = (slug, token) => {
  return getArticle(slug, token).then(data => ({ articleDetail: data.article }))
}

export const fetchComments = (slug, token) => {
  return getComments(slug, token).then(data => ({ comments: data.comments }))
}

export const favoriteArticle = (token, slug, isDelete) => {
  return favorite(token, slug, isDelete).then(data => ({ favoritedArticle: data.article }))
}

export const fetchArticleAndComments = (slug, token) => {
  const promises = [
    fetchArticle(slug, token),
    fetchComments(slug, token)
  ]

  return Promise.all(promises).then(results => {
    const [articleResult, commentResult] = results

    return {
      articleDetail: articleResult.articleDetail,
      comments: commentResult.comments
    }
  })
}

export const setFavorite = (slug) => ({ favorite: true, slug })
