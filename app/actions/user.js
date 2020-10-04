import { auth, register, follow } from '../api'

export const signin = (email, password) => {
  return auth(email, password).then(data => ({ data }))
}

export const signup = (username, email, password) => {
  return register(username, email, password).then(data => ({ data }))
}

export const setFollow = (username, following) => ({ username, following })

export const followUser = (token, username, isDelete) => {
  return follow(token, username, isDelete).then(data => ({ followedProfile: data.profile }))
}
