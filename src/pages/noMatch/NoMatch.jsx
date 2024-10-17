import { Container, Button, Grid2 as Grid } from "@mui/material"
import notFound from "../../assets/notFound.svg"


const NoMatch = () => {
  return (
    <Container>
      <Grid container>
        <Grid size={6} sx={{ margin: '10vh auto', textAlign: 'center' }}>
          <img src={notFound} style={{ width: '300px' }} />
          <h2 style={{ fontSize: '50px' }}>Page not found</h2>
          <div style={{ marginTop: '20px' }}>Sorry, we couldn't find the page you're looking for.<br /> Perhaps you've mistyped the URL? Be sure to check <br />your spelling.</div>
          <Button sx={{ marginTop: '30px' }}>Go to homepage</Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NoMatch