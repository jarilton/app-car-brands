import AsyncStorage from '@react-native-async-storage/async-storage'

import { TOKEN_STORAGE } from '../storageConfig'

export const storageTokenSave = async (token: string) => {
  try {
    await AsyncStorage.setItem(TOKEN_STORAGE, token)

    console.log('Token salvo com sucesso:', token)
  } catch (error) {
    console.error('Erro ao salvar o token', error)
  }
}

export const storageTokenGet = async () => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_STORAGE)

    console.log('Token obtido:', token)

    return token
  } catch (error) {
    console.error('Erro ao obter o token', error)
  }
}

export const storageTokenRemove = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_STORAGE)
  } catch (error) {
    console.error('Erro ao remover o token', error)
  }
}
