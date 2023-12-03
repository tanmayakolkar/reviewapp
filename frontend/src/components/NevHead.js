import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/Frame 6.png";
import { Col, Form, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from "react-router-dom";
const NevHead = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login")
  }
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container fluid className="mx-5">
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top me-2"
            />
            Review&<span className="fw-bold">RATE</span>
          </Navbar.Brand>
          <Row>
            <Col xs="auto">
              <Form.Control
                type="text"
                placeholder="Search..."
                className=" mr-sm-2"
              />
            </Col>
            <Col xs="auto">
              <Dropdown>
                <Dropdown.Toggle>
                  <img
                    alt=""
                    src={logo}
                    width="30"
                    height="30"
                    className="mt-1 rounded-5"
                  />{" "}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
};

export default NevHead;
