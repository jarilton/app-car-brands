import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { CarBrands } from '../screens/carBrands'
import { CarModels } from '../screens/carModels'

export type RootStackParamList = {
  carBrands: undefined
  carModels: {
    brand: {
      codigo: string
      nome: string
    }
  }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="carBrands" component={CarBrands} />
      <Stack.Screen name="carModels" component={CarModels} />
    </Stack.Navigator>
  )
}
