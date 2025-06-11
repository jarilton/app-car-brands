import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  REMEMBERME_PASSWORD,
  REMEMBERME_STORAGE,
  REMEMBERME_USER,
} from '../storageConfig'

export const storageRememberMeSave = async (
  rememberMe: boolean,
  user?: string,
  password?: string,
) => {
  await AsyncStorage.setItem(REMEMBERME_STORAGE, JSON.stringify(rememberMe))
  if (user && password) {
    await AsyncStorage.setItem(REMEMBERME_USER, user)
    await AsyncStorage.setItem(REMEMBERME_PASSWORD, password)
  }
}

export const storageRememberMeGet = async () => {
  const RememberMe = await AsyncStorage.getItem(REMEMBERME_STORAGE)

  return RememberMe
}

export const storageRememberMeGetCredentials = async () => {
  const user = await AsyncStorage.getItem(REMEMBERME_USER)
  const password = await AsyncStorage.getItem(REMEMBERME_PASSWORD)

  return { user, password }
}

export const storageRememberMeRemove = async () => {
  const rememberMe = await AsyncStorage.removeItem(REMEMBERME_STORAGE)
  const rememberuser = await AsyncStorage.removeItem(REMEMBERME_USER)
  const rememberPassword = await AsyncStorage.removeItem(REMEMBERME_PASSWORD)

  return { rememberMe, rememberuser, rememberPassword }
}
