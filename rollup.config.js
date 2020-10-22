import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const path = require('path')

var devPlugins = []
var prodPlugins = []

var mode = process.env.NODE_ENV || 'dev'

if (mode === 'dev') {
  devPlugins = [
    serve(),
    livereload('dist')
  ]
} else if (mode === 'prod') {
  prodPlugins = [ terser() ]
}

export default {
  input: './app/index.js',
  output: [
    {
      file: path.resolve(__dirname, './dist/bundled.js'),
      format: 'es',
      name: 'Realworld',
      sourcemap: true,
      plugins: devPlugins
    },
    {
      file: path.resolve(__dirname, './dist/bundled.min.js'),
      format: 'es',
      name: 'Realworld',
      plugins: prodPlugins
    }
  ],
  plugins: [
    commonjs(),
    nodeResolve(),
    filesize({
      showGzippedSize: true,
      showBrotliSize: false,
      showMinifiedSize: false
    })
  ]
}
