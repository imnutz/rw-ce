import { define } from 'uce'

const componentName = 'rw-article-summary'

/*
{title: "My second post", slug: "my-second-post-o214pl", body: "Today is very cloudy but I am happy to code.", createdAt: "2020-09-26T23:47:00.744Z", updatedAt: "2020-09-26T23:47:00.744Z", …}
author:
bio: "I love exploring new technology ya"
following: false
image: "https://avatars2.githubusercontent.com/u/19742621?s=460&v=4"
username: "alle.aldine"
__proto__: Object
body: "Today is very cloudy but I am happy to code."
createdAt: "2020-09-26T23:47:00.744Z"
description: "I think this is great"
favorited: false
favoritesCount: 0
slug: "my-second-post-o214pl"
tagList: []
title: "My second post"
updatedAt: "2020-09-26T23:47:00.744Z"
*/

define(componentName, {
  bound: ['render'],
  props: {
    article: {}
  },
  render () {
    return this.html`
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html"><img src="${this.article.author.image}" /></a>
          <div class="info">
            <a href="" class="author">${this.article.author.username}</a>
            <span class="date">${this.article.createdAt}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> ${this.article.favoritesCount}
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>${this.article.title}</h1>
          <p>${this.article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    `
  }
})
