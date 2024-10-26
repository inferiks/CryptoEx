import { Container, Grid2 as Grid } from "@mui/material";
import './order.sass';
import { useEffect, useState } from "react";

const Order = () => {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const formattedDate = date.toLocaleString("ru-RU", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
    setCurrentDate(formattedDate);
  }, []);

  return (
    <Container sx={{ paddingTop: "100px" }}>
      <Grid container>
        <Grid size={10} className="exchange__window exchange__window_info">
          <div className="exchange__date">
            <h2>Order №XXXXXX</h2>
            <span>{currentDate}</span>
          </div>
          <div className="exchange__currency">
            <h3>Currency exchange rate: xxx Currency1 = xxx Currency2</h3>
            <span>Fixed exchange rate</span>
          </div>
        </Grid>
        <Grid size={10} className="exchange__window">

        </Grid>
      </Grid>
    </Container>
  );
};

export default Order;
