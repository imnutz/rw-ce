import { pages, GLOBAL_FEED_ID, PERSONAL_FEED_ID } from '../constants'
export default {
  appName: 'Conduit',
  nav: {
    home: {
      name: 'Home',
      path: '/home'
    },
    editor: {
      name: 'New Post',
      path: '/editor'
    },
    settings: {
      name: 'Settings',
      path: '/settings'
    },
    signin: {
      name: 'Sign In',
      path: '/signin'
    },
    signup: {
      name: 'Sign Up',
      path: '/signup'
    }
  },
  header: [],
  home: {
    tabs: [],
    tags: undefined,
    articles: undefined,
    currentTab: 'globalfeed',
    currentPage: 1,
    tabInfos: {
      globalFeed: {
        name: 'Global Feed',
        id: GLOBAL_FEED_ID
      },
      personalFeed: {
        name: 'Your Feed',
        id: PERSONAL_FEED_ID
      }
    }
  },
  isAuthenticated: false,

  isHome () {
    return this.page === pages.HOME
  },

  isTagTab () {
    return this.home.currentTab !== GLOBAL_FEED_ID && this.home.currentTab !== PERSONAL_FEED_ID
  },

  isGlobalTab () {
    return this.home.currentTab === GLOBAL_FEED_ID
  },

  isPersonalTab () {
    return this.home.currentTab === PERSONAL_FEED_ID
  },
  excludeTagTab () {
    this.home.tabs = this.home.tabs.filter(t => {
      return t.id === GLOBAL_FEED_ID || t.id === PERSONAL_FEED_ID
    })
  }
}
