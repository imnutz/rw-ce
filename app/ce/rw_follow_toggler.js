import { define } from 'uce'

const componentName = 'rw-follow-toggler'

define(componentName, {
  bound: [
    '_followHandler'
  ],

  props: {
    username: undefined,
    following: false
  },

  _followHandler (evt) {
    evt.preventDefault()

    const following = this.following
    const username = this.username

    this.dispatchEvent(new CustomEvent('follow', {
      bubbles: true,
      detail: { following, username }
    }))
  },

  render () {
    if (this.following) {
      return this.html`
        <button class="btn btn-sm btn-outline-secondary" onclick=${this._followHandler}>
          <i class="ion-plus-round"></i>
          &nbsp;
          Unfollow ${this.username}</span>
        </button>
      `
    }

    return this.html`
      <button class="btn btn-sm btn-outline-secondary" onclick=${this._followHandler}>
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow ${this.username}</span>
      </button>
    `
  }
})
