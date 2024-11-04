import { Button, ButtonGroup, Container, Grid2 as Grid } from "@mui/material";
import './order.sass';
import { useEffect, useState } from "react";
import SwapIcon from "../common/SwapIcon";

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
        <Grid size={10} className="order__window order__window_info">
          <div className="order__date">
            <h2>Order №XXXXXX</h2>
            <span>{currentDate}</span>
          </div>
          <div className="order__info">
            <h3>Currency order rate: xxx Currency1 = xxx Currency2</h3>
            <span>Fixed order rate</span>
          </div>
        </Grid>
        <Grid size={10} className="order__window">
          <div className="order__amount ">
            <img src="https://cryptologos.cc/logos/tether-usdt-logo.svg" alt="" style={{ width: '30px', height: '30px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
              <div className="order__currency">
                Tether(TRC20)
              </div>
              <span className="order__total">5,100.99</span>
            </div>
          </div>
          <SwapIcon isClickable={false} />
          <div className="order__amount ">
            <img src="https://cryptologos.cc/logos/toncoin-ton-logo.svg" alt="" style={{ width: '30px', height: '30px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '20px' }}>
              <div className="order__currency">
                Toncoin(TON)
              </div>
              <span className="order__total">5,100.99</span>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid size={1} />
        <Grid size={5} className="order__transfer_info">
          <h3>Amount to be paid</h3>
          <span>
            5,100.99
          </span>
          <h3>Payment requisites</h3>
          <span>
            TPAgKfYzRdK83Qocc4gXvEVu4jPKfeuer5
          </span>
          <h3>MEMO / TAG</h3>
          <span>
            1239875764
          </span>
        </Grid>
        <Grid size={1} />
        <Grid size={4} className="order__address">
          <h2>Address:</h2>
          <span>UQCI7d2SQ9ili8W41vpsIuaMyVmBMQcsBxEcM01UE5aL-j5l</span>
        </Grid>
      </Grid>
      <ButtonGroup disableRipple sx={{ display: 'flex', margin: '50px auto', width: '500px', height: '60px' }}>
        <Button color='error' sx={{ width: '50%', borderRadius: '30px' }} >Cancel</Button>
        <Button variant="contained" sx={{ bgcolor: '#21ba72b3', color: '#fff', width: '50%', borderRadius: '30px' }}>I paid order</Button>
      </ButtonGroup>
    </Container>
  );
};

export default Order;
