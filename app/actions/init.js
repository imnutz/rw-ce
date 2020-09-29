import storage from '../storage'
import {
  STORAGE_USER_KEY
} from '../constants'

export const start = () => {
  return {
    starting: true,
    user: storage.getItem(STORAGE_USER_KEY)
  }
}

export const redirected = () => ({ redirected: true })

export const setPage = (page) => ({ page })
