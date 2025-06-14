import React from 'react'

import { Feather } from '@expo/vector-icons'
import { faCar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Text, TouchableOpacity, View } from 'react-native'
import colors from 'tailwindcss/colors'

import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  onBack?: () => void
  onShoppingCartPress?: () => void
}

export const Header: React.FC<HeaderProps> = ({ onBack }) => {
  const { signOut } = useAuth()

  console.log('Header component rendered', onBack)

  return (
    <View className="w-full h-[120px] bg-red-800" testID="header-component">
      <View className="px-2 flex-row justify-between items-center mt-[67px]">
        <View className="flex-row items-center p-2">
          {/* se for a tela home mostrar o icone de carro, caso contrário mostrar o icone de voltar */}
          {onBack ? (
            <TouchableOpacity onPress={onBack}>
              <Feather name="arrow-left" size={24} color={colors.white} />
            </TouchableOpacity>
          ) : (
            <FontAwesomeIcon icon={faCar} size={24} color={colors.white} />
          )}
        </View>

        <View className="flex-row items-center">
          <View>
            <Text className="text-white font-bold">
              {`Bem-vindo(a) ao app!`}
            </Text>
          </View>

          <View className="ml-1">
            <TouchableOpacity onPress={signOut} className="px-2">
              <Feather name="log-out" size={24} color={colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}
