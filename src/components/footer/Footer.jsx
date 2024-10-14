import { Container, Link, Grid2 as Grid, Box } from "@mui/material";

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
              <Link href='#' underline="hover" color='black'>Buy crypto</Link>
              <Link href='#' underline="hover" color='black'>Contact us</Link>
              <Link href='#' underline="hover" color='black'>Something else</Link>
            </Box>
          </Grid>
          <Grid size={{ xs: 4 }}>
            <h2 style={{ position: 'sticky', top: 0 }}>Information</h2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <Link href='#' underline="hover" color='black'>Privacy policy</Link>
              <Link href='#' underline="hover" color='black'>AML/KYC policy</Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}
