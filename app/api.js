const API_BASE = 'https://conduit.productionready.io/api'

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
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  }).then(response => response.json())
    .then(data => {
      return {
        authenticated: true,
        authInfo: data
      }
    })
}
