import sam from 'sam-pattern'

import initialState from './initial_state'
import setupActions from '../actions'

import base from './base'

const { api, createInstance } = sam

const samInstance = api(createInstance())

// initiate state
samInstance.addInitialState(initialState)

samInstance.addComponent(base)

// setup actions, get back the intents
const intents = setupActions(samInstance)

export default {
  stateManager: samInstance,
  intents
}
