import React, {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'

import Toast from 'react-native-toast-message'

import { Loading } from '../components/Loading'
import { api } from '../services/api'
import {
  storageRememberMeGet,
  storageRememberMeGetCredentials,
  storageRememberMeRemove,
  storageRememberMeSave,
} from '../storage/rememberMe/storageRememberMe'
import {
  storageTokenGet,
  storageTokenRemove,
  storageTokenSave,
} from '../storage/token/storageToken'

interface AuthResponse {
  user: {
    id: number
    name: string
    token: string
  }
}

interface AuthState {
  token: string
}

interface SignInCredentials {
  user: string
  password: string
  rememberMe?: boolean
}

interface AuthContextProvider {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider = ({ children }: AuthContextProvider) => {
  const [data, setData] = useState<AuthState>({} as AuthState)
  const [loadingStorageData, setLoadingStorageData] = useState(true)
  const [loading, setLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signIn = useCallback(
    async ({ user, password, rememberMe }: SignInCredentials) => {
      console.log('**********')
      console.log('chegando aqui', { user, password })
      console.log('**********')
      setLoading(true)

      try {
        const { data } = await api.post<AuthResponse>('/signIn', {
          user,
          password,
        })

        console.log('**********')
        console.log('signIn do contexto', JSON.stringify(data, null, 2))
        console.log('**********')

        if (rememberMe) {
          await storageRememberMeSave(rememberMe, user, password)
        } else {
          await storageRememberMeRemove()
        }

        setData({ token: data.user.token })
        setIsAuthenticated(true)
        await storageTokenSave(data.user.token)
      } catch (error) {
        console.log('erro aqui', error)

        Toast.show({
          type: 'error',
          text1: 'Usuário e/ou senha incorretos',
          visibilityTime: 8000,
          topOffset: 60,
        })

        throw new Error('Authentication failed.')
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const signOut = async () => {
    try {
      setLoadingStorageData(true)
      await storageTokenRemove()
      setIsAuthenticated(false)
      setData({} as AuthState)
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingStorageData(false)
    }
  }

  const loadRememberMe = async () => {
    try {
      const rememberMe = await storageRememberMeGet()

      if (rememberMe) {
        return true
      }

      if (rememberMe === 'true') {
        const { user, password } = await storageRememberMeGetCredentials()

        if (user && password) {
          signIn({ user, password, rememberMe: true })
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadRememberMe()
  }, [])

  useEffect(() => {
    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          Toast.show({
            type: 'error',
            text1: 'Você está deslogado, entre novamente',
          })
          // signOut();
        } else if (error?.response?.status === 403) {
          Toast.show({
            type: 'error',
            text1: 'Você não tem permissão à este recurso',
          })
        } else if (error?.response?.status === 400) {
          Toast.show({
            type: 'error',
            text1: error?.response?.data?.message,
          })
        } else if (error?.response?.status === 404) {
          Toast.show({
            type: 'error',
            text1: error?.response?.data?.message,
          })
        } else if (error?.response?.status === 422) {
          error?.response.data.errors.forEach((d: any) => {
            Toast.show({
              type: 'error',
              text1: d.message,
            })
          })
        } else if (error?.response?.status === 500) {
          Toast.show({
            type: 'error',
            text1:
              'Ocorreu um erro inesperado em nosso sistema, contate o suporte',
          })
        } else if (error?.response?.status === 502) {
          Toast.show({
            type: 'error',
            text1: 'Sistema fora do ar, contate o suporte',
          })
        }

        return Promise.reject(error.response)
      },
    )
  }, [])

  useEffect(() => {
    async function loadStorageData() {
      setLoadingStorageData(true)

      const token = await storageTokenGet()

      if (token) {
        setData({ token })
        setIsAuthenticated(true)
      }

      setLoadingStorageData(false)
    }

    loadStorageData()
  }, [])

  if (loadingStorageData) {
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        signIn,
        signOut,
        loading,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
