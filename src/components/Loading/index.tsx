import React from 'react'

import { ActivityIndicator, useColorScheme, View } from 'react-native'
import colors from 'tailwindcss/colors'

export const Loading = () => {
  const colorscheme = useColorScheme()

  return (
    <View
      className="flex-1 justify-center dark:bg-gray-800"
      testID="loading-component"
    >
      <ActivityIndicator
        size="large"
        color={colorscheme === 'dark' ? colors.white : colors.blue[600]}
      />
    </View>
  )
}
