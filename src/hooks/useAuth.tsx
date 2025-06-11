import { useContext } from 'react'

import { AuthContext } from '../contexts/AuthContext'

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('The hook useAuth must be used within an AuthProvider')
  }

  return context
}
