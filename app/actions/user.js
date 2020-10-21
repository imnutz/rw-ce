import {
  auth,
  register,
  follow,
  getUser,
  updateUser,
  getProfileArticles,
  getProfile
} from '../api'

export const signin = async (email, password) => {
  const data = await auth(email, password)

  return { data }
}

export const signup = async (username, email, password) => {
  const data = await register(username, email, password)

  return { data }
}

export const setFollow = (username, following) => ({ username, following })

export const followUser = async (token, username, isDelete) => {
  const data = await follow(token, username, isDelete)

  return { followedProfile: data.profile }
}

export const fetchUser = async (token) => {
  const userData = await getUser(token)

  return {
    currentUser: userData.user
  }
}

export const logout = () => ({ isSignedOut: true })

export const setUserSettings = (newSettings) => ({ newSettings })
export const updateUserSettings = async (token, newSettings) => {
  const userData = await updateUser(token, newSettings)

  return { updatedUser: userData.user, settingErrors: userData.errors }
}

export const fetchProfileAndArticles = async (token, username) => {
  var promises = [
    getProfile(token, username),
    getProfileArticles({
      token,
      author: username
    })
  ]

  const [profileData, articlesData] = await Promise.all(promises)

  return {
    userProfile: profileData.profile,
    profileArticles: articlesData.articles,
    profileArticlesCount: articlesData.articlesCount
  }
}
