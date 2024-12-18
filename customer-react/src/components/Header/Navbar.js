




import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/images/loginn-Photoroom.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const NavBar = ()=> {
  const [expanded, setExpanded] = useState(false);
  const { currentUser, isLoading, isError, isSuccess, errorMessage, actionType } = useSelector(state => state.auth);
  const dispatch = useDispatch();


  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar-custom");
      if (window.scrollY > 70) {
        navbar.classList.add("navbar-scrolled");
      } else {
        navbar.classList.remove("navbar-scrolled");
      }
    };



    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const handleToggle = () => setExpanded(!expanded);
  const handleClose = () => setExpanded(false);

  const handleLogout = async () => {
    await dispatch(logoutUser()).unwrap();
    toast.success("Đăng xuất thành công");

  };




  return (
    <Navbar expanded={expanded} expand="lg" className="navbar-custom">
      <Container >
        <Navbar.Brand href="/" className="brand">
          <img src={logo} className="d-inline-block align-top" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav" className="nav-container">
          <Nav className="mr-auto nav-left" onClick={handleClose}>
            <Nav.Link as={Link} to="/">TRANG CHỦ</Nav.Link>
            <Nav.Link as={Link} to="/booking">ĐẶT XE THEO YÊU CẦU</Nav.Link>
            <Nav.Link as={Link} to="/tour">TOUR</Nav.Link>
            <Nav.Link as={Link} to="/news">TIN TỨC</Nav.Link>
            <Nav.Link as={Link} to="/contact">LIÊN HỆ</Nav.Link>
          </Nav>
          <Nav className="ml-auto nav-right">
            {currentUser !== null && !Array.isArray(currentUser) ? (
              <Dropdown>
                <Dropdown.Toggle className="dropdown-toggle-custom" id="dropdown-basic">
                  <i className="bi bi-person-circle"></i>&nbsp;&nbsp;{currentUser?.name}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-custom">
                  <Dropdown.Item as={Link} to="/profile">
                    <i className="bi bi-person-fill"></i> <strong>Thông tin cá nhân</strong>
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/history">
                    <i className="bi bi-bag-fill"></i> <strong>Lịch sử</strong>
                  </Dropdown.Item>

                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout} >
                    <i className="bi bi-box-arrow-right"></i> <strong>Đăng xuất</strong>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Nav.Link as={Link} to="/login" onClick={handleClose}>
                <i className="bi bi-person-circle"></i> ĐĂNG NHẬP
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
