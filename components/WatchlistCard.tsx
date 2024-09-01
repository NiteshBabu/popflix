'use client'
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Image,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import Link from 'next/link'
import { imagePath } from '../services/api'
import { useFirestore } from '../services/firestore'
import { useAuth } from '../context/useAuth'
import { DeleteIcon, StarIcon } from '@chakra-ui/icons'

const WatchlistCard = ({ item, setWatchlist }) => {
  const { removeFromWatchlist } = useFirestore()
  const { user } = useAuth()

  const handleRemoveClick = (event) => {
    event.preventDefault()
    removeFromWatchlist(user?.uid, item.id).then(() => {
      setWatchlist((prev) => prev.filter((el) => el.id !== item.id))
    })
  }

  return (
    <Link href={`/info/${item.media_type}/${item.id}`}>
      <Flex gap="4">
        <Box position={'relative'} w={'150px'}>
          <Image
            src={`${imagePath}/${item.poster_path}`}
            alt={item.title}
            height={'200px'}
            minW={'150px'}
            objectFit={'cover'}
          />
          <Tooltip label="Remove from watchlist">
            <IconButton
              aria-label="Remove from watchlist"
              icon={<DeleteIcon />}
              size={'sm'}
              colorScheme={'red'}
              position={'absolute'}
              zIndex={'1'}
              bottom={1}
              left={1}
              borderRadius={'50%'}
              onClick={handleRemoveClick}
            />
          </Tooltip>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            gap={1}
            pos={'absolute'}
            top={1}
            right={1}
            p={'3px 6px'}
            borderRadius={5}
            bg={'rgba(0,0,0,0.4)'}
          >
            <StarIcon fontSize={'small'} fill={'tomato'} />
            <Text fontSize={'small'}>{item?.vote_average?.toFixed(1)}</Text>
          </Flex>
        </Box>

        <Box>
          <Heading fontSize={{ base: 'xl', md: '2xl' }} noOfLines={1}>
            {item?.title || item?.name}
          </Heading>
          <Heading fontSize={'sm'} color={'green.200'} mt="2">
            {new Date(
              item?.release_date || item?.first_air_date
            ).getFullYear() || 'N/A'}
          </Heading>

          <Text mt="4" fontSize={{ base: 'xs', md: 'sm' }} noOfLines={5}>
            {item?.overview}
          </Text>
        </Box>
      </Flex>
    </Link>
  )
}

export default WatchlistCard
