import {
  start,
  redirected,
  setPage
} from './init'

import {
  signin
} from './user'

import {
  fetchArticles
} from './article'

export default (sam) => {
  const [
    startApplication,
    goToPage,
    iSignin,
    iRedirected
  ] = sam.getIntents([start, setPage, signin, redirected]).intents

  const [
    iFetchArticles
  ] = sam.getIntents([fetchArticles]).intents

  return {
    startApplication,
    goToPage,
    iSignin,
    iRedirected,
    iFetchArticles
  }
}
