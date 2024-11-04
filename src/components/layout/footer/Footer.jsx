import { Container, Link as MUILink, Grid2 as Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Container sx={{ marginTop: '50px' }}>
        <Grid container alignItems='flex-start' sx={{ paddingBottom: '40px' }}>
          <Grid size={{ xs: 2 }} sx={{ margin: '0 auto' }}>
            <h2 style={{ position: 'sticky', top: 0 }}>LOGOTYPE</h2>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <h2 style={{ position: 'sticky', top: 0 }}>Links</h2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <MUILink component={Link} to='#' underline="hover" color='black'>Buy crypto</MUILink>
              <MUILink component={Link} to='#' underline="hover" color='black'>Contact us</MUILink>
              <MUILink component={Link} to='#' underline="hover" color='black'>Something else</MUILink>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <h2 style={{ position: 'sticky', top: 0 }}>Information</h2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <MUILink component={Link} to='#' underline="hover" color='black'>Privacy policy</MUILink>
              <MUILink component={Link} to='/aml-kyc' underline="hover" color='black'>AML/KYC policy</MUILink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}
