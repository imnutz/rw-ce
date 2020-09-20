import {
  start
} from './init'

export default (sam) => {
  const [startApplication] = sam.getIntents([
    start
  ]).intents

  return {
    startApplication
  }
}
