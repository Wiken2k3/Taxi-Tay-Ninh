import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import FinanceChart from "./FinanceChart";
import BarChartTaxi from "./BarChartTaxi";
import BarChartTour from "./BarChartTour";
import CardItem from "../../components/CardItem/CardItem";
import { fetchAllTotal, fetchRevenue, fetchWeekTaxi, fetchWeekTour } from "../../redux/slices/statisticsSlice";
import { useDispatch, useSelector } from "react-redux";
import { toVietnamCurrency } from "../../helpers/currencyHelper";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";



const  Home =({ setToggle }) => {
  const location = useLocation();
  const dispatch = useDispatch()
  useEffect(() => {
    if (window.innerWidth > 768) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [location.pathname, setToggle]);

  const { 
    totalRevenue,
    totalTourBooking,
    totalTaxiBooking,
    totalTour,
    totalUser,
    totalCar,
    totalNews,
    totalComment,
    isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.statistics);

  useEffect(() => {
    dispatch(fetchAllTotal())
  }, [])


  return (
    <div className="p-3">
      <Container fluid>
        <Row>
          <CardItem
            icon="bi-currency-dollar"
            title="Doanh Thu"
            value={toVietnamCurrency(totalRevenue)}
            iconColor="text-success"
          />
          <CardItem
            icon="bi-car-front"
            title="Tổng Chuyển Taxi"
            value={totalTaxiBooking}
            iconColor="text-danger"
          />
          <CardItem
            icon="bi-briefcase"
            title="Tổng Chuyển Tour"
            value={totalTourBooking}
            iconColor="text-primary"
          />
          <CardItem
            icon="bi-geo-alt"
            title="Tổng Tour"
            value={totalTour}
            iconColor="text-warning"
          />
          <CardItem
            icon="bi-person"
            title="Người Dùng"
            value={totalUser}
            iconColor="text-info"
          />
          <CardItem
            icon="bi-car-front"
            title="Tổng Xe Dịch Vụ"
            value={totalCar}
            iconColor="text-warning"
          />
          <CardItem
            icon="bi-newspaper"
            title="Tổng Tin Tức"
            value={totalNews}
            iconColor="text-primary"
          />
          <CardItem
            icon="bi-chat-text"
            title="Tổng Bình Luận"
            value={totalComment}
            iconColor="text-secondary"
          />

        </Row>
        <Row>
          <Col xs={12} md={6} className="p-3">
            <BarChartTaxi />
       
          </Col>
          <Col xs={12} md={6} className="p-3">
            <BarChartTour />
          </Col>
          <Col xs={12} md={12} className="p-3">
            <FinanceChart />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Home