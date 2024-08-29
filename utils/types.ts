import * as z from 'zod'

const TMDBResponseSchema = z.object({
  backdrop_path: z.string(),
  id: z.number(),
  title: z.string(),
  name: z.string(),
  original_title: z.string(),
  overview: z.string(),
  poster_path: z.string(),
  media_type: z.string(),
  adult: z.boolean(),
  original_language: z.string(),
  genre_ids: z.array(z.number()),
  popularity: z.number(),
  release_date: z.string(),
  first_air_date: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

export type TMDBResponseType = z.infer<typeof TMDBResponseSchema>
