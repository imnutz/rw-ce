import { render, html } from 'uce'

import setupRouter from './router'
import './main'
import $$ from './states'

const intents = $$.intents

const renderer = (state) => {
  render(document.body, html`<realworld-app .data=${state} .intents=${intents}/>`)
}

$$.stateManager.setRender(renderer)

// setup router
setupRouter($$.intents)

// start
intents.startApplication()
