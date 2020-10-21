import test from 'tape'

import sam from 'sam-pattern'

import initialState from '../../states/initial_state'
import base from '../../states/base'
import { pages } from '../../constants'

const { addInitialState, addComponent, setRender } = sam

addInitialState(initialState)

const [
  /* eslint-disable */
  redirected,
  /* eslint-enable */
  setPage
] = addComponent(base).intents

test('shoul set page', function (t) {
  setRender(function (state) {
    t.equal(state.page, pages.HOME)
    t.end()
  })

  setPage(pages.HOME)
})
