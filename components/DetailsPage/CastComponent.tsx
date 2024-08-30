import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { fetchPerson, imagePath } from '../../services/api'
import type { Cast } from '../../utils/types'
import CardComponent from '../CardComponent'
import DetailsComponent from './DetailsComponent'
import PeopleComponent from '../PeopleComponent'

function Cast({ cast }: { cast: Cast[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const currentCast = useRef<Cast | []>(cast[0] || [])
  const [castDetails, setcastDetails] = useState<Cast>()

  useEffect(() => {
    if (currentCast.current?.name) {
      ;(async () => {
        const castDetail = await fetchPerson(currentCast.current?.name)
        setcastDetails(castDetail.results[0])
      })()
    }
  }, [currentCast.current])

  console.log(castDetails)

  return (
    <>
      <Heading as="h2" fontSize={'md'} textTransform={'uppercase'} mt="10">
        Cast
      </Heading>
      <Flex mt="5" mb="10" overflowX={'auto'} gap={'5'}>
        {cast?.length === 0 && (
          <Text color={'red.500'} fontWeight={'bold'} fontSize={'large'}>
            No cast found 😶
          </Text>
        )}
        {cast &&
          cast?.map((item) => (
            // <Link href={`/person/${item.name}`}>
            <Box
              key={item?.id}
              cursor={'pointer'}
              minW={'150px'}
              textAlign={'center'}
              onClick={() => {
                setIsOpen(true)
                currentCast.current = item
                setcastDetails(null)
              }}
            >
              <Image
                src={`${imagePath}/${item?.profile_path}`}
                w={'100%'}
                height={'225px'}
                objectFit={'cover'}
                borderRadius={'sm'}
              />
              <Text>{item.character} </Text>
              <Text as={'span'} fontSize={'x-small'}>
                played by
              </Text>{' '}
              <Text>{item?.name}</Text>
            </Box>
            // </Link>
          ))}
      </Flex>

      {castDetails && (
        <Modal
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
          scrollBehavior="inside"
          size="8xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody>
              <PeopleComponent details={castDetails} />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </>
  )
}

export default Cast
