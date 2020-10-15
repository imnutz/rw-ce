import {
  fetchArticleAndComments,
  setDeletedComment,
  removeComment,
  postComment,
  setNewComment,
  setNewArticleInfo,
  publishArticle
} from '../actions/article'

import {
  pages
} from '../constants'

export default {
  acceptors: [
    model => ({ slug }) => {
      if (model.isArticlePage() && slug) {
        model.fetchingArticleDetail = true
        model.articleSlug = slug
      }

      return model
    },

    model => ({ articleDetail, comments }) => {
      if (articleDetail) {
        model.fetchingArticleDetail = false
        model.articleSlug = undefined

        model.articleDetail = articleDetail
        model.articleComments = comments
      }

      return model
    },

    model => ({ deletedCommentId }) => {
      if (deletedCommentId) {
        model.deletedCommentId = deletedCommentId
      }

      return model
    },

    model => ({ commentDeleted }) => {
      if (commentDeleted && model.isArticlePage()) {
        const currentComments = model.articleComments
        model.articleComments = currentComments.filter(comment => {
          return comment.id !== model.deletedCommentId
        })

        model.deletedCommentId = undefined
      }

      return model
    },

    model => ({ newComment }) => {
      if (model.isArticlePage() && newComment) {
        model.newComment = newComment
      }

      return model
    },

    model => ({ savedComment }) => {
      if (savedComment) {
        model.articleComments.unshift(savedComment)
        model.newComment = undefined
      }

      return model
    },

    model => ({ createArticle, title, description, body, tagList }) => {
      if (createArticle) {
        model.newArticle = {
          title,
          description,
          body,
          tagList
        }

        model.createArticle = true
      }

      return model
    },

    model => ({ createdArticle, errors }) => {
      if (errors) {
        model.articleCreationErrors = errors
        model.createArticle = false
      } else if (createdArticle) {
        model.redirectPage = pages.HOME

        model.newArticle = undefined
        model.articleCreationErrors = undefined
        model.createArticle = false
      }
    }
  ],

  actions: [
    fetchArticleAndComments,
    setDeletedComment,
    removeComment,
    postComment,
    setNewComment,
    setNewArticleInfo,
    publishArticle
  ]
}
