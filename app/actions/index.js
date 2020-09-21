import {
  start,
  setPage
} from './init'

export default (sam) => {
  const [
    startApplication,
    goToPage
  ] = sam.getIntents([
    start,
    setPage
  ]).intents

  return {
    startApplication,
    goToPage
  }
}
