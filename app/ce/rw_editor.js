import { define } from 'uce'

const componentName = 'rw-editor'

define(componentName, {
  bound: ['render'],
  init () {
    this.titleRef = {}
    this.descRef = {}
    this.bodyRef = {}
    this.tagsRef = {}
    
    this.render()
  }

  _submit (evt) {
    evt.preventDefault()

    const title = this.titleRef.current.value
    const description = this.descRef.current.value
    const body = this.bodyRef.current.value
    const tags = this.tagsRef.current.value

    this.dispatchEvent(new CustomEvent('savearticle', {
      bubbles: true,
      detail: {
        title,
        description,
        body,
        tags
      }
    }))
  },

  render () {
    return this.html`
      <div class="editor-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-10 offset-md-1 col-xs-12">
              <form>
                <fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control form-control-lg" placeholder="Article Title" ref=${this.titleRef}>
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="What's this article about?" ref=${this.descRef}>
                  </fieldset>
                  <fieldset class="form-group">
                      <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" ref=${this.bodyRef}></textarea>
                  </fieldset>
                  <fieldset class="form-group">
                      <input type="text" class="form-control" placeholder="Enter tags"><div class="tag-list" ref=${this.tagsRef}></div>
                  </fieldset>
                  <button class="btn btn-lg pull-xs-right btn-primary" type="button">
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
