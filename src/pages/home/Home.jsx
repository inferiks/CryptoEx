import { Container } from "@mui/material"
import Exchange from "../../components/exchange/Exchange"
import Reviews from "../../components/reviews/Reviews"

export const Home = function () {
  return (
    <Container>
      <Exchange />
      <Reviews />
    </Container>
  )
}