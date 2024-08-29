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


const Details = z.object({
  name: z.string(),
  backdrop_path: z.string(),
  belongs_to_collection: z.null(),
  budget: z.number(),
  first_air_date: z.string(),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  homepage: z.string(),
  id: z.number(),
  imdb_id: z.string(),
  origin_country: z.array(z.string()),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string(),
  production_companies: z.array(
    z.union([
      z.object({
        id: z.number(),
        logo_path: z.string(),
        name: z.string(),
        origin_country: z.string(),
      }),
      z.object({
        id: z.number(),
        logo_path: z.null(),
        name: z.string(),
        origin_country: z.string(),
      }),
    ])
  ),
  production_countries: z.array(
    z.object({ iso_3166_1: z.string(), name: z.string() })
  ),
  release_date: z.string(),
  revenue: z.number(),
  runtime: z.number(),
  spoken_languages: z.array(
    z.object({
      english_name: z.string(),
      iso_639_1: z.string(),
      name: z.string(),
    })
  ),
  status: z.string(),
  tagline: z.string(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
})

// inferred types
export type TMDBResponseType = z.infer<typeof TMDBResponseSchema>
export type Details = z.infer<typeof Details>
