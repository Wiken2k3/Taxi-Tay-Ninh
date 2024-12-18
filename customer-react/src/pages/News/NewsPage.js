
import React, { useEffect } from "react";
import "./NewsPage.css";
import n1 from "../../assets/images/Address.png";
import n2 from "../../assets/images/Address.png";
import n3 from "../../assets/images/Address.png";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNews } from "../../redux/slices/newsSlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


const NewsPage = () => {
    const { listNews, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.news);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchAllNews({ page: 1, limit: 100 }))
    }, [])

    const navigate = useNavigate();


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        vertical: false, // Đảm bảo thuộc tính này được đặt là false
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const handleCardClick = (id) => {
        navigate(`/news/${id}`);
    };


    return (



        <section className="news-page">
            <Container fluid className="news-page-container">
                <Slider {...settings} className="news-page-slider">
                    {listNews.map((item) => (
                        <div key={item._id} className="news-page-slide">
                            <Card className="news-page-item">
                                <Card.Img variant="top" src={`${process.env.REACT_APP_NESTJS_APP_URL}${item.thumbnail[0]}`} />
                                <Card.Body>
                                    <Card.Title className="news-page-title">{item.title}</Card.Title>
                                    <Card.Text className="news-page-text">{item.summary}</Card.Text>
                                    <Button className="btn btn-tour"  onClick={() => handleCardClick(item._id)} >Xem Thêm</Button>
                                </Card.Body>

                            </Card>
                        </div>
                    ))}
                </Slider>
            </Container>
        </section>

    );
};

export default NewsPage;
