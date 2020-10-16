import { define, html } from 'uce'

const componentName = 'rw-editor'

define(componentName, {
  bound: ['render', '_submit', '_getErrorMessage'],
  props: {
    errors: {},
    article: undefined
  },
  init () {
    this.titleRef = {}
    this.descRef = {}
    this.bodyRef = {}
    this.tagsRef = {}

    this.render()
  },

  _submit (evt) {
    evt.preventDefault()

    const isEditing = Boolean(this.article)
    const slug = isEditing ? this.article.slug : ''

    const title = this.titleRef.current.value
    const description = this.descRef.current.value
    const body = this.bodyRef.current.value
    const tags = this.tagsRef.current.value

    this.dispatchEvent(new CustomEvent('savearticle', {
      bubbles: true,
      detail: {
        isEditing,
        slug,
        title,
        description,
        body,
        tags
      }
    }))
  },

  _getErrorMessage (error = {}) {
    const errorMessages = Object.keys(error).reduce((errors, key) => {
      errors.push([key, error[key]].join(' '))
      return errors
    }, [])

    return errorMessages && errorMessages.length ? html`
      <ul class="error-messages">
        ${
          errorMessages.map(msg => {
            return html`<li>${msg}</li>`
          })
        }
      </ul>
    ` : ''
  },
  render () {
    const {
      title = '',
      description = '',
      body = '',
      tagList = []
    } = this.article || {}

    return this.html`
      <div class="editor-page">
        <div class="container page">
          <div class="row">
            ${this._getErrorMessage(this.errors)} 
            <div class="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control form-control-lg" placeholder="Article Title" ref=${this.titleRef} value=${title}>
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="What's this article about?" ref=${this.descRef} value=${description}>
                  </fieldset>
                  <fieldset class="form-group">
                      <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" ref=${this.bodyRef}>${body}</textarea>
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="Enter tags" ref=${this.tagsRef} value=${tagList.join(',')}/>
                  </fieldset>
                  <button class="btn btn-lg pull-xs-right btn-primary" type="button" onclick=${this._submit}>
                      Publish Article
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    `
  }
})
