import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 🏦 User Store - Estado del usuario autenticado
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  documentNumber?: string
}

interface UserState {
  // Estado del usuario
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
  
  // Acciones
  login: (user: User, token: string) => void
  logout: () => void
  updateUser: (updates: Partial<User>) => void
  setLoading: (loading: boolean) => void
  refreshToken: (token: string) => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,
      isLoading: false,
      token: null,

      // Acciones
      login: (user: User, token: string) => set({
        user,
        isAuthenticated: true,
        token,
        isLoading: false
      }),

      logout: () => set({
        user: null,
        isAuthenticated: false,
        token: null,
        isLoading: false
      }),

      updateUser: (updates: Partial<User>) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      refreshToken: (token: string) => set({ token })
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        token: state.token
      })
    }
  )
)

// 🎯 Hooks de conveniencia
export const useUser = () => useUserStore((state) => state.user)
export const useIsAuthenticated = () => useUserStore((state) => state.isAuthenticated)
export const useUserLoading = () => useUserStore((state) => state.isLoading)
export const useUserActions = () => useUserStore((state) => ({
  login: state.login,
  logout: state.logout,
  updateUser: state.updateUser,
  setLoading: state.setLoading,
  refreshToken: state.refreshToken
}))
