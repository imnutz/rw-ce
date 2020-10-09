import {
  fetchArticleAndComments,
  setDeletedComment,
  removeComment,
  postComment,
  setNewComment
} from '../actions/article'
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
    }
  ],

  actions: [
    fetchArticleAndComments,
    setDeletedComment,
    removeComment,
    postComment,
    setNewComment
  ]
}
