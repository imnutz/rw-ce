import {
  fetchArticleAndComments
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
    }
  ],

  actions: [
    fetchArticleAndComments
  ]
}
