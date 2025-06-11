import React, { useEffect, useState } from 'react'

import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { RectButtonProps } from 'react-native-gesture-handler'
import colors from 'tailwindcss/colors'

import { Loading } from '../Loading'

interface Props extends RectButtonProps {
  title: string
  color?: string
  bgColor?: string
  loading?: boolean
  text?: string
  light?: boolean
  onPress: () => void
  enabled?: boolean
  outlined?: boolean
  disabled?: boolean
  icon?: IconProp
}

export const Button = ({
  title,
  onPress,
  loading = false,
  text,
  outlined = false,
  disabled = false,
  bgColor,
  icon,
  ...rest
}: Props) => {
  const [loadingButton, setLoadingButton] = useState(false)

  useEffect(() => {
    if (loading) {
      setLoadingButton(true)
    } else {
      const timer = setTimeout(() => {
        setLoadingButton(false)
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [loading])

  if (loadingButton) {
    return <Loading />
  }

  return (
    <>
      <TouchableOpacity
        testID="test-id-for-disabled-button"
        className={`${
          outlined
            ? 'bg-gray-800 border-red-800 dark:border-white border-2 h-[50px] items-center justify-center rounded-lg'
            : `${
                bgColor || 'bg-red-800'
              } h-[50px] items-center justify-center rounded-lg`
        } ${loading || disabled ? 'opacity-50' : ''} w-full`}
        onPress={onPress}
        disabled={disabled || loading}
        style={outlined ? {} : { backgroundColor: bgColor || colors.red[800] }}
        {...rest}
      >
        {loading && text ? (
          <View className="flex-row gap-2">
            <ActivityIndicator color={colors.white} size="small" />
            <Text testID="test-id-for-loading-button" className="text-white">
              {text}
            </Text>
          </View>
        ) : loading ? (
          <ActivityIndicator color={colors.white} size="small" />
        ) : (
          <View className="flex-row gap-2 items-center justify-center">
            {icon && (
              <FontAwesomeIcon
                icon={icon}
                size={24}
                color={outlined ? colors.red[800] : colors.white}
              />
            )}
            <Text
              testID="test-id-for-outlined-button"
              className={`${
                outlined ? 'text-red-800 dark:text-white' : 'text-white'
              } text-lg font-bold p-2`}
            >
              {title}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    </>
  )
}
