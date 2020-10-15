import commonjs from '@rollup/plugin-commonjs'
import filesize from 'rollup-plugin-filesize'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const path = require('path')

export default {
  input: './app/index.js',
  output: [
    {
      file: path.resolve(__dirname, './dist/bundled.js'),
      format: 'es',
      name: 'Realworld',
      sourcemap: true,
      plugins: [
        serve(),
        livereload('dist')
      ]
    },
    {
      file: path.resolve(__dirname, './dist/bundled.min.js'),
      format: 'es',
      name: 'Realworld',
      plugins: [terser()]
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
