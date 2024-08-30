import {
  CalendarIcon,
  CheckCircleIcon,
  SmallAddIcon,
  TimeIcon,
} from '@chakra-ui/icons'
import {
  Box,
  Flex,
  Heading,
  Image,
  Skeleton,
  Text,
} from '@chakra-ui/react'
import React, { Suspense } from 'react'
import { imagePath, imagePathOriginal } from '../services/api'
import { CastDetails } from '../utils/types'
import CardComponent from './CardComponent'

function PeopleComponent({ details }: { details: CastDetails }) {
  return (
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
        justifyContent={"center"}
      >
        <Flex
          alignItems={'center'}
          gap="10"
          flexDirection={{ base: 'column', md: 'row' }}
        >
          <Suspense fallback={<Skeleton height={'450px'} />}>
            <Image
              height={'450px'}
              borderRadius={'sm'}
              src={`${imagePath}/${details.profile_path}`}
            />
          </Suspense>
          <Box>
            <Heading fontSize={'3xl'}>{details.name} H</Heading>

            <Flex alignItems={'center'} gap={'4'} mt={1} mb={5}>
              <Flex gap={4}>
                <Flex alignItems={'center'}>
                  <CalendarIcon mr={2} color={'gray.400'} />
                </Flex>
              </Flex>
            </Flex>
            <Flex alignItems={'center'} gap={'4'}>
              <Text display={{ base: 'none', md: 'initial' }}>User Score</Text>
            </Flex>
            <Text
              color={'gray.400'}
              fontSize={'md'}
              fontStyle={'italic'}
              my="5"
              fontWeight={'bold'}
            >
            </Text>
            <Heading fontSize={'xl'} mb={'3'}>
              Overview
            </Heading>
            <Text fontSize={'md'} mb={'3'}>Some Info
            </Text>
          </Box>
        </Flex>
      </Box>
      <Box textAlign={'center'} mt={10}>
        <Text fontSize={'3xl'}>Known For</Text>
        <Flex justifyContent={'center'} mt={5}>
          {details.known_for.map((item) => (
            <Box width={'250px'}>
              <CardComponent item={item} loading={false} key={item.id} />
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  )
}

export default PeopleComponent
