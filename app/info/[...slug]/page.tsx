'use client'
import { Box, Container } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Cast from '../../../components/DetailsPage/CastComponent'
import DetailsComponent from '../../../components/DetailsPage/DetailsComponent'
import VideoComponent from '../../../components/DetailsPage/VideoComponent'
import FullSpinner from '../../../components/FullSpinner'
import { fetchCredits, fetchDetails, fetchVideos } from '../../../services/api'
import { TMDBResponseType } from '../../../utils/types'

const DetailsPage = ({ params }) => {
  const [type, id] = params.slug

  const [details, setDetails] = useState<TMDBResponseType>({})
  const [cast, setCast] = useState(null)
  const [loading, setLoading] = useState(true)
  const [videos, setVideos] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const [detailsData, creditsData, videos] = await Promise.all([
          fetchDetails(type, id),
          fetchCredits(type, id),
          fetchVideos(type, id),
        ])
        setDetails(detailsData)
        console.log(details)
        setCast(creditsData.cast)
        setVideos(videos.results)
      } catch (error) {
        console.log(error, 'error')
      } finally {
        setLoading(false)
      }
    })()
  }, [type, id])

  if (loading) return <FullSpinner />

  return (
    <Box>
      <DetailsComponent details={details} type={type} />
      <Container maxW={'container.xl'} mt={10}>
        {cast?.length > 0 && <Cast cast={cast} />}
        {videos?.length > 0 && <VideoComponent videos={videos} />}
      </Container>
    </Box>
  )
}

export default DetailsPage
