'use client'
import { useEffect } from 'react'
import { useAuth } from '../../context/useAuth'
import { redirect } from 'next/navigation'

function Protected(Component) {
  return function isProtected(props) {
    const { user } = useAuth()
    
    useEffect(() => {
      if (!user) redirect('/')
    }, [user])

    if (!user) return null

    return <Component {...props} />
  }
}

export default Protected
