'use client'
import { useEffect, useState } from 'react'
import { Box, Container, Flex, Grid, Heading } from '@chakra-ui/react'
import { fetchTrending } from '../services/api'
import CardComponent from '../components/CardComponent'
import { TMDBResponseType } from '../utils/types'

const Home = () => {
  const [data, setData] = useState<TMDBResponseType[]>(
    Array.from({ length: 20 })
  )
  const [loading, setLoading] = useState(true)
  const [timeWindow, setTimeWindow] = useState<'week' | 'day'>('day')

  useEffect(() => {
    setLoading(true)
    ;(async function () {
      const { results, error } = await fetchTrending(timeWindow)
      if (error) {
        console.log(error)
      } else {
        setData(results)
        setLoading(false)
      }
    })()
  }, [timeWindow])

  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Trending
        </Heading>
        <Flex
          alignItems={'center'}
          gap={'4'}
          border={'1px solid teal'}
          borderRadius={'20px'}
          pos={'relative'}
        >
          <Box
            px="3"
            py="1"
            top={0}
            h={'100%'}
            w={`${timeWindow === 'week' ? '6rem' : '5.5rem'}`}
            borderRadius={'20px'}
            bg={'gray.800'}
            pos={'absolute'}
            zIndex={-1}
            left={`${timeWindow === 'week' ? '5rem' : '0'}`}
            transition={'all 0.3s ease-in-out'}
          />
          <Box as="button" px="3" py="1" onClick={() => setTimeWindow('day')}>
            Today
          </Box>
          <Box as="button" px="3" py="1" onClick={() => setTimeWindow('week')}>
            This Week
          </Box>
        </Flex>
      </Flex>
      <Grid
        templateColumns={{
          base: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        gap={'4'}
      >
        {data?.map((item, i) => (
          <>
            <CardComponent isLoading={loading} key={i} item={item} />
          </>
        ))}
      </Grid>
    </Container>
  )
}

export default Home
