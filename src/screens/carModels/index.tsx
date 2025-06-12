import React, { useCallback, useEffect, useState } from 'react'

import { useNavigation, useRoute } from '@react-navigation/native'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { apiCars } from '../../services/apiCars'

type RouteParams = {
  brand: {
    codigo: string
    nome: string
  }
}

type CarModel = {
  nome: string
  codigo: string
}

export const CarModels = () => {
  const route = useRoute()
  const { brand } = route.params as RouteParams

  const [loading, setLoading] = useState(false)
  const [models, setModels] = useState<CarModel[]>([])
  const navigation = useNavigation()

  const handleBack = () => {
    navigation.goBack()
  }

  const getCarModels = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await apiCars.get(`/marcas/${brand.codigo}/modelos`)
      setModels(data.modelos || []) // a API retorna modelos dentro de um objeto "modelos"
    } catch (error) {
      console.error('Error fetching models:', error)
      Toast.show({
        type: 'error',
        text1: 'Erro',
        text2: 'Falha ao carregar os modelos de veículos.',
      })
    } finally {
      setLoading(false)
    }
  }, [brand.codigo])

  useEffect(() => {
    getCarModels()
  }, [getCarModels])

  if (loading) {
    return (
      <>
        <Header />
        <Loading />
      </>
    )
  }

  return (
    <View className="flex-1 bg-gray-800">
      <Header onBack={handleBack} />
      <View className="flex-1 p-4">
        <Text className="text-white text-xl font-bold mb-4">
          Modelos da marca: {brand.nome}
        </Text>
        <FlatList
          data={models}
          keyExtractor={(item) => item.codigo}
          renderItem={({ item }) => (
            <TouchableOpacity className="p-4 mb-2 bg-gray-700 rounded">
              <Text className="text-white">{item.nome}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text className="text-white text-center">
              Nenhum modelo encontrado.
            </Text>
          }
        />
      </View>
    </View>
  )
}
