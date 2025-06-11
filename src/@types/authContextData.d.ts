interface AuthContextData {
  token: string
  signIn(credentials: SignInCredentials): Promise<User>
  signOut: () => Promise<void>
  loading: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  isAuthenticated: boolean
}
