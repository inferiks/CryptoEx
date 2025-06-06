import { Container, Link as MUILink, Grid2 as Grid, Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer>
      <Container sx={{ marginTop: '10rem' }}>
        <Grid container alignItems='flex-start' sx={{ paddingBottom: '40px' }}>
          <Grid size={{ md: 2, sm: 12, xs: 12 }} sx={{ margin: '0 auto' }}>
            <Link to="/">
              <svg className="header-logo" width="96px" height="96px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M4.5 6C4.5 5.17157 5.17157 4.5 6 4.5H9C9.82843 4.5 10.5 5.17157 10.5 6V7H13.5V6C13.5 5.17157 14.1716 4.5 15 4.5H18C18.8284 4.5 19.5 5.17157 19.5 6V9C19.5 9.82843 18.8284 10.5 18 10.5H17V13.5H18C18.8284 13.5 19.5 14.1716 19.5 15V18C19.5 18.8284 18.8284 19.5 18 19.5H15C14.1716 19.5 13.5 18.8284 13.5 18V17H10.5V18C10.5 18.8284 9.82843 19.5 9 19.5H6C5.17157 19.5 4.5 18.8284 4.5 18V15C4.5 14.1716 5.17157 13.5 6 13.5H7V10.5H6C5.17157 10.5 4.5 9.82843 4.5 9V6ZM16 10.5H15C14.1716 10.5 13.5 9.82843 13.5 9V8H10.5V9C10.5 9.82843 9.82843 10.5 9 10.5H8V13.5H9C9.82843 13.5 10.5 14.1716 10.5 15V16H13.5V15C13.5 14.1716 14.1716 13.5 15 13.5H16V10.5ZM6 5.5C5.72386 5.5 5.5 5.72386 5.5 6V9C5.5 9.27614 5.72386 9.5 6 9.5H9C9.27614 9.5 9.5 9.27614 9.5 9V6C9.5 5.72386 9.27614 5.5 9 5.5H6ZM5.5 15C5.5 14.7239 5.72386 14.5 6 14.5H9C9.27614 14.5 9.5 14.7239 9.5 15V18C9.5 18.2761 9.27614 18.5 9 18.5H6C5.72386 18.5 5.5 18.2761 5.5 18V15ZM14.5 15C14.5 14.7239 14.7239 14.5 15 14.5H18C18.2761 14.5 18.5 14.7239 18.5 15V18C18.5 18.2761 18.2761 18.5 18 18.5H15C14.7239 18.5 14.5 18.2761 14.5 18V15ZM14.5 6C14.5 5.72386 14.7239 5.5 15 5.5H18C18.2761 5.5 18.5 5.72386 18.5 6V9C18.5 9.27614 18.2761 9.5 18 9.5H15C14.7239 9.5 14.5 9.27614 14.5 9V6Z" fill="#47495F" />
              </svg>
            </Link>
          </Grid>
          <Grid size={{ md: 4, sm: 12, xs: 12 }}>
            <h2 style={{ position: 'sticky', top: 0 }}>Links</h2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
              <MUILink component={Link} to='/' underline="hover" color='black'>Buy crypto</MUILink>
              <MUILink component={Link} to='https://t.me/hurricane751' target="_blank" underline="hover" color='black'>Contact us</MUILink>
            </Box>
          </Grid>
          <Grid size={{ md: 4, sm: 12, xs: 12 }}>
            <h2 style={{ position: 'sticky', top: 0 }}>Information</h2>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px', textAlign: 'left' }}>
              <MUILink component={Link} to='/privacy' underline="hover" color='black'>Privacy policy</MUILink>
              <MUILink component={Link} to='/aml-kyc' underline="hover" color='black'>AML/KYC policy</MUILink>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}
