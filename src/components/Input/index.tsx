import React, { useEffect, useRef, useState } from 'react'

import { Ionicons } from '@expo/vector-icons'
import { Animated, Easing, Text, TextInput, View } from 'react-native'
import { TextInputMask } from 'react-native-masked-text'
import colors from 'tailwindcss/colors'

type InputType =
  | 'text'
  | 'password'
  | 'date'
  | 'datetime'
  | 'time'
  | 'document'
  | 'email'
  | 'number'
  | 'search'
  | 'tel'
  | 'url'

const typeToIcon: Record<InputType, string> = {
  password: 'lock-closed',
  email: 'mail',
  document: 'document-text',
  date: 'calendar',
  datetime: 'calendar',
  time: 'time',
  number: 'calculator',
  search: 'search',
  tel: 'call',
  url: 'link',
  text: '',
}

interface InputProps extends React.ComponentPropsWithRef<typeof TextInput> {
  label: string
  value: string | undefined
  onChangeText: (text: string) => void
  onBlur?: () => void
  onFocus?: () => void
  normalize?: (value: string) => string
  placeholder?: string
  isRequired?: boolean
  type?: InputType
  style?: any
  message?: string | boolean
  maxLength?: number | undefined
  disabled?: boolean
  mask?: string
  ref?: any
  useFloatingLabel?: boolean
  noBorder?: boolean
  multiline?: boolean
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChangeText,
  onBlur,
  onFocus,
  normalize,
  placeholder,
  isRequired,
  type = 'text',
  style,
  message,
  maxLength,
  disabled,
  mask,
  ref,
  useFloatingLabel = false,
  noBorder = false,
  multiline = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const animatedValue = useRef(new Animated.Value(0)).current

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }

  const normalizeValue = (value: any) => {
    if (normalize) {
      return normalize(value)
    }
    return value
  }

  const handleFocus = () => {
    setIsFocused(true)
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()

    if (onFocus) {
      onFocus()
    }
  }

  const handleBlur = () => {
    setIsFocused(false)
    Animated.timing(animatedValue, {
      toValue: inputText ? 1 : 0,
      duration: 200,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start()

    if (onBlur) {
      onBlur()
    }
  }

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -18],
  })

  const inputText = type === 'email' ? value?.toLowerCase() : value

  useEffect(() => {
    if (value && value !== '') {
      handleFocus()
    }

    if (value === '') {
      handleBlur()
    }
  }, [value])

  return (
    <View className="w-full">
      <View className="flex-row items-center mt-2 z-10">
        {useFloatingLabel &&
          !label &&
          ((isFocused !== undefined && isFocused) ||
            (value !== undefined && value !== '')) && (
            <Animated.Text
              className={`text-white text-base absolute top-${translateY} left-[16px] bg-gray-800 px-2 z-20`}
            >
              {placeholder}
            </Animated.Text>
          )}

        {label && (
          <Text
            className={`text-gray-200 text-base ${!isRequired ? 'mb-1' : ''}`}
          >
            {label}
          </Text>
        )}
        {isRequired && <Text className="text-red-500 text-xl mx-1">*</Text>}
      </View>
      <View className="relative">
        {mask ? (
          <TextInputMask
            testID="toggle-password-visibility"
            type={'custom'}
            options={{
              mask,
            }}
            className={`border-2 text-gray-200 bg-gray-800 border-gray-200 px-[10px] h-12 rounded-md focus:border-red-800  ${
              message ? 'border-red-500' : ''
            }`}
            placeholder={useFloatingLabel && isFocused ? '' : placeholder}
            placeholderTextColor={colors.gray[200]}
            value={inputText}
            onChangeText={onChangeText}
            onBlur={handleBlur}
            onFocus={handleFocus}
            secureTextEntry={type === 'password' && !showPassword}
            maxLength={mask.length}
            editable={!disabled}
            refInput={ref}
          />
        ) : (
          <TextInput
            testID="toggle-password-visibility"
            className={`
            ${
              noBorder ? 'border-0' : 'border-2'
            } text-gray-200 bg-gray-800 border-gray-200 h-12 rounded-md focus:border-red-800   ${
              message && typeToIcon[type]
                ? 'border-red-500 pl-8'
                : typeToIcon[type]
                ? 'pl-8'
                : message && !typeToIcon[type]
                ? 'border-red-500 px-[10px]'
                : 'px-[10px]'
            }`}
            placeholder={useFloatingLabel && isFocused ? '' : placeholder}
            placeholderTextColor={colors.gray[200]}
            value={inputText ? normalizeValue(inputText) : ''}
            onChangeText={onChangeText}
            onBlur={handleBlur}
            onFocus={handleFocus}
            secureTextEntry={type === 'password' && !showPassword}
            style={[
              style,
              multiline
                ? {
                    height: 170,
                    textAlignVertical: 'top',
                    paddingTop: 20,
                    paddingLeft: 20,
                    lineHeight: 25,
                  }
                : {},
            ]}
            multiline={multiline}
            maxLength={maxLength}
            editable={!disabled}
            {...rest}
          />
        )}
        {type === 'password' && (
          <View
            className="absolute top-0 right-0 bottom-0 flex items-center justify-center pr-2"
            onTouchEnd={togglePasswordVisibility}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color={showPassword ? colors.red[800] : colors.gray[400]}
            />
          </View>
        )}
        {typeToIcon[type] && (
          <View className="absolute top-0 left-2 bottom-0 flex items-center justify-center pointer-events-none">
            <Ionicons
              name={typeToIcon[type] as any}
              size={20}
              color={colors.gray[400]}
            />
          </View>
        )}
      </View>
      {message && <Text className="text-red-500 text-sm">{message}</Text>}
    </View>
  )
}
