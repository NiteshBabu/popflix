'use client'
import { createContext, useEffect, useState } from 'react'
import { auth } from '../services/firebase'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import { useToast } from '@chakra-ui/react'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToast()

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider).then(() => {
      toast({
        title: 'Login',
        description: 'Logged In Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      })
    })
  }

  const logout = () => {
    return signOut(auth).then(() => {
      toast({
        title: 'Logout',
        description: 'Logged Out Successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
      })
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
      setIsLoading(false)
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
