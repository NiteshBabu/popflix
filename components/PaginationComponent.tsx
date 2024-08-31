import { Button, Flex, Text } from '@chakra-ui/react'

const PaginationComponent = ({
  currentPage,
  totalPages,
  setcurrentPage,
}: {
  currentPage: number,
  totalPages: number,
  setcurrentPage: (page: number) => void,
}) => {
  return (
    <Flex gap={'2'} alignItems={'center'}>
      <Flex gap={'2'} maxW={'250px'} my="10">
        <Button
          onClick={() => setcurrentPage(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Prev
        </Button>
        <Button
          onClick={() => setcurrentPage(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </Flex>
      <Flex gap="1">
        <Text>{currentPage}</Text>
        <Text>of</Text>
        <Text>{totalPages}</Text>
      </Flex>
    </Flex>
  )
}

export default PaginationComponent
