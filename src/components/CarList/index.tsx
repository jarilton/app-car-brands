import React from 'react'

import { FlatList, Image, Text, TouchableOpacity } from 'react-native'

import defaultLogo from '../../assets/sem-imagem.jpeg'
import { logoCars } from '../../utils/logoCars'
import { Loading } from '../Loading'

type CarBrand = {
  codigo: string
  nome: string
}

type ListCarsProps = {
  data: CarBrand[]
  onPress?: (brand: CarBrand) => void
}

const formatLogoUrl = (nome: string) => {
  // limpar variações de nome como GM - Chevrolet ou Caoa Chery/Chery
  const key = nome
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => s.replace(/.*-/, '').trim())[0]

  return logoCars[key]
}

export const CarList: React.FC<ListCarsProps> = ({ data, onPress }) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item) => item.codigo}
      contentContainerStyle={{ padding: 10 }}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => {
        const logoUri = formatLogoUrl(item.nome)
        return (
          <TouchableOpacity
            className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-md items-center"
            onPress={() => onPress?.(item)}
          >
            {!item.nome ? (
              <Loading />
            ) : (
              <Image
                source={logoUri ? { uri: logoUri } : defaultLogo}
                className="w-16 h-16 mb-2"
                style={{ resizeMode: 'contain' }}
              />
            )}
            <Text className="text-center text-base font-semibold">
              {item.nome}
            </Text>
          </TouchableOpacity>
        )
      }}
    />
  )
}
