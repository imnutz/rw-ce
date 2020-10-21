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

const getHeaders = (token) => {
  var headers = { ...header }

  if (token) {
    headers = { ...headers, ...getAuthHeader(token) }
  }

  return headers
}

// HTTP methods helper
const get = async (endpoint, token) => {
  const response = await fetch(endpoint, {
    headers: getHeaders(token)
  })

  return await response.json()
}

const post = async (endpoint, token, data) => {
  const options = {
    method: 'POST',
    headers: getHeaders(token)
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(endpoint, options)

  return await response.json()
}

const purge = async (endpoint, token) => {
  const response = await fetch(endpoint, {
    method: 'DELETE',
    headers: getHeaders(token)
  })

  return await response.json()
}

const update = async (endpoint, token, data) => {
  const options = {
    method: 'PUT',
    headers: getHeaders(token)
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  const response = await fetch(endpoint, options)

  return await response.json()
}

// APIs
export const auth = async (email, password) => {
  const userInfo = {
    user: { email, password }
  }
  const endpoint = getEndpoint('/users/login')

  const data = await post(endpoint, null, userInfo)

  return {
    authenticated: true,
    authInfo: data
  }
}

export const getArticles = async (offset = 0, limit = 10, tag = '') => {
  var params = [
    `offset=${offset}`,
    `limit=${limit}`
  ]

  if (tag) {
    params.push(`tag=${tag}`)
  }

  const endpoint = getEndpoint(`/articles?${params.join('&')}`)

  return get(endpoint)
}

export const getProfileArticles = async (config) => {
  const {
    token,
    offset = 0,
    limit = 10,
    author,
    favorited
  } = config

  var params = [
    `offset=${offset}`,
    `limit=${limit}`
  ]

  if (author) {
    params.push(`author=${author}`)
  }

  if (favorited) {
    params.push(`favorited=${favorited}`)
  }

  const endpoint = getEndpoint(`/articles?${params.join('&')}`)

  return await get(endpoint, token)
}

export const getArticle = async (slug, token) => {
  const endpoint = getEndpoint(`/articles/${slug}`)

  return get(endpoint, token)
}

export const getComments = async (slug, token) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments`)

  return await get(endpoint, token)
}

export const getFeeds = async (token, offset = 0, limit = 10) => {
  const endpoint = getEndpoint(`/articles/feed?limit=${limit}&offset=${offset}`)

  return await get(endpoint, token)
}

export const getTags = async () => {
  const endpoint = getEndpoint('/tags')

  return await get(endpoint)
}

export const register = async (username, email, password) => {
  const endpoint = getEndpoint('/users')
  const userInfo = {
    user: { username, email, password }
  }

  const data = await post(endpoint, null, userInfo)

  return {
    registered: true,
    userInfo: data
  }
}

export const favorite = async (token, slug, isDelete) => {
  const endpoint = getEndpoint(`/articles/${slug}/favorite`)

  if (isDelete) {
    return await purge(endpoint, token)
  }

  return await post(endpoint, token)
}

export const follow = async (token, username, isDelete) => {
  const endpoint = getEndpoint(`/profiles/${username}/follow`)

  if (isDelete) {
    return await purge(endpoint, token)
  }

  return await post(endpoint, token)
}

export const deleteComment = async (token, slug, commentId) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments/${commentId}`)

  return await purge(endpoint, token)
}

export const saveComment = async (token, slug, comment) => {
  const endpoint = getEndpoint(`/articles/${slug}/comments`)
  const data = {
    comment: {
      body: comment
    }
  }

  return await post(endpoint, token, data)
}

export const createArticle = async (token, article) => {
  const endpoint = getEndpoint('/articles')
  const data = { article }

  return await post(endpoint, token, data)
}

export const updateArticle = async (token, slug, article) => {
  const endpoint = getEndpoint(`/articles/${slug}`)
  const data = { article }

  return await update(endpoint, token, data)
}

export const deleteArticle = async (token, slug) => {
  const endpoint = getEndpoint(`/articles/${slug}`)

  return await purge(endpoint, token)
}

export const getUser = async (token) => {
  const endpoint = getEndpoint('/user')

  return await get(endpoint, token)
}

export const updateUser = async (token, user) => {
  const endpoint = getEndpoint('/user')
  const data = { user }

  return await update(endpoint, token, data)
}

export const getProfile = async (token, username) => {
  const endpoint = getEndpoint(`/profiles/${username}`)

  return await get(endpoint, token)
}
