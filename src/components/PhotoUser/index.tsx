import React from 'react'

import { ActivityIndicator, Image } from 'react-native'
import colors from 'tailwindcss/colors'

interface PhotoUserProps {
  size: number
  source: { uri: string }
  loading?: boolean
}

export const PhotoUser: React.FC<PhotoUserProps> = ({
  size,
  source,
  loading,
  ...rest
}) => {
  if (loading) {
    return (
      <ActivityIndicator
        testID="user-photo-activity-indicator"
        style={{
          width: size,
          height: size,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: size / 2,
          borderWidth: 2,
          borderColor: colors.red[800],
        }}
        size="small"
        color={colors.red[800]}
      />
    )
  }

  return (
    <Image
      testID="user-photo-image"
      source={source}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 2,
        borderColor: 'transparent',
        ...rest,
      }}
    />
  )
}
