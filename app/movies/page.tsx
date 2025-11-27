'use client'
import { Container, Flex, Grid, Heading, Select } from '@chakra-ui/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import CardComponent from '../../components/CardComponent'
import PaginationComponent from '../../components/PaginationComponent'
import { fetchMovies } from '../../services/api'
import { TMDBResponseType } from '../../utils/types'

const FILTERS = {
	popular: 'popularity.desc',
	top_rated: 'vote_average.desc&vote_count.gte=1000',
}
const MoviesPage = () => {
	const searchParams = useSearchParams()
	const pathname = usePathname()
	const { replace } = useRouter()
	const query = new URLSearchParams(searchParams)

	const [data, setData] = useState<TMDBResponseType[]>(
		Array.from({ length: 20 })
	)
	const [filter, setFilter] = useState(searchParams.get('filter') || 'popular')
	const [currentPage, setcurrentPage] = useState(+searchParams.get('page') || 1)
	const [totalPages, setTotalPages] = useState(1)
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		query.set('page', currentPage.toString())
		query.set('filter', filter)
		replace(`?${query.toString()}`, {
			scroll: false,
		})
		;(async function () {
			const resp = await fetchMovies(currentPage, FILTERS[filter])
			setData(resp.results)
			setcurrentPage(resp.page)
			setTotalPages(resp.total_pages)
			setIsLoading(false)
		})()
	}, [currentPage, filter])

	return (
		<Container maxW={'container.xl'}>
			<Flex
				alignItems={'baseline'}
				justifyContent={'space-between'}
				gap={'4'}
				my={'10'}>
				<Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>
					Movies
				</Heading>
				<Select
					w={'130px'}
					onChange={(e) => {
						setcurrentPage(1)
						setFilter(
							e.target.options[e.target.selectedIndex].textContent
								.trim()
								.replaceAll(' ', '_')
								.toLowerCase()
						)
					}}>
					<option value='popularity.desc'>Popular</option>
					<option value='vote_average.desc&vote_count.gte=1000'>
						Top Rated
					</option>
				</Select>
			</Flex>
			<Grid
				templateColumns={{
					base: 'repeat(2, 1fr)',
					md: 'repeat(4, 1fr)',
					lg: 'repeat(5, 1fr)',
				}}
				gap={'4'}>
				{data &&
					data?.map((item, i) => (
						<CardComponent
							isLoading={isLoading}
							key={i}
							item={{ ...item, media_type: 'movie' }}
						/>
					))}
			</Grid>
			{data?.length > 0 && !isLoading && (
				<PaginationComponent
					currentPage={currentPage}
					totalPages={totalPages}
					setcurrentPage={setcurrentPage}
				/>
			)}
		</Container>
	)
}

export default MoviesPage
