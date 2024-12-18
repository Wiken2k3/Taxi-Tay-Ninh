import React, { useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import './Navbar.css'; // Nhập tệp CSS
import { useDispatch, useSelector } from "react-redux";
import {  logoutUser } from "../../redux/slices/authSlice";
import { fetchAllTotal } from "../../redux/slices/statisticsSlice";


const AppNavbar =({ Toggle }) =>{
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const { totalCommetPending,totalContactPending,isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.statistics);

  useEffect(() => {
    dispatch(fetchAllTotal())
  }, [])


  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand className="d-block d-md-none" onClick={Toggle}>
          <i className="bi bi-justify toggle-icon"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto  me-2 fs-4">
            <Nav.Link href="/admin">
              <i className="bi bi-gear "></i>
            </Nav.Link>
            <Nav.Link href="/admin/contact" className="position-relative">
              <i className="bi bi-envelope fs-4"></i> {/* Biểu tượng hộp thư */}
              {totalContactPending > 0 && (
                <span className="badge bg-danger">
                  {totalContactPending}
                </span>
              )}
            </Nav.Link>
            <Nav.Link href="/admin/comment" className="position-relative">
              <i className="bi bi-chat fs-4"></i> {/* Biểu tượng hộp thư */}
              {totalCommetPending > 0 && (
                <span className="badge bg-danger">
                  {totalCommetPending}
                </span>
              )}
            </Nav.Link>
            <NavDropdown
              title={
                
                <>
                  <i className="bi bi-person-circle me-2 " ></i>
                  {currentUser && currentUser.name }
                </>
              }
              id="basic-nav-dropdown"
              className="dropdown-menu-end"
              align="end"
            >

              <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;