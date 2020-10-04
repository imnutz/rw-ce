import { define, html } from 'uce'

const componentName = 'rw-header'

define(componentName, {
  bound: ['render'],
  props: {
    navItems: []
  },

  _getNavItem (data) {
    const icon = data.icon ? html`<icon class=${data.icon}</icon>` : html``
    return html`
      <li class="nav-item">
        <a class="nav-link" href=${`#${data.path}`}>
          ${icon}&nbsp;${data.name}
        </a>
      </li>
  
    `
  },

  _getNav () {
    return html`
      <ul class="nav navbar-nav pull-xs-right">
        ${(this.navItems || []).map(this._getNavItem)}
      </ul>
    `
  },
  render () {
    return this.html`
      <nav class="navbar navbar-light">
        <div class="container">
          <a class="navbar-brand" href="index.html">${this.appName}</a>
          ${this._getNav()}
        </div>
      </nav>
    `
  }
})
