import React, { useCallback, useEffect } from 'react'

import { View } from 'react-native'
import Toast from 'react-native-toast-message'

import { CarList } from '../../components/CarList'
import { Header } from '../../components/Header'
import { Loading } from '../../components/Loading'
import { apiCars } from '../../services/apiCars'

export const Home = () => {
  const [brands, setBrands] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const getBrands = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await apiCars.get('/marcas')

      console.log('Brands data:', JSON.stringify(data, null, 2))

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
      <View className="flex-1 justify-center items-center">
        {/* lista de cards para mostrar os carros */}
        <CarList
          data={brands}
          onPress={(brand) => {
            console.log('Selected brand:', brand)
            Toast.show({
              type: 'success',
              text1: 'Brand Selected',
              text2: `You selected ${brand.nome}`,
            })
          }}
        />
      </View>
    </View>
  )
}
