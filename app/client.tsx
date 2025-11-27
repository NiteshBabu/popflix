'use client'

import { Suspense } from 'react'
import Theme from '../common/Theme'
import FullSpinner from '../components/FullSpinner'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/authProvider'

function Client({ children }) {
	return (
		<Theme>
			<AuthProvider>
				<Navbar />
				<Suspense fallback={<FullSpinner />}>{children}</Suspense>
			</AuthProvider>
		</Theme>
	)
}

export default Client
