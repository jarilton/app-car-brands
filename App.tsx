import React from 'react'

import './ReactotronConfig'
import 'react-native-gesture-handler'

import {
  Roboto_400Regular,
  Roboto_700Bold,
  useFonts,
} from '@expo-google-fonts/roboto'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { Loading } from './src/components/Loading'
import { AuthProvider } from './src/contexts/AuthContext'
import { Routes } from './src/routes'

const App = () => {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  })

  return (
    <AuthProvider>
      <StatusBar style="auto" />
      {fontsLoaded ? <Routes /> : <Loading />}
      <Toast />
    </AuthProvider>
  )
}

export default App
