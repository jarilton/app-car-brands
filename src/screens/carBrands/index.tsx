import React, { useCallback, useEffect } from 'react'

import { useNavigation } from '@react-navigation/native'
import { Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { CarList } from '../../components/CarList'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { apiCars } from '../../services/apiCars'

type CarBrand = {
  codigo: string
  nome: string
}

export const CarBrands = () => {
  const [brands, setBrands] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const navigation = useNavigation()

  const handleCarModels = useCallback((brand: CarBrand) => {
    navigation.navigate('carModels', {
      brand,
    })
  }, [])

  const getBrands = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await apiCars.get('/marcas')

      setBrands(data)
    } catch (error) {
      console.error('Error fetching brands:', error)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load car brands.',
      })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getBrands()
  }, [])

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
      <Header />
      <View className="p-4">
        <Text className="text-white text-2xl mb-4">Marcas de Veículos</Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <CarList
          data={brands}
          onPress={(brand) => {
            handleCarModels(brand)
          }}
        />
      </View>
    </View>
  )
}
