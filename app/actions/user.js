import { auth } from '../api'

export const signin = (email, password) => {
  return auth(email, password).then(data => ({ data }))
}
