/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: 'image.tmdb.org',
			},
			{
				hostname: 'ik.imagekit.io',
			},
		],
	},
}

export default nextConfig
