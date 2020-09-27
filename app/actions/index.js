import {
  start,
  redirected,
  setPage
} from './init'

import {
  signin
} from './user'

import {
  fetchArticles,
  fetchFeeds
} from './article'

import { toggleFeed } from './home'

export default (sam) => {
  const [
    startApplication,
    goToPage,
    iSignin,
    iRedirected
  ] = sam.getIntents([start, setPage, signin, redirected]).intents

  const [
    iFetchArticles,
    iFetchFeeds
  ] = sam.getIntents([fetchArticles, fetchFeeds]).intents

  const [
    iToggleFeed
  ] = sam.getIntents([toggleFeed]).intents

  return {
    startApplication,
    goToPage,
    iSignin,
    iRedirected,
    iFetchArticles,
    iFetchFeeds,
    iToggleFeed
  }
}
