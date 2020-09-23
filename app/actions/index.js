import {
  start,
  setPage
} from './init'

import {
  signin
} from './user'

export default (sam) => {
  const [
    startApplication,
    goToPage,
    iSignin
  ] = sam.getIntents([
    start,
    setPage,
    signin
  ]).intents

  return {
    startApplication,
    goToPage,
    iSignin
  }
}
