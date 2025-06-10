import React, { useEffect, useState } from 'react'

import { yupResolver } from '@hookform/resolvers/yup'
import { RouteProp, useRoute } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Controller, useForm } from 'react-hook-form'
import {
  Image,
  Keyboard,
  Platform,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import colors from 'tailwindcss/colors'
import * as yup from 'yup'

import { Button } from '../../components/Button'
import { Input } from '../../components/Input'
import { Loading } from '../../components/Loading'

interface IFormData {
  email: string
  password: string
}

interface SignInRouteParams {
  token: string
}

type SignInRouteProp = RouteProp<{ params: SignInRouteParams }, 'params'>

export const SignIn = () => {
  const route = useRoute<SignInRouteProp>()
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [storageEmail, setStorageEmail] = useState('')
  const [storagePassword, setStoragePassword] = useState('')

  const colorScheme = useColorScheme()

  const schema = yup.object({
    email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
    password: yup
      .string()
      .required('Senha obrigatória')
      .min(6, 'Senha deve ter no mínimo 6 caracteres'),
  })

  const { control, handleSubmit, setValue } = useForm<IFormData>({
    resolver: yupResolver(schema),
  })

  // const handleForgotPassword = () => {
  //   navigation.navigate('forgotPassword')
  // }

  // const handleSignUp = () => {
  //   navigation.navigate('signUp')
  // }

  const onSubmit = async (data: IFormData) => {
    try {
      setLoading(true)

      console.log('Dados do formulário:', data)

      Toast.show({
        type: 'success',
        text1: 'Login realizado com sucesso!',
        text2: 'Seja bem-vindo(a)!',
        topOffset: 60,
      })
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleCheckboxChange = async () => {
    const newRememberMe = !rememberMe
    setRememberMe(newRememberMe)

    if (newRememberMe) {
      // Armazena os dados no AsyncStorage ou em outro local seguro
    } else {
      setStorageEmail('')
      setStoragePassword('')
    }

    if (newRememberMe) {
      setStorageEmail(storageEmail || '')
      setStoragePassword(storagePassword || '')
    }
  }

  useEffect(() => {
    const handleToken = async () => {
      if (route.params?.token) {
        const { token } = route.params
        console.log('Token recebido:', token)

        // Aqui você pode fazer algo com o token, como armazená-lo ou usá-lo para autenticação
        // Por exemplo, você pode armazenar o token no AsyncStorage ou no estado global
      }
    }

    handleToken()
  }, [route.params])

  useEffect(() => {
    if (rememberMe && storageEmail) {
      setValue('email', storageEmail)
      setValue('password', storagePassword)
    }

    if (!rememberMe) {
      setValue('email', '')
      setValue('password', '')
    }
  }, [rememberMe, storageEmail, storagePassword, setValue])

  useEffect(() => {
    const loadRememberMeData = async () => {
      // Aqui você pode carregar os dados de e-mail e senha armazenados
    }
    loadRememberMeData()
  }, [])

  if (loading) {
    return <Loading />
  }

  const logo = require('../../assets/car-red.png')

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 justify-center py-10 bg-gray-800 relative">
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
          }}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
        >
          <StatusBar style="auto" />
          <View className="flex justify-center items-center">
            <Image
              // source={!isEmpty(logoUri) ? { uri: logoUri } : imagemDefault}
              source={logo}
              className="w-80 h-24 mb-4"
              resizeMode="contain"
            />

            <Text className="text-gray-800 dark:text-white font-bold text-[23px]">
              Acesse sua conta
            </Text>
          </View>
          <View className="p-8 bg-white dark:bg-gray-800">
            <View className="mb-5">
              <Controller
                name="email"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label=""
                    placeholder="E-mail"
                    type="email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    useFloatingLabel
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    message={error ? error.message : ''}
                  />
                )}
              />
            </View>

            <View className="mb-2">
              <Controller
                name="password"
                control={control}
                render={({
                  field: { onChange, onBlur, value },
                  fieldState: { error },
                }) => (
                  <Input
                    label=""
                    placeholder="Senha"
                    type="password"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    useFloatingLabel
                    message={error ? error.message : ''}
                  />
                )}
              />
            </View>

            <View className="flex flex-row justify-between items-center">
              <View className="flex-row items-center">
                <Switch
                  value={rememberMe}
                  onValueChange={handleCheckboxChange}
                  trackColor={{
                    false: colors.gray[200],
                    true: colors.green[500],
                  }}
                  thumbColor={rememberMe ? colors.gray[300] : colors.gray[300]}
                  ios_backgroundColor="#3e3e3e"
                />
                <Text
                  className={`${'text-gray-900 dark:text-white '} ${
                    Platform.OS === 'ios' ? 'ml-2' : 0
                  }`}
                >
                  Lembrar-me
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.6}
                // onPress={handleForgotPassword}
              >
                <Text
                  className={`${
                    colorScheme === 'dark' ? 'text-blue-400' : 'text-blue-800'
                  }`}
                >
                  Esqueceu a senha?
                </Text>
              </TouchableOpacity>
            </View>

            <View className="mt-5">
              <Button
                title="ENTRAR"
                onPress={handleSubmit(onSubmit)}
                loading={loading}
                text="Entrando... aguarde!"
                style={{ marginTop: 10 }}
                disabled={loading}
                bgColor="bg-red-800"
              />
            </View>

            <View className="flex justify-center flex-row mt-5">
              <Text className="text-gray-900 dark:text-white">
                Não tem uma conta?
              </Text>
              <TouchableOpacity
                activeOpacity={0.6}
                className="ml-2"
                // onPress={handleSignUp}
              >
                <Text
                  className={`${
                    colorScheme === 'dark' ? 'text-blue-400' : 'text-blue-800'
                  }`}
                >
                  Cadastre-se
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  )
}
