import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const path = require('path')

export default {
  input: './app/index.js',
  output: {
      file: path.resolve(__dirname, './dist/bundled.js'),
      format: 'es',
      name: 'Realworld'
  },
  plugins: [
    commonjs(),
    nodeResolve()
  ]
}
