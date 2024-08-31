'use client'
import { useState, useEffect } from 'react'
import { useFirestore } from '../../services/firestore'
import { useAuth } from '../../context/useAuth'
import { Container, Flex, Grid, Heading, Spinner } from '@chakra-ui/react'
import WatchlistCard from '../../components/WatchlistCard'
import CardComponent from '../../components/CardComponent'

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
          console.log(data, 'data')
        })
        .catch((err) => {
          console.log(err, 'error')
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }, [user?.uid, getWatchlist])

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
        <Flex>
          {watchlist?.map((item) => (
            <CardComponent key={item?.id} item={item} />
          ))}
        </Flex>
      )}
    </Container>
  )
}

export default Watchlist
