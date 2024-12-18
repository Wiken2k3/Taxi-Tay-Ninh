import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './OurService.css';
import Wedding from "../../assets/images/Wedding.png";
import Birthday from "../../assets/images/Birthday.png";
import Plane from "../../assets/images/Plane.png";
import Hospital from "../../assets/images/Hospital.png";

const OurService = () => {
    const navigate = useNavigate();

    const places = [
        {
            id: 1,
            title: "Đặt xe đi bệnh viện",
            description: "Bạn cần đi bệnh viện gấp? Đặt xe ngay để được đón tận nơi, nhanh chóng và an toàn. Chúng tôi cam kết mang đến cho bạn trải nghiệm dịch vụ tốt nhất.",
            imageUrl: Hospital
        },
        {
            id: 2,
            title: "Đặt xe đi máy bay",
            description: "Đặt xe sân bay ngay hôm nay để tận hưởng dịch vụ chuyên nghiệp, giá cả hợp lý. Đến sân bay đúng giờ, bắt đầu chuyến đi thật trọn vẹn!",
            imageUrl: Plane
        },
        {
            id: 3,
            title: "Đặt xe đi ăn sinh nhật",
            description: "Sinh nhật thêm phần ý nghĩa với dịch vụ taxi đưa đón tận nơi. Cả nhóm sẽ có một chuyến đi thật vui vẻ và thoải mái. Đặt xe ngay để nhận nhiều ưu đãi hấp dẫn!",
            imageUrl: Birthday
        },
        {
            id: 4,
            title: "Đặt xe đi đám cưới",
            description: "Đám cưới trọn vẹn hơn khi bạn không phải lo lắng về việc di chuyển. Taxi sẽ đưa đón bạn và khách mời một cách thuận tiện nhất.",
            imageUrl: Wedding
        },
    ];

    const handleCardClick = () => {
        navigate('/booking');
        window.scrollTo(0, 0); // Cuộn lên đầu trang sau khi điều hướng
    };

    return (
        <Row className="g-4 ourservice-row">
            {places.map((place) => (
                <Col xs={12} sm={6} md={4} lg={3} key={place.id}>
                    <Card className="ourservice-card" onClick={handleCardClick}>
                        <Card.Img variant="top" src={place.imageUrl} />
                        <Card.Body>
                            <Card.Title>{place.title}</Card.Title>
                            <Card.Text>{place.description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>
    );
};

export default OurService;
