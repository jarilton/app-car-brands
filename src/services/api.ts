import { EXPO_PUBLIC_API_URL } from '@env'
import axios from 'axios'

export const api = axios.create({
  baseURL: EXPO_PUBLIC_API_URL,
})
