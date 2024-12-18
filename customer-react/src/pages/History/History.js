import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TaxiBookingHistory from './TaxiBookingHistory';
import TourBookingHistory from './TourBookingHistory';
import CommentHistory from './Comment/CommentHistory';
import './History.css';

const History = () => {
  const [activeComponent, setActiveComponent] = useState('TaxiBookingHistory');

  const renderComponent = () => {
    switch (activeComponent) {
      case 'TaxiBookingHistory':
        return <TaxiBookingHistory />;
      case 'TourBookingHistory':
        return <TourBookingHistory />;
      case 'CommentHistory':
        return <CommentHistory />;
      default:
        return <TaxiBookingHistory />;
    }
  };

  return (
    <section id="history" className="block history-block bg">
    <Container >
      <Row className="row-history">
          
          <Col xs={12} md={2} className="table-history">
         
          <div className="d-grid gap-3 " >
            <Button
              variant={activeComponent === 'TaxiBookingHistory' ? 'success' : 'outline-dark'}
              size="lg"
              className="custom-button"
              onClick={() => setActiveComponent('TaxiBookingHistory')}
            >
              Lịch sử đặt Taxi
            </Button>
            <Button
              variant={activeComponent === 'TourBookingHistory' ? 'success' : 'outline-dark'}
              size="lg"
              className="custom-button"
              onClick={() => setActiveComponent('TourBookingHistory')}
            >
              Lịch sử đặt Tour
            </Button>
            <Button
              variant={activeComponent === 'CommentHistory' ? 'success' : 'outline-dark'}
              size="lg"
              className="custom-button"
              onClick={() => setActiveComponent('CommentHistory')}
            >
              Lịch sử Comment
            </Button>
          </div>
         
       
        </Col>
          
        <Col xs={12} md={8} className="align-content-center">
          {renderComponent()}
        </Col>
      </Row>
    </Container>
      </section>
  );
};

export default History;
