import {
  fetchArticleAndComments,
  fetchArticle,
  setDeletedComment,
  removeComment,
  postComment,
  setNewComment,
  setNewArticleInfo,
  setEditedArticle,
  setDeletedArticle,
  removeArticle,
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
        if (model.isEditorPage()) {
          model.editedArticle = articleDetail
          model.editedSlug = undefined
        } else {
          model.fetchingArticleDetail = false
          model.articleSlug = undefined

          model.articleDetail = articleDetail
          model.articleComments = comments
        }
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
    },

    model => ({ editedSlug }) => {
      if (editedSlug) {
        model.editedSlug = editedSlug
      }
    },
    model => ({ editedArticleDetail }) => {
      if (editedArticleDetail) {
        model.editedArticleDetail = editedArticleDetail
      }
    },
    model => ({ updatedArticle, errors }) => {
      if (errors) {
        model.articleCreationErrors = errors
        model.editedArticleDetail = undefined
      } else if (updatedArticle) {
        model.redirectPage = pages.HOME
        model.editedArticleDetail = undefined
      }
    },
    model => ({ deletedSlug }) => {
      if (deletedSlug) {
        model.deletedSlug = deletedSlug
      }
    },
    model => ({ articleDeleted }) => {
      if (articleDeleted) {
        model.redirectPage = pages.HOME
        model.deletedSlug = undefined
      }
    }
  ],

  actions: [
    fetchArticleAndComments,
    fetchArticle,
    setDeletedComment,
    removeComment,
    postComment,
    setNewComment,
    setNewArticleInfo,
    setEditedArticle,
    setDeletedArticle,
    publishArticle,
    removeArticle
  ]
}
