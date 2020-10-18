const API_BASE = 'https://conduit.productionready.io/api'

const header = {
  'Content-Type': 'application/json;charset=utf-8'
}

const getAuthHeader = (token) => {
  return {
    Authorization: `Token ${token}`
  }
}

const getEndpoint = (path) => {
  return [API_BASE, path].join('')
}

export const auth = (email, password) => {
  const data = {
    user: { email, password }
  }
  const endpoint = getEndpoint('/users/login')

  return fetch(endpoint, {
    method: 'POST',
    headers: { ...header },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => {
      return {
        authenticated: true,
        authInfo: data
      }
    })
}

export const getArticles = (offset = 0, limit = 10, tag = '') => {
  var params = [
    `offset=${offset}`,
    `limit=${limit}`
  ]

  if (tag) {
    params.push(`tag=${tag}`)
  }

  const endpoint = getEndpoint(`/articles?${params.join('&')}`)

  return fetch(endpoint, {
    headers: { ...header }
  }).then(response => response.json())
}

export const getArticle = (slug, token) => {
  const endpoint = getEndpoint(`/articles/${slug}`)

  var headers
  if (token) {
    headers = {
      ...header,
      ...getAuthHeader(token)
    }
  } else {
    headers = { ...header }
  }

  return fetch(endpoint, {
    headers
  }).then(response => response.json())
}

export const getComments = (slug, token) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments`)

  var headers
  if (token) {
    headers = {
      ...header,
      ...getAuthHeader(token)
    }
  } else {
    headers = { ...header }
  }

  return fetch(endpoint, {
    headers
  }).then(response => response.json())
}

export const getFeeds = (token, offset = 0, limit = 10) => {
  const endpoint = getEndpoint(`/articles/feed?limit=${limit}&offset=${offset}`)

  return fetch(endpoint, {
    headers: { ...header, ...getAuthHeader(token) }
  }).then(response => response.json())
}

export const getTags = () => {
  const endpoint = getEndpoint('/tags')

  return fetch(endpoint, {
    headers: { ...header }
  }).then(response => response.json())
}

export const register = (username, email, password) => {
  const endpoint = getEndpoint('/users')
  const data = {
    user: { username, email, password }
  }

  return fetch(endpoint, {
    method: 'POST',
    headers: { ...header },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => {
      return {
        registered: true,
        userInfo: data
      }
    })
}

export const favorite = (token, slug, isDelete) => {
  const endpoint = getEndpoint(`/articles/${slug}/favorite`)
  const method = isDelete ? 'DELETE' : 'POST'

  return fetch(endpoint, {
    method,
    headers: {
      ...header,
      ...getAuthHeader(token)
    }
  }).then(response => response.json())
}

export const follow = (token, username, isDelete) => {
  const endpoint = getEndpoint(`/profiles/${username}/follow`)
  const method = isDelete ? 'DELETE' : 'POST'

  return fetch(endpoint, {
    method,
    headers: {
      ...header,
      ...getAuthHeader(token)
    }
  }).then(response => response.json())
}

export const deleteComment = (token, slug, commentId) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments/${commentId}`)

  return fetch(endpoint, {
    method: 'DELETE',
    headers: {
      ...header,
      ...getAuthHeader(token)
    }
  }).then(response => response.json())
}

export const saveComment = (token, slug, comment) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments`)
  const data = {
    comment: {
      body: comment
    }
  }

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      ...header,
      ...getAuthHeader(token)
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

export const createArticle = (token, article) => {
  const endpoint = getEndpoint('/articles')
  const data = { article }

  return fetch(endpoint, {
    method: 'POST',
    headers: {
      ...header,
      ...getAuthHeader(token)
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

export const updateArticle = (token, slug, article) => {
  const endpoint = getEndpoint(`/articles/${slug}`)
  const data = { article }

  return fetch(endpoint, {
    method: 'PUT',
    headers: {
      ...header,
      ...getAuthHeader(token)
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
}

export const deleteArticle = (token, slug) => {
  const endpoint = getEndpoint(`/articles/${slug}`)

  return fetch(endpoint, {
    method: 'DELETE',
    headers: {
      ...header,
      ...getAuthHeader(token)
    }
  }).then(response => response.json())
}

export const getUser = async (token) => {
  const endpoint = getEndpoint('/user')

  const response = await fetch(endpoint, {
    headers: {
      ...header,
      ...getAuthHeader(token)
    }
  })

  const data = await response.json()

  return data
}
