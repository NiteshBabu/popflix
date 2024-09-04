'use client'
import React, { Suspense, useEffect, useState } from 'react'
import {
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  fetchPerson,
  imagePath,
  imagePathOriginal,
} from '../../../services/api'
import { CastDetails } from '../../../utils/types'
import CardComponent from '../../../components/CardComponent'
import { resolveRatingColor } from '../../../utils/helpers'
import FullSpinner from '../../../components/FullSpinner'
import Link from 'next/link'

const YEARS = 10
const TIMEDELTA = new Date()
TIMEDELTA.setFullYear(TIMEDELTA.getFullYear() - YEARS)

function PeopleComponent({ params }) {
  const { id } = params

  const [details, setDetails] = useState<CastDetails>(null)

  useEffect(() => {
    ;(async () => {
      const castDetails = await fetchPerson(id)
      console.log(castDetails);
      
      setDetails(castDetails)
    })()
  }, [])

  console.log(details)

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
          minH={{ base: 'auto', md: '100vh' }}
          py={'2'}
          zIndex={'-1'}
          display={'flex'}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Flex
            alignItems={{
              base: 'center',
              lg: 'flex-start',
            }}
            gap="10"
            padding={4}
            flexDirection={{ base: 'column', lg: 'row' }}
            w={{
              base: 'auto',
              lg: '90%',
              xl: '80%',
            }}
          >
            <Suspense fallback={<Skeleton height={'450px'} />}>
              <Image
                height={'450px'}
                borderRadius={'sm'}
                src={`${imagePath}/${details.profile_path}`}
              />
            </Suspense>
            <Box
              textAlign={{
                base: 'center',
                lg: 'left',
              }}
            >
              <Heading fontSize={'5xl'} mb={4} as={'h1'}>
                {details.name}
              </Heading>

              <Flex
                gap={4}
                direction={{ base: 'column', lg: 'row' }}
                justifyContent={{
                  base: 'center',
                  lg: 'flex-start',
                }}
              >
                <Flex
                  alignItems={'center'}
                  justifyContent={{
                    base: 'center',
                    lg: 'flex-start',
                  }}
                  gap={'2'}
                >
                  <Text>Born On</Text>
                  <Flex align={'center'}>
                    <CalendarIcon mr={2} color={'gray.400'} />
                    <Text>
                      {new Date(details.birthday).toLocaleDateString()}
                    </Text>
                  </Flex>
                </Flex>
                <Text>{details.place_of_birth}</Text>
              </Flex>
              <Flex
                alignItems={'center'}
                gap={'4'}
                mt={4}
                justifyContent={{ base: 'center', lg: 'flex-start' }}
              >
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
                <Text>Popularity</Text>
              </Flex>
              <Text
                color={'gray.400'}
                fontSize={'md'}
                fontStyle={'italic'}
                my="5"
                fontWeight={'bold'}
              ></Text>
              <Heading fontSize={'3xl'} mb={'3'}>
                Bio
              </Heading>
              <Text fontSize={'md'} mb={'3'}>
                {details.biography}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box textAlign={'center'} mt={10}>
          <Heading as="h2" fontSize={'xx-large'}>
            Known For
          </Heading>
          <Flex gap={3} mt={5} overflow={'auto hidden'}>
            {details?.cast
              ?.filter(
                (item) =>
                  new Date(item.release_date) > TIMEDELTA &&
                  new Date(item.release_date) < new Date()
              )
              .sort(
                (x, y) => +new Date(y.release_date) - +new Date(x.release_date)
              )
              .map((item) => (
                <Box minW={'150px'} width={'150px'}>
                  <CardComponent item={item} isLoading={false} key={item.id} />
                </Box>
              ))}
          </Flex>
        </Box>

        {/* Images */}
        <Box textAlign={'center'} mt={10}>
          <Heading as="h2" fontSize={'xx-large'}>
            Photos
          </Heading>
          <Flex gap={3} mt={5} overflowX={'auto'}>
            {details?.profiles?.map((item) => (
              <Box minWidth={'150px'}>
                <Link
                  href={`${imagePathOriginal}${item.file_path}`}
                  target="_blank"
                >
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
