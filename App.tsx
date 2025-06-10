import React from 'react'

import './ReactotronConfig'
import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'

import { Routes } from './src/routes'

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <Routes />
      <Toast />
    </>
  )
}

export default App
