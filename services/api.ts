import axios from 'axios'

export const imagePath = 'https://image.tmdb.org/t/p/w500'

const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = process.env.NEXT_PUBLIC_TMDB_KEY

// fetch trending
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
