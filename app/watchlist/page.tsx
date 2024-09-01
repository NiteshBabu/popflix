'use client'
import { useState, useEffect } from 'react'
import { useFirestore } from '../../services/firestore'
import { useAuth } from '../../context/useAuth'
import { Container, Flex, Grid, Heading, Spinner } from '@chakra-ui/react'
import WatchlistCard from '../../components/WatchlistCard'
import Protected from '../../components/HOC/Protected'

const Watchlist = () => {
  const { getWatchlist } = useFirestore()
  const { user } = useAuth()
  const [watchlist, setWatchlist] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (user?.uid) {
      getWatchlist(user?.uid)
        .then((data) => {
          setWatchlist(data)
        })
        .catch((err) => {
          console.log(err, 'error')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user?.uid])

  return (
    <Container maxW={'container.xl'}>
      <Flex alignItems={'baseline'} gap={'4'} my={'10'}>
        <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
          Watchlist
        </Heading>
      </Flex>
      {isLoading && (
        <Flex justify={'center'} mt="10">
          <Spinner size={'xl'} color="red" />
        </Flex>
      )}
      {!isLoading && watchlist?.length === 0 && (
        <Flex justify={'center'} mt="10">
          <Heading as="h2" fontSize={'md'} textTransform={'uppercase'}>
            Watchlist is empty
          </Heading>
        </Flex>
      )}
      {!isLoading && watchlist?.length > 0 && (
        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
          }}
          gap={'4'}
        >
          {watchlist?.map((item) => (
            <WatchlistCard
              key={item?.id}
              item={item}
              setWatchlist={setWatchlist}
            />
          ))}
        </Grid>
      )}
    </Container>
  )
}

export default Protected(Watchlist)
