import { define } from 'uce'

const componentName = 'rw-footer'

define(componentName, {
  render () {
    return this.html`
      <footer>
        <div class="container">
          <a href="/" class="logo-font">conduit</a>
          <span class="attribution">
            An interactive learning project from <a href="https://thinkster.io">Thinkster</a>. Code &amp; design licensed under MIT.
          </span>
        </div>
      </footer>
    `
  }
})
