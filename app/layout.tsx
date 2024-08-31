import Theme from '../common/Theme'
import '../global.css'
import Navbar from '../components/Navbar'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Navbar />
         {children}
        </Theme>
      </body>
    </html>
  )
}
