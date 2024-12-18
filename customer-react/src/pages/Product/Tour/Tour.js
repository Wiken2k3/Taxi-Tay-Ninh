import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import TourModal from "./TourModal"; // Import the TourModal component
import "./Tour.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllTours } from "../../../redux/slices/tourSlice";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { FormControl, InputGroup } from "react-bootstrap";
import { toVietnamCurrency } from "../../../helpers/currencyHelper";

const Tour = () => {
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState("All");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const dispatch = useDispatch();
    const { listTours, isLoading, isError, isSuccess, errorMessage, actionType, totalPages } = useSelector(state => state.tour);
    
    useEffect(  () => {
        dispatch(fetchAllTours({page:page,limit:limit}))
    },[])

    

    useEffect(() => {

        if (isSuccess) {
            if (actionType === 'ADD_TOURBOOKING') {
                toast.success("Thanh toán thành công");
            } 
        }

        if (isError) {
            toast.error(errorMessage || "Đã xảy ra lỗi");
        }
    }, [isSuccess, isError, errorMessage, actionType, dispatch]);



    const handlePageClick = (event) => {

        const selectedPage = event.selected + 1;
        setPage(selectedPage)
        dispatch(fetchAllTours({ page: selectedPage, limit: limit }))
    };


    const filteredTours = listTours
        .filter((tour) => {
            const matchesSearch =
                (tour.price?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (tour.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                (tour.location?.toLowerCase() || '').includes(searchTerm.toLowerCase());
            return matchesSearch;
        })
        .sort((a, b) => {
            if (selected === 'asc') {
                return a.price - b.price; // Sắp xếp từ thấp đến cao
            } else {
                return b.price - a.price; // Sắp xếp từ cao đến thấp
            }
        });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);

    };
    const handleChange = (e) => {

        setSelected(e.target.value);

    };
    const handleItemsPerPageChange = (e) => {
        const newLimit = Number(e.target.value);
        setLimit(newLimit);
        dispatch(fetchAllTours({ page: page, limit: newLimit }))

    };

    const handleShowModal = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProduct(null);
    };

    return (
        <section id="profile" className="block tour-block">
            <Container>
                <div className="tour-container">
                <div className="title-holder">
                    <h2>TOUR</h2>
                    <div className="subtitle">TẤT CẢ CÁC TOUR</div>
                </div>
                    
                    <div className="content-tour">
                        <Row className="mb-3 tour-row">
                            <Col xs={12} md={2} className="mb-3 mb-md-0">
                                <Form.Select onChange={handleChange} value={selected}>
                                    <option value="asc">Giá thấp đến cao</option>
                                    <option value="desc">Giá cao đến thấp</option>
                                </Form.Select>
                            </Col>
                            <Col xs={12} md={3} className="mb-3 mb-md-0 text-md-end">
                                <Form.Select onChange={handleItemsPerPageChange} value={limit}>
                                    <option value={10}>10 mục mỗi trang</option>
                                    <option value={20}>20 mục mỗi trang</option>
                                    <option value={50}>50 mục mỗi trang</option>
                                </Form.Select>
                            </Col>
                            <Col xs={12} md={4} className="mb-3 mb-md-0">
                                <InputGroup>
                                    <FormControl
                                        placeholder="Tìm kiếm ..."
                                        value={searchTerm}
                                        onChange={handleSearchChange} />
                                </InputGroup>
                            </Col>
                        </Row>  
               
                    <Row className="g-4 tour-row">
                            {filteredTours.map((product) => (
                            <Col xs={12} sm={8} md={4} key={product._id}>
                                <Card className="product-card">
                                    {product.images.length>0 &&(
                                        <Card.Img variant="top" src={`${process.env.REACT_APP_NESTJS_APP_URL}${product.images[0]}`} />
                                    )}
                                    
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Text>{product.location}</Card.Text>
                                        <Card.Text>{toVietnamCurrency(product.price)}</Card.Text>
                                        <button
                                            className="btn btn-tour"
                                            onClick={() => handleShowModal(product)}
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
                </div>
                <ReactPaginate
                    nextLabel=">"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={1}
                    marginPagesDisplayed={1}
                    pageCount={totalPages}
                    previousLabel="<"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />

                </div>
            </Container>
        </section>
    );
};

export default Tour;
