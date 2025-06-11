import React from 'react'

import { ActivityIndicator, View } from 'react-native'
import colors from 'tailwindcss/colors'

export const Loading = () => {
  return (
    <View
      className="flex-1 justify-center dark:bg-gray-800"
      testID="loading-component"
    >
      <ActivityIndicator size="large" color={colors.red[600]} />
    </View>
  )
}
