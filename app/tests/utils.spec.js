import test from 'tape'

import { isEmptyArray } from '../utils'

test('empty array', function (t) {
  var array = []

  var isEmpty = isEmptyArray(array)

  t.ok(isEmpty)
  t.end()
})
