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

const Cast = z.object({
  gender: z.number(),
  id: z.number(),
  known_for_department: z.string(),
  name: z.string(),
  original_name: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
  character: z.string(),
  credit_id: z.string(),
  order: z.number(),
})
const CastDetails = z.object({
  also_known_as: z.array(z.string()),
  biography: z.string(),
  birthday: z.string(),
  cast: z.array(TMDBResponseSchema),
  gender: z.number(),
  homepage: z.null(),
  id: z.number(),
  imdb_id: z.string(),
  known_for_department: z.string(),
  name: z.string(),
  place_of_birth: z.string(),
  popularity: z.number(),
  profile_path: z.string(),
  profiles: z.array(
    z.object({
      aspect_ratio: z.number(),
      height: z.number(),
      iso_639_1: z.null(),
      file_path: z.string(),
      vote_average: z.number(),
      vote_count: z.number(),
      width: z.number(),
    })
  ),
});

const Details = z.object({
  name: z.string(),
  backdrop_path: z.string(),
  belongs_to_collection: z.null(),
  birthday: z.string(),
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
export type Cast = z.infer<typeof Cast>
export type CastDetails = z.infer<typeof CastDetails>
export type Details = z.infer<typeof Details>
