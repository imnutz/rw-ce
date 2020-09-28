import { GLOBAL_FEED_ID, PERSONAL_FEED_ID } from '../constants'
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
    tags: [],
    currentTab: 'globalfeed',
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
  isAuthenticated: false
}
