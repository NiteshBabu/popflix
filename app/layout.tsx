import { Suspense } from 'react'
import Theme from '../common/Theme'
import '../global.css'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/authProvider'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <AuthProvider>
            <Navbar />
            <Suspense fallback="Fetching....">{children}</Suspense>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  )
}
