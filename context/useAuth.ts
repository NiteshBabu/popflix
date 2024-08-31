'use client'
import { useContext } from 'react'
import { AuthContext } from './authProvider'

export const useAuth = (): any => useContext(AuthContext)
