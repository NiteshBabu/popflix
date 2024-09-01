'use client'
import { useEffect, useState } from 'react'
import { Box, Container, Flex, Grid, Heading, Select } from '@chakra-ui/react'
import CardComponent from '../../components/CardComponent'
import { TMDBResponseType } from '../../utils/types'
import { fetchShows } from '../../services/api'
import PaginationComponent from '../../components/PaginationComponent'

const ShowsPage = () => {
  const [data, setData] = useState<TMDBResponseType[]>(
    Array.from({ length: 20 })
  )
  const [sortBy, setSortBy] = useState('popularity.desc')

  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setcurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    setIsLoading(true)
    ;(async function () {
      const resp = await fetchShows(currentPage, sortBy)
      setData(resp.results)
      setcurrentPage(resp.page)
      setTotalPages(resp.total_pages)
      setIsLoading(false)
    })()
  }, [currentPage, sortBy])

  console.log({ data })

  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} justifyContent={'space-between'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Shows
        </Heading>
        <Select
          w={'130px'}
          onChange={(e) => {
            setcurrentPage(1)
            setSortBy(e.target.value)
          }}
        >
          <option value="popularity.desc">Popular</option>
          <option value="vote_average.desc&vote_count.gte=1000">
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
        gap={'4'}
      >
        {data &&
          data?.map((item, i) => (
            <CardComponent
              isLoading={isLoading}
              key={item?.id}
              item={{ ...item, media_type: 'tv' }}
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

export default ShowsPage
