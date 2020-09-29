import { render, html } from 'uce'

import './main'

import setupRouter from './router'
import setupNAPs from './naps'
import $$ from './states'

const intents = $$.intents

const renderer = (state) => {
  render(document.body, html`<realworld-app .state=${state} .intents=${intents}/>`)
}

$$.stateManager.setRender(renderer)

// setup router
const router = setupRouter($$.intents)

setupNAPs($$.stateManager, router, intents)

// start
router.resolve()
