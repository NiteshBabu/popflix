'use client'
import { useEffect, useState } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { fetchCredits, fetchDetails, fetchVideos } from '../../../services/api'
import DetailsComponent from '../../../components/DetailsPage/DetailsComponent'
import Cast from '../../../components/DetailsPage/CastComponent'
import FullSpinner from '../../../components/FullSpinner'
import { TMDBResponseType } from '../../../utils/types'
import VideoComponent from '../../../components/DetailsPage/VideoComponent'

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
