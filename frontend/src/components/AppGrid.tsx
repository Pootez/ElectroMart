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
        lg: aside ? `"nav nav" "main aside"` : `"nav nav" "main main"`,
      }}
      templateColumns={{
        base: '1fr',
        lg: '2fr 1fr',
      }}
      templateRows="50px 1fr"
      gap={3} height="100vh" bg="primary"
    >
      <GridItem area="nav">
        <Navbar />
      </GridItem>
      <GridItem area="main">{children}</GridItem>
      {aside && <GridItem area="aside">{aside}</GridItem>}
    </Grid>
  )
}
