import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import CloseButton from "react-bootstrap/CloseButton";
import Rating from "@mui/material/Rating";
import img1 from "../assets/54545.png";
import img2 from "../assets/Mask group.png";
import img3 from "../assets/Group 11635.png";
import img4 from "../assets/666.png";
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import moment from "moment/moment";
import axios from 'axios';
import { handleError } from "../Utilities/HandleError";
import { toast } from "react-toastify";

const CompanyList = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState(4);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [companyList, setCompanyList] = useState()
  const handleAddCompany = (data) => {
    const formattedDate = moment(data.founded).format('DD/MM/YYYY');
    if (data) {
      const url = "http://localhost:3000/api/company/";
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("review_token")
        },
      };
      const body = {

        "name": data.name,
        "founded": formattedDate,
        "address": data.address

      }
      axios.post(url, body, config).then((res) => {
        if (res.data.data) {
          toast.success("Company added successfully.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            theme: "colored",
          });
          console.log(res.data.data);
          handleClose()
          getCompanyList()
        }
      }).catch((error) => {
        toast.dismiss();
        // if (error.response.data.message) {
        //   toast.error("You have entered wrong credential for login.", {
        //     position: toast.POSITION.TOP_RIGHT,
        //     autoClose: 4000,
        //     theme: "colored",
        //   });
        // }
        if (error) {
          const getErrRes = handleError(error);
          console.log(error);
          if (getErrRes === 401) {
            navigate("/");
          } else {
            toast.error(getErrRes ? getErrRes : "Something went wrong.", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 4000,
              theme: "colored",
            });
          }
        }
      });
    }
  }

  const getCompanyList = () => {
    setLoading(true)
    const url = "http://localhost:3000/api/company/";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("review_token")
      },
    };
    axios.get(url, config).then((res) => {
      setCompanyList(res.data.data);
      setLoading(false)

    }).catch((error) => {
      setLoading(false);
      toast.dismiss();
      // if (error.response.data.message) {
      //   toast.error("You have entered wrong credential for login.", {
      //     position: toast.POSITION.TOP_RIGHT,
      //     autoClose: 4000,
      //     theme: "colored",
      //   });
      // }
      if (error) {
        const getErrRes = handleError(error);
        console.log(error);
        if (getErrRes === 401) {
          navigate("/");
        } else {
          toast.error(getErrRes ? getErrRes : "Something went wrong.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            theme: "colored",
          });
        }
      }
    });
  }
  useEffect(() => {
    getCompanyList()
  }, [])
  return (
    <>
      <Container className="mt-4">
        <Row>
          <Col className="d-flex justify-content-center align-items-center">
            <div style={{ width: "500px" }}>
              <Form.Group className="mb-3">
                <Form.Label>Select City</Form.Label>
                <Form.Control type="email" placeholder="City" />
              </Form.Group>
            </div>
            <div className="ms-3 mt-3">
              <Button
                className="bag_btn"
                style={{
                  border: "#034053",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  fontWeight: "700",
                }}
              >
                Find Company
              </Button>
            </div>
            <div className="ms-auto mt-3">
              {
                localStorage.getItem("role") === "ADMIN" ? <Button className="fw-bold bag_btn" onClick={handleShow}>
                  Add Company
                </Button> : null
              }

              <img src={img1} alt="" className="img-fluid ms-2" />
            </div>
          </Col>
          <hr className="mt-3 mb-3" />
        </Row>
        <small>Result Found : {companyList?.length}</small>
        {
          companyList?.length > 0 && companyList.map((item, index) => {
            return (
              <Row onClick={() => { navigate(`/reviewlist?campanyID=${item.id}`) }}>
                <Col>
                  <Card className="border-0 rounded shadow mt-3">
                    <Card.Body>
                      <Col className="d-flex mt-2">
                        <span>
                          <img
                            src={img3}
                            alt=""
                            width={105}
                            height={105}
                            className="img-fluid"
                          />
                        </span>
                        <div className="ms-2">
                          <small>Founder {moment(item.founded).format("YYYY")}</small>
                          <h5>{item.name}</h5>
                          <small>
                            {item.address}{" "}
                          </small>
                          <br />
                          <small>
                            4.5{" "}
                            <Rating
                              style={{ fontSize: "20px" }}
                              name="read-only"
                              value={value}
                              readOnly
                            />{" "}
                            <span className="text-secondary">45 Review</span>
                          </small>
                        </div>
                        <div
                          className="d-flex justify-content-center align-items-center"
                          style={{
                            position: "absolute",
                            right: "0",
                            top: "0"
                          }}
                        >
                          <img
                            src={img4}
                            alt=""
                            width={138}
                            height={142}
                            className="img-fluid mt-0"
                          />
                        </div>
                      </Col>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )
          })
        }
      </Container>
      <Modal show={show} onHide={handleClose}>
        <span>
          <img src={img2} alt="" className="img-fluid img_posi2" />
        </span>
        <Modal.Body>
          <CloseButton className="float-end" onClick={handleClose} />
          <h4 className="mt-5 mb-4 ms-2 text-center add_comp">Add Company</h4>
          <Form onSubmit={handleSubmit(handleAddCompany)}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter..." name="name"   {...register("name", { required: true })} />
              <span className='text-danger d-flex justify-content-start'>
                {errors.name?.type === "required" ? "Name is required." : ""}
              </span>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control type="text" placeholder="Enter Location" name="address"   {...register("address", { required: true })} />
              <span className='text-danger d-flex justify-content-start'>
                {errors.address?.type === "required" ? "Location is required." : ""}
              </span>
            </Form.Group>
            <Form.Label>Select City</Form.Label>
            <Form.Select className="mb-3">
              <option selected disabled>City</option>
              <option value="Indore">Indore</option>
              <option value="Ujjain">Ujjain</option>
              <option value="Dewas">Dewas</option>
            </Form.Select>
            <Form.Group className="mb-3">
              <Form.Label>Founded on</Form.Label>
              <Form.Control type="date" name="founded"   {...register("founded", { required: true })} />
              <span className='text-danger d-flex justify-content-start'>
                {errors.founded?.type === "required" ? "Founding date is required." : ""}
              </span>
            </Form.Group>
            <div className="d-flex justify-content-center mb-3 pt-2">
              <Button
                type="submit"
                className="bag_btn"
                style={{
                  border: "#034053",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  // paddingTop: "14px",
                  // paddingBottom: "14px",
                  fontWeight: "700",
                }}
              // onClick={handleClose}
              >
                Save
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CompanyList;
