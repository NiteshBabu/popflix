import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import YoutubeEmbed from '../YoutubeEmbedComponent'

const VideoComponent = ({ videos }) => {
  const trailer = videos.find(
    (video) => video?.type === 'Trailer'
  )
  const filteredvideos = videos
    .filter((video) => video?.type !== 'Trailer')
    ?.slice(0, 10)
  return (
    <>
      <Heading
        as="h2"
        fontSize={'md'}
        textTransform={'uppercase'}
        mt="10"
        mb="5"
      >
        Videos
      </Heading>
      <YoutubeEmbed id={trailer.key}/>
      <Flex mt="5" mb="10" overflowX={'scroll'} gap={'5'}>
        {filteredvideos &&
          filteredvideos?.map((item) => (
            <Box key={item?.id} minW={'290px'}>
              <YoutubeEmbed id={item?.key} />
              <Text fontSize={'sm'} fontWeight={'bold'} mt="2" noOfLines={2}>
                {item?.name}{' '}
              </Text>
            </Box>
          ))}
      </Flex>
    </>
  )
}



export default VideoComponent
