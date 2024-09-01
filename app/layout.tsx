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
              {children}
          </AuthProvider>
        </Theme>
      </body>
    </html>
  )
}
