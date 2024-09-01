import { useAuth } from '../../context/useAuth'
import { redirect } from 'next/navigation'

function Protected(Component) {
  return function isProtected(props) {
    const { user } = useAuth()
    if (!user) redirect('/')
    return <Component {...props} />
  }
}

export default Protected
