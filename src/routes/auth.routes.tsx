import React from 'react'

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

import { SignIn } from '../screens/signIn'

type AuthRoutesProps = {
  signIn: undefined
}

export type AuthNavigatorRoutesProps =
  NativeStackNavigationProp<AuthRoutesProps>

const Stack = createNativeStackNavigator<AuthRoutesProps>()

export const AuthRoutes = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      <Stack.Screen name="signIn" children={() => <SignIn />} />
    </Stack.Navigator>
  )
}
