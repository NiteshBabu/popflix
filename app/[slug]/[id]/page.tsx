'use client'
import { useEffect, useState } from 'react'
import { Box, Container, Flex, Spinner } from '@chakra-ui/react'
import { fetchCredits, fetchDetails} from '../../../services/api'
import DetailsComponent from '../../../components/DetailsPage/DetailsComponent'
import Cast from '../../../components/DetailsPage/CastComponent'

const DetailsPage = ({ params }) => {
  const { slug: type, id } = params

  const [details, setDetails] = useState({})
  const [cast, setCast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  useEffect(() => {
    ;(async () => {
      try {
        const [detailsData, creditsData] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
        ])
        setDetails(detailsData)
        setCast(creditsData.cast)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [type, id])

  if (loading)
    return (
      <Box pos={'absolute'} height={'100%'} width={'100%'} bg={'tomato'}>
        <Spinner size={'xl'} color="red" />
      </Box>
    )

  return (
    <Box>
      <DetailsComponent
        details={details}
        type={type}
        isInWatchlist={isInWatchlist}
        setIsInWatchlist={setIsInWatchlist}
      />
      <Container maxW={'7xl'} mt={10}>
        {cast && <Cast cast={cast} />}
      </Container>
    </Box>
  )
}

export default DetailsPage
