'use client'
import Theme from '../common/Theme'
import '../global.css'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/authProvider'
import { Suspense } from 'react'
import FullSpinner from '../components/FullSpinner'
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
            <Suspense fallback={<FullSpinner />}>{children}</Suspense>
          </AuthProvider>
        </Theme>
      </body>
    </html>
  )
}
