import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./PopularPlaces.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchAllTours, fetchTourHot } from "../../../redux/slices/tourSlice";
import TourModal from "../Tour/TourModal";
import { toVietnamCurrency } from "../../../helpers/currencyHelper";


const  PopularPlaces = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);


    const dispatch = useDispatch();
    const { listTours } = useSelector(state => state.tour);

    useEffect(() => {
        dispatch(fetchAllTours({ page: 1, limit: 1000 }))
    }, [])

  
    const handleShowModal = (prop) => {
        setSelectedProduct(prop);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };



    return (
        <>
            <Row className="g-4 tour-row">
                {listTours.map((popular) => (
                    <Col xs={12} sm={8} md={4} key={popular._id}>
                        <Card className="product-card">
                            {popular.images.length > 0 && (
                                <Card.Img variant="top" src={`${process.env.REACT_APP_NESTJS_APP_URL}${popular.images[0]}`} />
                            )}
                            <Card.Body>
                                <Card.Title>{popular.title}</Card.Title>
                                <Card.Text>{popular.location}</Card.Text>
                                <Card.Text>{toVietnamCurrency(popular.price)}</Card.Text>
                                <button
                                    className="btn btn-tour"
                                    onClick={() => handleShowModal(popular)}
                                >
                                    Đăng ký
                                </button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {selectedProduct && (
                <TourModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </>
    );
}

export default PopularPlaces;
