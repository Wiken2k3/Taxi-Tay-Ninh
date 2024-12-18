import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import './Why.css';
import expenrience from "../../assets/images/expenrience.png";
import clock from "../../assets/images/clock.png";
import hours from "../../assets/images/hours.png";
import price from "../../assets/images/price.png";

const Why = () => {
    const places = [
        {
            id: 1,
            title: "Hơn 10 năm kinh nghiệm",
            description: "Với đội ngũ nhiều năm kinh nghiệm trong lĩnh vực cho thuê xe, chúng tôi cam kết cung cấp dịch vụ với chất lượng tốt nhất.",
            imageUrl: expenrience
        },
        {
            id: 2,
            title: "Tiết kiệm thời gian",
            description: "Đến với chúng tôi, quý khách sẽ được cung cấp dịch vụ nhanh nhất với chất lượng tốt nhất và giá cả cạnh tranh.",
            imageUrl: clock
        },
        {
            id: 3,
            title: "Tiết kiệm chi phí",
            description: "Đến với chúng tôi, quý khách sẽ được cung cấp dịch vụ nhanh nhất với chất lượng tốt nhất và giá cả cạnh tranh.",
            imageUrl: price
        },
        {
            id: 4,
            title: "Dịch vụ 24/7",
            description: "Đến với chúng tôi, quý khách sẽ được cung cấp dịch vụ nhanh nhất với chất lượng tốt nhất và giá cả cạnh tranh.",
            imageUrl: hours
        },
      
       
    ];
    return (
        <Row className="g-4 why-row">
            {places.map((place) => (
                <Col xs={12} sm={6} md={4} lg={3} key={place.id}>
                    <Card className="why-card">
                        
                        <Card.Img variant="top" src={place.imageUrl} />
                        <Card.Body>
                            <Card.Title >{place.title}</Card.Title>
                            <Card.Text>{place.description}</Card.Text>
                            
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default Why;

