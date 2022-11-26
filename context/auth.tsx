import * as React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AUTH_STATE_KEY } from '../constants/constants'

export interface IAuthState {
  token: string
}

export interface IAuthContext {
  authState?: IAuthState
  login: (authData: IAuthState) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = React.createContext<IAuthContext | null>(null)

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = React.useState<IAuthState | undefined>(
    undefined,
  )

  async function login(authData: IAuthState) {
    try {
      await AsyncStorage.setItem(AUTH_STATE_KEY, JSON.stringify(authData))
      setAuthState((_) => authData)
    } catch (e) {
      Promise.reject(e)
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem(AUTH_STATE_KEY)
      setAuthState((_) => undefined)
    } catch (e) {
      Promise.reject(e)
    }
  }

  async function getAuthState() {
    try {
      const authDataString = await AsyncStorage.getItem(AUTH_STATE_KEY)
      if(!authDataString) throw new Error()
      setAuthState((_) => JSON.parse(authDataString))
    } catch (e) {
      setAuthState(undefined)
    }
  }

  React.useEffect(() => {
    getAuthState()
  }, [])

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('auth context must be used within a AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
