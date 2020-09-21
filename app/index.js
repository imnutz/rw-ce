import { render, html } from 'uce'

import setupRouter from './router'
import './main'
import $$ from './states'

const renderer = (state) => {
  render(document.body, html`<realworld-app .data=${state}/>`)
}

$$.stateManager.setRender(renderer)

// setup router
setupRouter($$.intents)

// start
$$.intents.startApplication()
