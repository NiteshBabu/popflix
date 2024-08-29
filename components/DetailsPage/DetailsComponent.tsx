import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from '@chakra-ui/icons'
import {
  Badge,
  Box,
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import React, { Dispatch, SetStateAction, Suspense } from 'react'
import { imagePath, imagePathOriginal } from '../../services/api'
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from '../../utils/helpers'
import { Details } from '../../utils/types'

function DetailsComponent({
  details,
  type,
  isInWatchlist,
  setIsInWatchlist,
}: {
  details: Details
  type: string
  isInWatchlist: boolean
  setIsInWatchlist: Dispatch<SetStateAction<boolean>>
}) {
  console.log('XXXXXXX', details)

  const title = details.title || details.name
  const releaseDate =
    type === 'tv' ? details.first_air_date : details.release_date

  return (
    <Box
      background={`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${imagePathOriginal}/${details.backdrop_path})`}
      backgroundRepeat={'no-repeat'}
      backgroundSize={'cover'}
      backgroundPosition={'center'}
      w={'100%'}
      h={{ base: 'auto', md: '100vh' }}
      py={'2'}
      zIndex={'-1'}
      display={'flex'}
      alignItems={'center'}
    >
      <Container maxW={'container.xl'}>
        <Flex
          alignItems={'center'}
          gap="10"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Suspense fallback={<Skeleton height={'450px'} />}>
            <Image
              height={'450px'}
              borderRadius={'sm'}
              src={`${imagePath}/${details.poster_path}`}
            />
          </Suspense>
          <Box>
            <Heading fontSize={'3xl'}>
              {title}{' '}
              <Text as="span" fontWeight={'normal'} color={'gray.400'}>
                {new Date(releaseDate).getFullYear()}
              </Text>
            </Heading>

            <Flex alignItems={'center'} gap={'4'} mt={1} mb={5}>
              <Flex alignItems={'center'}>
                <CalendarIcon mr={2} color={'gray.400'} />
                <Text fontSize={'sm'}>
                  {new Date(releaseDate).toLocaleDateString('en-US')} (US)
                </Text>
              </Flex>
              {type === 'movie' && (
                <>
                  <Box>**</Box>
                  <Flex alignItems={'center'}>
                    <TimeIcon mr="2" color={'gray.400'} />
                    <Text fontSize={'sm'}>
                      {minutesTohours(details.runtime)}
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>
            <Flex alignItems={'center'} gap={'4'}>
              <CircularProgress
                value={+ratingToPercentage(details.vote_average)}
                bg={'gray.800'}
                borderRadius={'full'}
                p={'0.5'}
                size={'70px'}
                color={resolveRatingColor(details.vote_average)}
                thickness={'6px'}
              >
                <CircularProgressLabel fontSize={'lg'}>
                  {ratingToPercentage(details.vote_average)}{' '}
                  <Box as="span" fontSize={'10px'}>
                    %
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>
              <Text display={{ base: 'none', md: 'initial' }}>User Score</Text>

              {/* TODO */}
              {isInWatchlist ? (
                <Button
                  leftIcon={<CheckCircleIcon />}
                  colorScheme="green"
                  variant={'outline'}
                >
                  In watchlist
                </Button>
              ) : (
                <Button
                  leftIcon={<SmallAddIcon />}
                  variant={'outline'}
                >
                  Add to watchlist
                </Button>
              )}
            </Flex>
            <Text
              color={'gray.400'}
              fontSize={'sm'}
              fontStyle={'italic'}
              my="5"
            >
              {details.tagline}
            </Text>
            <Heading fontSize={'xl'} mb={'3'}>
              Overview
            </Heading>
            <Text fontSize={'md'} mb={'3'}>
              {details.overview}
            </Text>
            <Flex mt="6" gap="2">
              {details.genres?.map((genre) => (
                <Badge key={genre?.id} p="1">
                  {genre?.name}
                </Badge>
              ))}
            </Flex>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}

export default DetailsComponent
