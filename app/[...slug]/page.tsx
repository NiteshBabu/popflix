'use client'
import { useEffect, useState } from 'react'
import { Box, Spinner } from '@chakra-ui/react'
import { fetchDetails } from '../../services/api'
import DetailsComponent from '../../components/DetailsPage/DetailsComponent'


const DetailsPage = ({ params }) => {
  const [type, id] = params.slug

  const [details, setDetails] = useState({})
  const [loading, setLoading] = useState(true)
  const [isInWatchlist, setIsInWatchlist] = useState(false)
  useEffect(() => {
    ;(async () => {
      try {

        const detailsData = await fetchDetails(type, id)
        setDetails(detailsData)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [type, id])

  if (loading)
    return (
      <Box pos={'absolute'} height={'100%'} width={"100%"} bg={'tomato'}>
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
    </Box>
  )
}


export default DetailsPage