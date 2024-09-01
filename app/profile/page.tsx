'use client'
import {
  Avatar,
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { useFirestore } from '../../services/firestore'
import WatchlistCard from '../../components/WatchlistCard'
import { redirect } from 'next/navigation'
import Protected from '../../components/HOC/Protected'

const ProfilePage = () => {
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
      <Box mb={50}>
        <Heading
          as="h1"
          fontSize={'xx-large'}
          textTransform={'uppercase'}
          mt={10}
          textAlign={'center'}
        >
          Profile
        </Heading>
        <Flex
          alignItems="center"
          gap="10"
          mt={10}
          direction={{
            base: 'column',
            md: 'row',
          }}
        >
          <Avatar
            bg="red.500"
            size={'xl'}
            name={user?.displayName || user?.email}
          />
          <Box
            textAlign={{
              base: 'center',
              md: 'left',
            }}
          >
            <Text fontSize={'xl'}>{user?.displayName}</Text>
            <Text fontSize={'xl'}>{user?.email}</Text>
          </Box>
        </Flex>
      </Box>
      <Heading
        as="h2"
        fontSize={'x-large'}
        textTransform={'uppercase'}
        textAlign={'center'}
      >
        Watchlist
      </Heading>

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
          mt={50}
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

export default Protected(ProfilePage)
