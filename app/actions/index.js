import {
  start,
  redirected,
  setPage
} from './init'

import {
  signin
} from './user'

export default (sam) => {
  const [
    startApplication,
    goToPage,
    iSignin,
    iRedirected
  ] = sam.getIntents([
    start,
    setPage,
    signin,
    redirected
  ]).intents

  return {
    startApplication,
    goToPage,
    iSignin,
    iRedirected
  }
}
