import axios from 'axios'


export const imagePath = 'https://image.tmdb.org/t/p/w500'
export const imagePathOriginal = 'https://image.tmdb.org/t/p/original'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY

// TRENDING
export const fetchTrending = async (timeWindow = 'day') => {
  let results, error
  try {
    const { data } = await axios.get(
      `${baseUrl}/trending/all/${timeWindow}?api_key=${apiKey}`
    )

    results = data.results
  } catch (e) {
    error = e
    console.error(e)
    throw e;
  }

  return { results, error }
}

// DETAILS
export const fetchDetails = async (type, id) => {
  const resp = await axios.get(`${baseUrl}/${type}/${id}?api_key=${apiKey}`)
  return resp?.data
}

// CREDITS
export const fetchCredits = async (type, id) => {
  const resp = await axios.get(
    `${baseUrl}/${type}/${id}/credits?api_key=${apiKey}`
  )
  return resp?.data
}


// MOVIES & SERIES - Videos
export const fetchVideos = async (type, id) => {
  const resp = await axios.get(
    `${baseUrl}/${type}/${id}/videos?api_key=${apiKey}`
  )
  return resp?.data
}

// SEARCH
export const fetchMultiSearch = async (query, page) => {
  const resp = await axios.get(
    `${baseUrl}/search/multi?api_key=${apiKey}&query=${query}&page=${page}`
  )
  return resp?.data
}

// PERSON
export const fetchPerson = async (id) => {
  const resp = await axios.get(`${baseUrl}/person/${id}?api_key=${apiKey}`)
  const combinedCredits = await axios.get(
    `${baseUrl}/person/${id}/combined_credits?api_key=${apiKey}`
  )
  const images = await axios.get(
    `${baseUrl}/person/${id}/images?api_key=${apiKey}`
  )
  
  return { ...resp?.data, ...combinedCredits?.data, ...images.data }
}
