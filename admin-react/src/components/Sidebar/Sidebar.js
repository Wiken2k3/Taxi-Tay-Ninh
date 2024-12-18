import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";

const Sidebar=()=> {
  const [active, setActive] = useState(1);
  const location = useLocation();
  const { currentUser } = useSelector(state => state.auth);
  const dispatch = useDispatch()



  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActive(1);
        break;
      case "/users":
        setActive(2);
        break;
      case "/tours":
        setActive(3);
        break;
      case "/taxibooking":
        setActive(4);
        break;
      case "/tourbooking":
        setActive(5);
        break;
      case "/car":
        setActive(6);
        break;
      case "/payment":
        setActive(7);
        break;
      case "/news":
        setActive(8);
        break; 
      case "/comment":
        setActive(9);
        break;
      case "/contact":
        setActive(10);
        break;
     
      default:
        setActive(1);
        break;
    }
  }, [location.pathname]);

  return (
    <Navbar className="sidebar d-flex flex-column py-3 ps-3 pe-4 vh-100">
      <Container fluid className="flex-column p-0 h-100">
        <Navbar.Brand className="title p-3">
          <span className="fs-4 text-uppercase fw-bold">Taxi Tay Ninh</span>
        </Navbar.Brand>

        <Nav className="flex-column mt-3 flex-grow-1 menu" activeKey={active}>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/"
              eventKey={1}
              onClick={() => setActive(1)}
              className={active === 1 ? "active" : ""}
            >
              <i className="bi bi-speedometer2 me-3 fs-5"></i>
              <span className="fs-3">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/users"
              eventKey={2}
              onClick={() => setActive(2)}
              className={active === 2 ? "active" : ""}
            >
              <i className="bi bi-people me-3 fs-4"></i>
              <span className="fs-4">User</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/tours"
              eventKey={3}
              onClick={() => setActive(3)}
              className={active === 3 ? "active" : ""}
            >
              <i className="bi bi-table me-3 fs-4"></i>
              <span className="fs-4">Tour</span>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/taxibooking"
              eventKey={4}
              onClick={() => setActive(4)}
              className={active === 4 ? "active" : ""}
            >
              <i className="bi bi-receipt me-3 fs-4"></i>
              <span className="fs-4">Order Taxi</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/tourbooking"
              eventKey={5}
              onClick={() => setActive(5)}
              className={active === 5 ? "active" : ""}
            >
              <i className="bi bi-receipt me-3 fs-4"></i> 
              <span className="fs-4">Order Tour</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/car"
              eventKey={6}
              onClick={() => setActive(6)}
              className={active === 6 ? "active" : ""}
            >
              <i className="fas fa-car me-3 fs-5"></i>
              <span className="fs-3">Car</span> 
            </Nav.Link>
          </Nav.Item>


          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/payment"
              eventKey={7}
              onClick={() => setActive(7)}
              className={active === 7 ? "active" : ""}
            >
              <i className="fas fa-receipt me-3 fs-5"></i>
              <span className="fs-3">Payment</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/news"
              eventKey={8}
              onClick={() => setActive(8)}
              className={active === 8 ? "active" : ""}
            >
              <i className="fas fa-newspaper me-3 fs-5"></i>
              <span className="fs-3">News</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/comment"
              eventKey={9}
              onClick={() => setActive(9)}
              className={active === 9 ? "active" : ""}
            >
              <i className="fas fa-comment me-3 fs-5"></i>
              <span className="fs-3">Comment</span>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link
              as={Link}
              to="/contact"
              eventKey={10}
              onClick={() => setActive(10)}
              className={active === 10 ? "active" : ""}
            >
              <i className="fas fa-envelope me-3 fs-5"></i>
              <span className="fs-3">Contact</span>
            </Nav.Link>
          </Nav.Item>

         
          
        </Nav>
        <Nav.Item className="profile-section p-2 mt-auto">
          <Nav.Link href="/" className="p-1 text-decoration-none">
            <i className="bi bi-person-circle me-3 fs-4"></i>
            <span className="fs-4">
              <strong>{currentUser.role}</strong>
            </span>
          </Nav.Link>
        </Nav.Item>
      </Container>
    </Navbar>
  );
}

export default Sidebar;
