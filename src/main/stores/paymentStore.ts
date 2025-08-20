import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import AsyncStorage from '@react-native-async-storage/async-storage'

// 🏦 Payment Store - Estado de pagos y transacciones
interface Transaction {
  id: string
  amount: number
  currency: string
  description: string
  type: 'payment' | 'transfer' | 'withdrawal'
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  timestamp: Date
  recipient?: string
  reference?: string
}

interface PaymentState {
  // Estado de pagos
  transactions: Transaction[]
  currentTransaction: Transaction | null
  isLoading: boolean
  error: string | null
  
  // Configuración de pagos
  defaultCurrency: string
  supportedCards: string[]
  maxAmount: number
  minAmount: number
  
  // Acciones
  addTransaction: (transaction: Transaction) => void
  updateTransaction: (id: string, updates: Partial<Transaction>) => void
  setCurrentTransaction: (transaction: Transaction | null) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  clearTransactions: () => void
  setPaymentConfig: (config: {
    defaultCurrency: string
    supportedCards: string[]
    maxAmount: number
    minAmount: number
  }) => void
}

export const usePaymentStore = create<PaymentState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      transactions: [],
      currentTransaction: null,
      isLoading: false,
      error: null,
      
      // Configuración por defecto
      defaultCurrency: 'ARS',
      supportedCards: ['Visa', 'Mastercard'],
      maxAmount: 100000,
      minAmount: 100,

      // Acciones
      addTransaction: (transaction: Transaction) => set((state) => ({
        transactions: [transaction, ...state.transactions]
      })),

      updateTransaction: (id: string, updates: Partial<Transaction>) => set((state) => ({
        transactions: state.transactions.map(t => 
          t.id === id ? { ...t, ...updates } : t
        )
      })),

      setCurrentTransaction: (transaction: Transaction | null) => set({ 
        currentTransaction: transaction 
      }),

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (error: string | null) => set({ error }),

      clearTransactions: () => set({ transactions: [] }),

      setPaymentConfig: (config) => set(config)
    }),
    {
      name: 'payment-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        defaultCurrency: state.defaultCurrency,
        supportedCards: state.supportedCards,
        maxAmount: state.maxAmount,
        minAmount: state.minAmount
      })
    }
  )
)

// 🎯 Hooks de conveniencia
export const useTransactions = () => usePaymentStore((state) => state.transactions)
export const useCurrentTransaction = () => usePaymentStore((state) => state.currentTransaction)
export const usePaymentLoading = () => usePaymentStore((state) => state.isLoading)
export const usePaymentError = () => usePaymentStore((state) => state.error)
export const usePaymentConfig = () => usePaymentStore((state) => ({
  defaultCurrency: state.defaultCurrency,
  supportedCards: state.supportedCards,
  maxAmount: state.maxAmount,
  minAmount: state.minAmount
}))
export const usePaymentActions = () => usePaymentStore((state) => ({
  addTransaction: state.addTransaction,
  updateTransaction: state.updateTransaction,
  setCurrentTransaction: state.setCurrentTransaction,
  setLoading: state.setLoading,
  setError: state.setError,
  clearTransactions: state.clearTransactions,
  setPaymentConfig: state.setPaymentConfig
}))
