import {
  getArticles,
  getFeeds,
  getTags,
  favorite,
  getArticle,
  getComments,
  deleteComment,
  saveComment,
  createArticle,
  updateArticle,
  deleteArticle
} from '../api'

export const fetchArticles = async (...params) => {
  const data = await getArticles(...params)

  return { articles: data }
}

export const fetchFeeds = async (token, offset, limit) => {
  const data = await getFeeds(token, offset)

  return { articles: data }
}

export const fetchTags = async () => {
  return await getTags()
}

export const fetchArticle = async (slug, token) => {
  const data = await getArticle(slug, token)

  return { articleDetail: data.article }
}

export const fetchComments = async (slug, token) => {
  const data = getComments(slug, token)

  return { comments: data.comments }
}

export const favoriteArticle = async (token, slug, isDelete) => {
  const data = await favorite(token, slug, isDelete)

  return { favoritedArticle: data.article }
}

export const fetchArticleAndComments = async (slug, token) => {
  const promises = [
    fetchArticle(slug, token),
    fetchComments(slug, token)
  ]

  const [articleResult, commentResult] = await Promise.all(promises)
  return {
    articleDetail: articleResult.articleDetail,
    comments: commentResult.comments
  }
}

export const setFavorite = (slug) => ({ favorite: true, slug })
export const setDeletedComment = (commentId) => ({ deletedCommentId: commentId })
export const setNewComment = (comment) => ({ newComment: comment })

export const removeComment = async (token, slug, commentId) => {
  await deleteComment(token, slug, commentId)

  return { commentDeleted: true }
}

export const postComment = async (token, slug, comment) => {
  const data = await saveComment(token, slug, comment)

  return { savedComment: data.comment }
}

export const setNewArticleInfo = (title, description, body, tags) => {
  const tagList = tags && tags.length ? tags.split(',') : []
  return {
    createArticle: true,
    title,
    description,
    body,
    tagList
  }
}

export const setEditedArticle = (editedArticleDetail) => ({ editedArticleDetail })
export const setDeletedArticle = (deletedSlug) => ({ deletedSlug })

export const publishArticle = async (token, article, isEdit) => {
  var data = {}
  var result
  if (isEdit) {
    if (article.title) {
      data.title = article.title
    }
    if (article.description) {
      data.description = article.description
    }
    if (article.body) {
      data.body = article.body
    }
    if (article.tagList) {
      data.tagList = article.tagList
    }

    result = await updateArticle(token, article.slug, data)

    return { updatedArticle: result.article, errors: result.errors }
  }

  result = await createArticle(token, article)

  return { createdArticle: result.article, errors: result.errors }
}

export const removeArticle = async (token, slug) => {
  await deleteArticle(token, slug)

  return { articleDeleted: true }
}
