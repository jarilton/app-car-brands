import React from 'react'

import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export const Home = () => {
  return (
    <View className="flex-1  bg-blue-700">
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
            <TouchableOpacity
              className="bg-white rounded-full px-10 py-3 mb-4"
              onPress={() => console.log('Navigate to What Need')}
            >
              <Text className="text-blue-700 text-lg font-bold">
                Ver Carros
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
