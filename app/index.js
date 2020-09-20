import { render, html } from 'uce'

import './main'
import $$ from './states'

const renderer = (state) => {
  console.log(state)
  render(document.body, html`<realworld-app />`)
}

$$.stateManager.setRender(renderer)

// start
$$.intents.startApplication()
