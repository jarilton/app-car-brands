import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { View } from 'react-native'

import { AppRoutes } from './app.routes'
import { AuthRoutes } from './auth.routes'

export const Routes = () => {
  const isAuthenticated = false

  return (
    <View className="flex-1 bg-blue-700">
      <NavigationContainer>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
    </View>
  )
}
