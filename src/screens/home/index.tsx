import React from 'react'

import { ScrollView, Text, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { Button } from '../../components/Button'
import { Header } from '../../components/Header'

export const Home = () => {
  return (
    <View className="flex-1 bg-gray-800">
      <Header />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
        }}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={false}
      >
        <View className="flex-1 justify-center items-center">
          <View>
            <Text className="text-white text-2xl mx-10 mt-4 mb-10 text-center">
              Aplicativo de Carros{' '}
            </Text>
          </View>

          <View>
            <Text className="text-white text-2xl mx-10 mt-4 mb-10 text-center">
              Tela inicial
            </Text>
          </View>

          <View>
            <Button
              title="Ver Carros"
              onPress={() => {
                Toast.show({
                  type: 'success',
                  text1: 'Carros',
                  text2: 'Carros clicado com sucesso!',
                })
              }}
              bgColor="bg-red-800"
              outlined
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
