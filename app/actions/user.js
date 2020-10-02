import { auth, register } from '../api'

export const signin = (email, password) => {
  return auth(email, password).then(data => ({ data }))
}

export const signup = (username, email, password) => {
  return register(username, email, password).then(data => ({ data }))
}
