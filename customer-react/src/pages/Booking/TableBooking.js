import React, { useCallback, useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Booking.css";
import { fetchAllCar } from "../../redux/slices/carSlice";
import { useDispatch, useSelector } from "react-redux";
import goongIoService from "../../services/goongIoService";
import debounce from 'lodash.debounce';
import { setOrigin, setDestination } from '../../redux/slices/mapSlice';
import ConfirmModal from "./ConfirmModal";
import { toast } from "react-toastify";


const TableBooKing = ()=> {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [dropoffSuggestions, setDropoffSuggestions] = useState([]);
  const [serviceType, setServiceType] = useState("1 chiều");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [carType, setCarType] = useState("4 Chỗ");
  const [showSumitModal, setShowSumitModal] = useState(false);
  const [pickupLatLng, setPickupLatLng] = useState({ lat: null, lng: null });
  const [dropoffLatLng, setDropoffLatLng] = useState({ lat: null, lng: null });
  const [dataBooking, setDataBooking] = useState("4 Chỗ");


  const dispatch = useDispatch()
  const listCars = useSelector(state => state.car.listCars)


  useEffect(() => {
    dispatch(fetchAllCar({ page: 1, limit: 30 }))
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      pickupLocation,
      dropoffLocation,
      serviceType,
      departureDate,
      returnDate,
      carType,
      pickupLatLng,
      dropoffLatLng,
    }
    setDataBooking(data)
  
    setShowSumitModal(true);
  };

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickupLocation(value);
    debouncedFetchPickupSuggestions(value);

  };
  const handleDropoffChange = (e) => {
    const value = e.target.value;
    setDropoffLocation(value);
    debouncedFetchDropoffSuggestions(value);
  };
  const debouncedFetchPickupSuggestions = useCallback(
    debounce((value) => fetchSuggestions(value, setPickupSuggestions), 300),
    []
  );

  const debouncedFetchDropoffSuggestions = useCallback(
    debounce((value) => fetchSuggestions(value, setDropoffSuggestions), 300),
    []
  );

  const fetchSuggestions = async (value, setSuggestions) => {
    if (value.length > 2) {
      try {
        const results = await goongIoService.fetchPlaceSuggestions(value);

        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching location suggestions', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handlePickupSelect = async (suggestion) => {
    setPickupLocation(suggestion.description);
    setPickupSuggestions([]);

    try {
      const { lat, lng } = await goongIoService.fetchPlaceDetails(suggestion.place_id);
      setPickupLatLng({ lat, lng });
      dispatch(setOrigin(`${ lat },${ lng }`))

    } catch (error) {
      toast.error(error)
    }
  };

  const handleDropoffSelect = async (suggestion) => {
    setDropoffLocation(suggestion.description);
    setDropoffSuggestions([]);

    try {
      const { lat, lng } = await goongIoService.fetchPlaceDetails(suggestion.place_id);
      setDropoffLatLng({ lat, lng });
      dispatch(setDestination(`${lat},${lng}`))

    } catch (error) {
      console.error('Error fetching dropoff place details', error);
    }
  };

  return (
    <Row>
      <Col md={12}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="ms-1 mb-3 custom-form-group" controlId="pickup">
            <Form.Label>
              <i className="fas fa-map-marker-alt text-danger"></i> Nhập điểm đón
            </Form.Label>
            <Form.Control
              type="text"        
              placeholder="Nhập điểm đón"
              value={pickupLocation}
              onChange={handlePickupChange}
             
              required
            />
            {pickupSuggestions.length > 0 && (
              <ul className="list-group">
                {pickupSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="list-group-item"
                    onClick={() => handlePickupSelect(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>

          <Form.Group className="ms-1 mb-3 custom-form-group" controlId="dropoff ">
            <Form.Label>
              <i className="fas fa-map-marker-alt text-primary"></i> Nhập điểm trả
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập điểm trả"
              value={dropoffLocation}
              onChange={handleDropoffChange}
              required
            />
            {dropoffSuggestions.length > 0 && (
              <ul className="list-group">
                {dropoffSuggestions.map((suggestion) => (
                  <li
                    key={suggestion.place_id}
                    className="list-group-item"
                    onClick={() => handleDropoffSelect(suggestion)}
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </Form.Group>

          <Form.Group className="ms-1 mb-3 custom-form-group" controlId="serviceType">
            <Form.Label>
              <i className="fas fa-cogs text-success"></i> Dịch vụ
            </Form.Label>
            <Form.Select
              value={serviceType}
              required
              onChange={(e) => setServiceType(e.target.value)}
            >
              
              <option>1 chiều</option>
              <option>2 chiều đưa đi đón về</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="ms-1 mb-3 custom-form-group" controlId="departureDateTime">
            <Form.Label>
              <i className="fas fa-calendar-alt"></i> Ngày & Giờ đi
            </Form.Label>
            <Form.Control
              type="datetime-local"
              value={departureDate}
              required
              onChange={(e) => setDepartureDate(e.target.value)}
            />
          </Form.Group>

          {serviceType !== "1 chiều" && (
            <Form.Group className="ms-1 mb-3 custom-form-group" controlId="returnDateTime">
              <Form.Label>
                <i className="fas fa-calendar-alt"></i> Ngày & Giờ về
              </Form.Label>
              <Form.Control
                type="datetime-local"
                value={returnDate}
                required
                onChange={(e) => setReturnDate(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className=" ms-1 mb-3 custom-form-group" controlId="carType">
            <Form.Label>
              <i className="fas fa-car text-danger"></i> Loại xe
            </Form.Label>
            <div className="radio-group"> {/* Thêm lớp Flexbox với flex-wrap */}
              {listCars.map((car, index) => (
                <Form.Check
                  key={index}
                  type="radio"
                  id={`carType-${index}`}
                  label={car.carType}
                  value={car.carType}
                  checked={carType === car.carType}
                  onChange={(e) => setCarType(e.target.value)}
                  name="carType" // Tên chung cho nhóm radio button
                />
              ))}
              
            </div>
          </Form.Group>
          <Button className="sumitcar" type="submit" variant="success">
            Đặt xe
          </Button>
        </Form>
      </Col>
      {/* Show the SumitBooKing modal */}
      {showSumitModal && (
        <ConfirmModal
          show={showSumitModal}
          handleClose={() => setShowSumitModal(false)}
          taxiData={dataBooking}
          
        />
      )}
    </Row>
  );
}

export default  TableBooKing