'use client'
import { useEffect, useState } from 'react'
import {
  Container,
  Flex,
  Grid,
  Heading,
  Input,
  Skeleton,
  Spinner,
} from '@chakra-ui/react'
import { fetchMultiSearch } from '../../services/api'
import CardComponent from '../../components/CardComponent'
import FullSpinner from '../../components/FullSpinner'
import { useDebounce } from '../../hooks/useDebounce'
import PaginationComponent from '../../components/PaginationComponent'
import { usePathname, useRouter } from 'next/navigation'

// const fetchSearch = async (searchQuery, currentPage, totalPages, isLoading) => {
//   const res = await fetchMultiSearch(searchQuery, currentPage)
//   return res?.results
// }
const Search = ({ searchParams }) => {
  const { q } = searchParams

  const pathname = usePathname()
  const { replace } = useRouter()
  const [searchQuery, setSearchQuery] = useState(q || 'Iron Man')
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)

  useEffect(() => {
    const query = new URLSearchParams([
      ['q', searchQuery],
      ['page', currentPage],
    ])
    replace(`${pathname}?${query}`)
    setIsLoading(true)
    setcurrentPage(1)
    fetchMultiSearch(searchQuery, currentPage)
      .then((resp) => {
        setData(resp.results)
        setTotalPages(resp.total_pages)
      })
      .finally(() => setIsLoading(false))
  }, [searchQuery])

  useEffect(() => {
    const query = new URLSearchParams([
      ['q', searchQuery],
      ['page', currentPage],
    ])
    replace(`${pathname}?${query}`)
    setIsLoading(true)
    fetchMultiSearch(searchQuery, currentPage)
      .then((resp) => {
        setData(resp.results)
        setcurrentPage(resp.page)
      })
      .finally(() => setIsLoading(false))
  }, [currentPage])

  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Search
        </Heading>
      </Flex>

      <Input
        placeholder="Search movies, shows, people"
        _placeholder={{ color: 'gray.100' }}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {isLoading && <FullSpinner />}

      {data?.length === 0 && !isLoading && (
        <Heading textAlign={'center'} as="h3" fontSize={'sm'} mt="10">
          No results found
        </Heading>
      )}

      {data && (
        <Grid
          templateColumns={{
            base: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={'4'}
          mt="6"
        >
          {data?.map((item, i) =>
            isLoading ? (
              <Skeleton height={300} key={i} />
            ) : (
              <CardComponent key={item?.id} item={item} />
            )
          )}
        </Grid>
      )}

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

export default Search
