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
  Icon,
  Image,
  Skeleton,
  Text,
  useToast,
} from '@chakra-ui/react'
import React, {
  Dispatch,
  SetStateAction,
  Suspense,
  useEffect,
  useState,
} from 'react'
import { imagePath, imagePathOriginal } from '../../services/api'
import {
  minutesTohours,
  ratingToPercentage,
  resolveRatingColor,
} from '../../utils/helpers'
import { Details } from '../../utils/types'
import { useFirestore } from '../../services/firestore'
import { useAuth } from '../../context/useAuth'

function DetailsComponent({
  details,
  type,
}: {
  details: Details
  type: string
}) {
  const { id: itemId } = details
  const { user } = useAuth()
  const [isInWatchlist, setIsInWatchlist] = useState(false)

  const { addToWatchlist, checkIfInWatchlist, removeFromWatchlist } =
    useFirestore()
  const toast = useToast()

  const handleSaveToWatchlist = async () => {
    if (!user) {
      toast({
        title: 'Login to add to watchlist',
        status: 'error',
        isClosable: true,
      })
      return
    }

    const data = {
      id: details?.id,
      title: details?.title || details?.name,
      media_type: type,
      poster_path: details?.poster_path,
      release_date: details?.release_date || details?.first_air_date,
      vote_average: details?.vote_average,
      overview: details?.overview,
    }

    const dataId = details?.id?.toString()
    await addToWatchlist(user?.uid, dataId, data)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, dataId)
    setIsInWatchlist(isSetToWatchlist)
  }

  useEffect(() => {
    if (!user) {
      setIsInWatchlist(false)
      return
    }

    checkIfInWatchlist(user?.uid, itemId).then((data) => {
      setIsInWatchlist(data)
    })
  }, [itemId, user, checkIfInWatchlist])

  const handleRemoveFromWatchlist = async () => {
    await removeFromWatchlist(user?.uid, itemId)
    const isSetToWatchlist = await checkIfInWatchlist(user?.uid, itemId)
    setIsInWatchlist(isSetToWatchlist)
  }
  const title = details?.title || details?.name
  const releaseDate =
    type === 'tv' ? details?.first_air_date : details?.release_date

  const backdrop_path = details?.backdrop_path
  const poster_path = details?.poster_path
  return (
    <Box
      background={`linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.8)), url(${imagePathOriginal}/${backdrop_path})`}
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
              src={`${imagePath}/${poster_path}`}
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
              <Flex gap={4}>
                <Flex alignItems={'center'}>
                  <CalendarIcon mr={2} color={'gray.400'} />
                  <Text fontSize={'sm'}>
                    {new Date(releaseDate).toLocaleDateString('en-US')} (US)
                  </Text>
                </Flex>
                <Text
                  as="span"
                  fontWeight={'normal'}
                  fontSize={'sm'}
                  color={'gray.100'}
                >
                  {details?.status}
                </Text>
              </Flex>
              {type === 'movie' && (
                <>
                  <Box>#</Box>
                  <Flex alignItems={'center'}>
                    <TimeIcon mr="2" color={'gray.400'} />
                    <Text fontSize={'sm'}>
                      {minutesTohours(details?.runtime)}
                    </Text>
                  </Flex>
                </>
              )}
            </Flex>
            <Flex alignItems={'center'} gap={'4'}>
              <CircularProgress
                value={+ratingToPercentage(details?.vote_average)}
                bg={'gray.800'}
                borderRadius={'full'}
                p={'0.5'}
                size={'70px'}
                color={resolveRatingColor(details?.vote_average)}
                thickness={'6px'}
              >
                <CircularProgressLabel fontSize={'lg'}>
                  {ratingToPercentage(details?.vote_average)}{' '}
                  <Box as="span" fontSize={'10px'}>
                    %
                  </Box>
                </CircularProgressLabel>
              </CircularProgress>
              <Text display={{ base: 'none', md: 'initial' }}>User Score</Text>

              {/* TODO */}
              {isInWatchlist ? (
                <Button
                  leftIcon={<BookmarkIcon fill={"green.200"} stroke={"green.200"} />}
                  colorScheme="green"
                  variant={'outline'}
                >
                  Watchlisted
                </Button>
              ) : (
                <Button
                  leftIcon={<BookmarkIcon fill={"white"} stroke={"white"}/>}
                  variant={'outline'}
                  onClick={handleSaveToWatchlist}
                >
                  Watchlist
                </Button>
              )}
            </Flex>
            <Text
              color={'gray.400'}
              fontSize={'md'}
              fontStyle={'italic'}
              my="5"
              fontWeight={'bold'}
            >
              {details?.tagline}
            </Text>
            <Heading fontSize={'xl'} mb={'3'}>
              Overview
            </Heading>
            <Text fontSize={'md'} mb={'3'}>
              {details?.overview}
            </Text>
            <Flex mt="6" gap="2">
              {details?.genres?.map((genre) => (
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

const BookmarkIcon = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <path stroke={props.stroke} d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
    </Icon>
  )
}
