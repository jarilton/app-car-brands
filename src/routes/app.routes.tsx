import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Home } from '../screens/home'

export type RootStackParamList = {
  home: undefined
  whatNeed: undefined
  request: undefined
  sendSuccess: undefined
  suggestion: undefined
  complaint: undefined
  project: undefined
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" component={Home} />
    </Stack.Navigator>
  )
}
