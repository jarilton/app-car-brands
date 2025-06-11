import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'

import { useAuth } from '../hooks/useAuth'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const { isAuthenticated, token } = useAuth()

  console.log('Routes component isAuthenticated:', isAuthenticated)
  console.log('Routes component token:', token)

  return (
    <View className="flex-1 bg-red-800">
      <NavigationContainer>
        {token && isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
