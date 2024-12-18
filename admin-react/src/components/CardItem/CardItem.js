import React from 'react';
import { Col } from 'react-bootstrap';
import './CardItem.css'
const CardItem = ({ icon, title, value, iconColor }) => {
    return (
        <Col xs={12} sm={6} md={4} lg={3} className="p-3">
            <div className='card-item '>
           
                <i className={`bi ${icon} fs-1 ${iconColor}`}></i>
                <div>
                    <span>{title}</span>
                    <h2>{value}</h2>
                </div>
            
            </div>
        </Col>
    );
};

export default CardItem;
