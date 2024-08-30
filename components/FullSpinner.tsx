import { Grid, Spinner } from '@chakra-ui/react'

function FullSpinner() {
  return (
    <Grid
      placeContent={'center'}
      position={'absolute'}
      inset={'0'}
      height={'100vh'}
    >
      <Spinner size={'xl'} color={'red'} />
    </Grid>
  )
}

export default FullSpinner
