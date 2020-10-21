import test from 'tape'

import {
  toggleFeed,
  selectTag,
  selectPage
} from '../../actions/home'

test('toggle feed', function (t) {
  var result = toggleFeed('a_tab_id')

  t.equal(result.tabId, 'a_tab_id')

  result = toggleFeed(null)

  t.equal(result.tabId, null)
  t.end()
})

test('select tag', function (t) {
  var result = selectTag('a_tag')

  t.equal(result.tagName, 'a_tag')
  t.end()
})

test('select page', function (t) {
  var result = selectPage(10)

  t.equal(result.pageNumber, 10)
  t.end()
})
