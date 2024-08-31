import {
  Box,
  Flex,
  Grid,
  Heading,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
} from '@chakra-ui/react'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { fetchPerson, imagePath } from '../../services/api'
import type { Cast } from '../../utils/types'
import PeopleComponent from '../PeopleComponent'

function Cast({ cast }: { cast: Cast[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCast, setCurrentCast] = useState<number>(cast[0].id)
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
                setCurrentCast(item?.id)
              }}
            >
              <Image
                src={`${imagePath}/${item?.profile_path}`}
                borderRadius={'sm'}
              />
              <Text fontWeight={'bold'} my={1}>
                {item?.name}
              </Text>
              <Text>{item.character}</Text>
            </Box>
            // </Link>
          ))}
      </Flex>

      <Modal
        onClose={() => setIsOpen(false)}
        isOpen={isOpen}
        scrollBehavior="inside"
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0} mb={5}>
            <PeopleComponent currentCast={currentCast} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Cast
