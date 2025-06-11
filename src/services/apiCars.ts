import { EXPO_PUBLIC_API_CARS } from '@env'
import axios from 'axios'

export const apiCars = axios.create({
  baseURL: EXPO_PUBLIC_API_CARS,
})
