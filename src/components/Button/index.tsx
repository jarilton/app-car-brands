import React from 'react'

import { ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

interface Props extends RectButtonProps {
  title: string
  bgColor?: string
  loading?: boolean
  light?: boolean
  onPress: () => void
  enabled?: boolean
  outlined?: boolean
  disabled?: boolean
}

export const Button = ({
  title,
  bgColor,
  onPress,
  loading = false,
  outlined = false,
  disabled = false,
  ...rest
}: Props) => {
  return (
    <>
      <TouchableOpacity
        testID="test-id-for-disabled-button"
        className={`${
          outlined
            ? 'bg-white  border-blue-800 border-2 h-[70px] items-center justify-center rounded-3xl'
            : `${
                bgColor || 'bg-blue-800'
              } h-[70px] items-center justify-center rounded-3xl`
        } ${loading || disabled ? 'opacity-50' : ''} w-full`}
        onPress={onPress}
        disabled={disabled || loading}
        {...rest}
      >
        {loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <Text
            testID="test-id-for-outlined-button"
            className={`${
              outlined ? 'text-blue-800' : 'text-white'
            } text-lg font-bold p-2`}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </>
  )
}
