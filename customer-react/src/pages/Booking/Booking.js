import React from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Booking.css";
import MapComponent from "./GoongMap";
import TableBooKing from "./TableBooking";

const BooKing= ()=> {
  
  return (
    <section id="booking" className="block booking-block bg">
      <Container >
        <div className= "box">
        <div className="title-holder">
          <h2>ĐẶT TAXI</h2>
          <div className="subtitle">ĐẶT TAXI TÂY NINH</div>
        </div>
        <div className="boss">
          <div className="tablebooking">
            <TableBooKing />
          </div>
          <div className="Gmap d-none d-md-block">
            <MapComponent />

          </div>
        </div>
        </div>
      </Container>
    </section>
  );
}
export default  BooKing
