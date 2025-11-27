'use client'
import { Suspense } from 'react'
import Theme from '../common/Theme'
import FullSpinner from '../components/FullSpinner'
import Navbar from '../components/Navbar'
import { AuthProvider } from '../context/authProvider'
import '../global.css'

export const metadata = {
	title: 'Popflix By NiteshBabu',
	description:
		'Popflix is a Netflix/IMDB-style clone that lets you browse what’s trending today or this week, search for movies and shows, watch trailers, explore cast details, manage your watchlist, and much more, all in one sleek interface.',
	keywords: ['developer', 'software engineer'],
	icons: {
		icon: '/favicon.ico',
	},
	openGraph: {
		title: 'Popflix By NiteshBabu',
		description:
			'Popflix is a Netflix/IMDB-style clone that lets you browse what’s trending today or this week, search for movies and shows, watch trailers, explore cast details, manage your watchlist, and much more, all in one sleek interface.',
		images: '/og-image.png',
		url: 'https://popflix.niteshbabu.tech',
		type: 'website',
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang='en'>
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
