import { Grid, GridItem } from '@chakra-ui/react'
import { Navbar } from './Navbar'

export const AppGrid = ({
  children,
  aside,
}: {
  children?: any
  aside?: any
}) => {
  return (
    <Grid
      templateAreas={{
        base: `"nav" "main"`,
        lg: aside ? `"nav nav" "aside main"` : `"nav nav" "main main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '200px 1fr',
      }}
      templateRows="50px 1fr"
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <GridItem area="main">{children}</GridItem>
      {aside && <GridItem area="aside">{aside}</GridItem>}
    </Grid>
  )
}
