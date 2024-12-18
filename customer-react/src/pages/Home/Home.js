import React from "react";
import { Container } from "react-bootstrap";
import "./Home.css";
import Comment from "../Comment/Comment";
import Contact from "../Contact/Contact";
import PopularPlaces from "../Product/PopularPlaces.js/PopularPlaces";
import Why from "../Why/Why";
import TableBooKing from "../Booking/TableBooking";
import OurService from "../OurService/OurService";
import NewsPage from "../News/NewsPage";



const Home = () => {

  return (
    <section className="home-section">
      <div className="home-booking">
        <Container className="home-container-booking">
          <div className="card">
            <div className="card-body">
              <h2>Đặt xe theo yêu cầu</h2>
              <div className="home-tablebooking">
                <TableBooKing />
              </div>
            </div>
          </div>
          
        </Container>
      </div>

      <Container >
        <div className="home-table">
          <div className="title">
            <h2>TẠI SAO LẠI CHỌN CHÚNG TÔI ?</h2>
          </div>
          <Why />
        </div>
      </Container>
      <Container >
        <div className="home-table">
          <div className="title">
            <h2>DỊCH VỤ CỦA CHÚNG TÔI</h2>
          </div>
          <OurService />
        </div>
      </Container>

   
      <Container>
        <div className="home-table">
          <div className="title">
            <h2>ĐIỂM ĐI PHỔ BIẾN</h2>
          </div>
          <PopularPlaces />
        </div>
      </Container>


   

      <div className="contact-table">
        <Contact />
        </div>
        
      <Container>
        <div className="omment-table">
          <div className="title">
            <h2>TIN TỨC</h2>
          </div>
          <NewsPage />
        </div>
      </Container>

   
      <div className="comment-table">
      <div className="title">
        <h2>ĐÁNH GIÁ CỦA KHÁCH HÀNG</h2>
      </div>
      <Comment />
      </div>
     
     
    </section>
   
  );
}
export default Home
