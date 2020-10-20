import { PAGE_LIMIT } from '../constants'
export default (sam, router, intents) => {
  sam.addNAPs([
    model => _ => {
      if (model.redirectPage) {
        router.navigate(['/', model.redirectPage].join(''))
        intents.redirected()
        return true
      }

      return false
    },

    model => _ => {
      if (model.isHome() && !model.fetchingArticles && model.fetchingTags) return true

      const isHomeAndFetching = model.isHome() && (model.fetchingArticles || model.paginating)
      const page = model.home.currentPage - 1
      const offset = page * PAGE_LIMIT

      if (isHomeAndFetching && model.isGlobalTab()) {
        intents.fetchArticles(offset, PAGE_LIMIT)
      } else if (isHomeAndFetching && model.isPersonalTab()) {
        intents.fetchFeeds(model.user.token, offset, PAGE_LIMIT)
      } else if (isHomeAndFetching && model.isTagTab()) {
        intents.fetchArticles(offset, PAGE_LIMIT, model.home.currentTab)
      }

      if (model.isHome() && model.fetchingTags) {
        intents.fetchTags()
      }

      return false
    },

    model => _ => {
      if (model.favorite && model.foundArticle) {
        intents.favoriteArticle(model.user.token, model.foundArticle.slug, model.foundArticle.favorited)

        return true
      }

      return false
    },

    model => _ => {
      if (model.isArticlePage() && model.fetchingArticleDetail) {
        const token = model.getAuthenticatedToken()
        intents.fetchArticleAndComments(model.articleSlug, token)

        return true
      }

      return false
    },

    model => _ => {
      if (model.isArticlePage() && model.followUser) {
        const token = model.getAuthenticatedToken()

        intents.followUser(token, model.followUser, model.following)
        return true
      }

      return false
    },

    model => _ => {
      if (model.isArticlePage() && model.deletedCommentId) {
        const token = model.getAuthenticatedToken()
        intents.removeComment(token, model.articleDetail.slug, model.deletedCommentId)
        return true
      }

      return false
    },

    model => _ => {
      if (model.isArticlePage() && model.newComment) {
        const token = model.getAuthenticatedToken()
        intents.postComment(token, model.articleDetail.slug, model.newComment)

        // reset input field value
        document.querySelector('.article-comment-input').value = ''

        return true
      }

      return false
    },

    model => _ => {
      if (model.isArticlePage() && model.deletedSlug) {
        const token = model.getAuthenticatedToken()

        intents.removeArticle(token, model.deletedSlug)
        return true
      }

      return false
    },

    model => _ => {
      if (model.isEditorPage() && model.createArticle) {
        const token = model.getAuthenticatedToken()

        if (token) {
          intents.publishArticle(token, model.newArticle)
        }

        return true
      }

      return false
    },

    model => _ => {
      if (model.isEditorPage() && model.editedSlug) {
        const token = model.getAuthenticatedToken()

        if (token) {
          intents.fetchArticle(model.editedSlug, token)
        }
      }

      return false
    },

    model => _ => {
      if (model.isEditorPage() && model.editedArticleDetail) {
        const token = model.getAuthenticatedToken()

        if (token) {
          intents.publishArticle(token, model.editedArticleDetail, true)
        }

        return true
      }

      return false
    },

    model => _ => {
      if (model.isSettingsPage() && !model.settingsUser) {
        const token = model.getAuthenticatedToken()

        intents.fetchUser(token)
        return true
      }

      return false
    },

    model => _ => {
      if (model.isSettingsPage() && model.newSettings) {
        const token = model.getAuthenticatedToken()

        intents.updateUserSettings(token, model.newSettings)
        return true
      }

      return false
    },

    model => _ => {
      if (model.isProfilePage() && !model.profile.info) {
        const token = model.getAuthenticatedToken()

        intents.fetchProfileAndArticles(token, model.profileName)
        return true
      }

      return false
    }
  ])
}
