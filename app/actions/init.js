import storage from '../storage'
import {
  STORAGE_USER_KEY
} from '../constants'

export const redirected = () => ({ redirected: true })

export const setPage = (page, options) => {
  return {
    page,
    user: storage.getItem(STORAGE_USER_KEY),
    ...options
  }
}
