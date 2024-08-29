export const minutesTohours = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60

  return `${hours}h ${mins}m`
}

export const ratingToPercentage = (rating: number): string => {
  return (rating * 10)?.toFixed(0)
}

export const resolveRatingColor = (rating: number): string => {
  if (rating >= 7) {
    return 'green.400'
  } else if (rating >= 5) {
    return 'orange.400'
  } else {
    return 'red.400'
  }
}
