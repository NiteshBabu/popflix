import { CalendarIcon } from '@chakra-ui/icons'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Text,
} from '@chakra-ui/react'
import React, { Suspense, useEffect, useState } from 'react'
import { fetchPerson, imagePath, imagePathOriginal } from '../services/api'
import { CastDetails } from '../utils/types'
import CardComponent from './CardComponent'
import { resolveRatingColor } from '../utils/helpers'
import FullSpinner from './FullSpinner'
import Link from 'next/link'

function PeopleComponent({ currentCast }: { currentCast: number }) {
  const [details, setDetails] = useState<CastDetails>(null)
  console.log(details)

  useEffect(() => {
    ;(async () => {
      const castDetails = await fetchPerson(currentCast)
      setDetails(castDetails)
    })()
  }, [])

  if (!details) return <FullSpinner />
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Box>
        <Box
          background={`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${imagePathOriginal}/${details.profile_path})`}
          backgroundRepeat={'no-repeat'}
          backgroundSize={'cover'}
          backgroundPosition={'center'}
          w={'100%'}
          h={{ base: 'auto', md: '100vh' }}
          py={'2'}
          zIndex={'-1'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Flex
            alignItems={'center'}
            gap="10"
            padding={4}
            flexDirection={{ base: 'column', md: 'row' }}
            w={{
              base: 'auto',
              md: '80%',
            }}
          >
            <Suspense fallback={<Skeleton height={'450px'} />}>
              <Image
                height={'450px'}
                borderRadius={'sm'}
                src={`${imagePath}/${details.profile_path}`}
              />
            </Suspense>
            <Box>
              <Heading fontSize={'3xl'}>{details.name}</Heading>

              <Flex alignItems={'center'} gap={'4'} mt={1} mb={5}>
                <Flex alignItems={'center'} gap={4}>
                  <Text>Born On </Text>
                  <Flex align={'center'}>
                    <CalendarIcon mr={2} color={'gray.400'} />
                    <Text>
                      {new Date(details.birthday).toLocaleDateString()}
                    </Text>
                  </Flex>
                  {details.place_of_birth}
                </Flex>
              </Flex>
              <Flex alignItems={'center'} gap={'4'}>
                <CircularProgress
                  value={details.popularity}
                  bg={'gray.800'}
                  borderRadius={'full'}
                  p={'0.5'}
                  size={'70px'}
                  color={resolveRatingColor(details.popularity)}
                  thickness={'6px'}
                >
                  <CircularProgressLabel fontSize={'lg'}>
                    {details.popularity.toFixed()}{' '}
                    <Box as="span" fontSize={'10px'}>
                      %
                    </Box>
                  </CircularProgressLabel>
                </CircularProgress>
                <Text display={{ base: 'none', md: 'initial' }}>
                  Popularity
                </Text>
              </Flex>
              <Text
                color={'gray.400'}
                fontSize={'md'}
                fontStyle={'italic'}
                my="5"
                fontWeight={'bold'}
              ></Text>
              <Heading fontSize={'xl'} mb={'3'}>
                Bio
              </Heading>
              <Text fontSize={'md'} mb={'3'}>
                {details.biography}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box textAlign={'center'} mt={10}>
          <Text fontSize={'3xl'}>Known For</Text>
          <Flex gap={3} mt={5} overflowX={'auto'}>
            {details?.cast?.map((item) => (
              <Box minWidth={'250px'}>
                <CardComponent item={item} loading={false} key={item.id} />
              </Box>
            ))}
          </Flex>
        </Box>

        {/* Images */}
        <Box textAlign={'center'} mt={10}>
          <Heading as="h2" fontSize={'xx-large'}>
            Images
          </Heading>
          <Flex gap={3} mt={5} overflowX={'auto'}>
            {details?.profiles?.map((item) => (
              <Box minWidth={'150px'}>
                <Link href={`${imagePath}/${item.file_path}`} target="_blank">
                  <Image
                    borderRadius={'sm'}
                    src={`${imagePath}/${item.file_path}`}
                    alt={item.file_path}
                  />
                </Link>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </Suspense>
  )
}

export default PeopleComponent
