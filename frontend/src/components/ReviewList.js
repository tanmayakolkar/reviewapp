import * as React from "react";
import { useState } from "react";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CloseButton from "react-bootstrap/CloseButton";
import img1 from "../assets/Group 11635.png";
import img2 from "../assets/Mask group.png";
import img3 from "../assets/Ellipse 5.png";
import img4 from "../assets/Ellipse ff.png";
import img5 from "../assets/Ellipse 555.png";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import { handleError } from "../Utilities/HandleError";
import { toast } from "react-toastify";
import moment from "moment";
import { useForm } from 'react-hook-form';


const ReviewList = () => {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState(0);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false)
  const [companyDetails, setCompanyDetails] = useState()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();



  const getCompanyDetails = () => {
    console.log(searchParams.get("campanyID"));
    if (searchParams.get("campanyID")) {
      const url = `http://localhost:3000/api/company/${searchParams.get("campanyID")}/`
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("review_token")
        },
      };
      axios.get(url, config).then((res) => {
        if (res.data.data) {
          setCompanyDetails(res.data.data)
        }
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
  }
  React.useEffect(() => {
    getCompanyDetails()
  }, [])


  const handleAddReview = (data) => {
    console.log(data, value)
    if (data) {
      const url = `http://localhost:3000/api/company/${searchParams.get("campanyID")}/review/`;
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("review_token")
        },
      };
      const body = {
        userId: localStorage.getItem("userID"),
        companyId: companyDetails?.id,
        description: data.description,
        rating: value
      }

      axios.post(url, body, config).then((res) => {
        if (res.data.data) {
          toast.success("You have successfully added review.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 4000,
            theme: "colored",
          });
          handleClose()
        }
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
  }



  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col>
            <Card className="border-0 rounded shadow">
              <Card.Body>
                <Col className="d-flex mt-2">
                  <span>
                    <img
                      src={img1}
                      alt=""
                      width={105}
                      height={105}
                      className="img-fluid"
                    />
                  </span>
                  <div className="ms-2">
                    <small>Founder {moment(companyDetails?.founded).format("YYYY")}</small>
                    <h5>{companyDetails?.name}</h5>
                    <small>
                      {companyDetails?.address}{" "}
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
                      marginTop: "30px",
                      marginRight: "15px",
                    }}
                  >
                    {localStorage.getItem("role") === "CLIENT" ? <Button className="fw-bold bag_btn" onClick={() => { handleShow() }}>
                      + Add Review
                    </Button> : null}
                  </div>
                </Col>
                <hr />
                <Col className="d-flex mt-3">
                  <span>
                    <img
                      src={img3}
                      alt=""
                      width={51}
                      height={51}
                      className="img-fluid me-5"
                    />
                  </span>
                  <div className="ms-3">
                    <h5 className="mb-0">Jorgue Watson</h5>
                    <small>01-01-2022, 14:33</small>
                    <small className="float-end me-3">
                      <Rating
                        style={{ fontSize: "20px" }}
                        name="read-only"
                        value={value}
                        readOnly
                      />
                    </small>
                    <h6 className="mt-3 fw-normal">
                      Graffersid one of the best Company dolor sit amet,
                      consectetur adipiscing elit. Congue netus feugiat elit
                      suspendisse commodo. Pellentesque risus suspendisse mattis
                      et massa. Ultrices ac at nibh et. Aliquam aliquam
                      ultricies ac pulvinar eleifend duis. Eget congue fringilla
                      quam ut mattis tortor posuere semper ac. Sem egestas
                      vestibulum faucibus montes. Gravida sit non arcu
                      consequat.
                    </h6>
                  </div>
                </Col>
                <Col className="d-flex mt-4">
                  <span>
                    <img
                      src={img4}
                      alt=""
                      width={51}
                      height={51}
                      className="img-fluid me-2"
                    />
                  </span>
                  <div className="ms-3">
                    <h5 className="mb-0">Jenny kole</h5>
                    <small>01-01-2022, 14:33</small>
                    <small className="float-end me-3">
                      <Rating
                        style={{ fontSize: "20px" }}
                        name="read-only"
                        value={value}
                        readOnly
                      />
                    </small>
                    <h6 className="mt-3 fw-normal">
                      Graffersid one of the best Company dolor sit amet,
                      consectetur adipiscing elit. Congue netus feugiat elit
                      suspendisse commodo. Pellentesque risus suspendisse mattis
                      et massa. Ultrices ac at nibh et.
                    </h6>
                  </div>
                </Col>
                <Col className="d-flex mt-4">
                  <span>
                    <img
                      src={img5}
                      alt=""
                      width={51}
                      height={51}
                      className="img-fluid me-4"
                    />
                  </span>
                  <div className="ms-3">
                    <h5 className="mb-0">Ayush Patel</h5>
                    <small>01-01-2022, 14:33</small>
                    <small className="float-end me-3">
                      <Rating
                        style={{ fontSize: "20px" }}
                        name="read-only"
                        value={value}
                        readOnly
                      />
                    </small>
                    <h6 className="mt-3 fw-normal">
                      Graffersid one of the best Company in App Development
                      Graffersid one of the best Company dolor sit amet,
                      consectetur adipiscing elit. Congue netus feugiat elit
                      suspendisse commodo. Pellentesque risus suspendisse mattis
                      et massa. Ultrices ac at nibh et.
                    </h6>
                  </div>
                </Col>
                <Col className="d-flex justify-content-center align-items-center mt-5 pt-5 mb-3">
                  <a className="text-decoration text-black">See all</a>
                </Col>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal size="lg" show={show} onHide={handleClose}>
        <span>
          <img src={img2} alt="" className="img-fluid img_posi3" />
        </span>
        <Modal.Body>
          <CloseButton className="float-end" onClick={handleClose} />
          <h4 className="mt-5 mb-4 text-center add_comp">Add Review</h4>
          <Form onSubmit={handleSubmit(handleAddReview)}>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control type="text" placeholder="Enter" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Enter Your Review</Form.Label>
              <textarea
                className="form-control"
                placeholder="Description..."
                rows={5}
                name="description"
                {...register("description", { required: true })}
              ></textarea>
              <span className='text-danger d-flex justify-content-start'>
                {errors.description?.type === "required" ? "Description is required." : ""}
              </span>
            </Form.Group>
            <div className="mt-4">
              <Typography
                component="legend"
                style={{ fontWeight: "700", fontSize: "25px" }}
              >
                Rating
              </Typography>
              <Rating
                style={{ fontSize: "40px" }}
                name="rating"
                onChange={(e) => { setValue(e.target.value) }}
                value={value}
              />
              <span
                className="text-end"
                style={{
                  position: "absolute",
                  right: "0",
                  marginRight: "10px",
                }}
              >
                <p>Satisfied</p>
              </span>
            </div>
            <div className="d-flex justify-content-center mt-4 mb-3">
              <Button
                className="bag_btn"
                style={{
                  border: "#034053",
                  paddingLeft: "30px",
                  paddingRight: "30px",
                  //   paddingTop: "14px",
                  //   paddingBottom: "14px",
                  fontWeight: "700",
                }}
                // onClick={handleClose}
                type="submit"
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

export default ReviewList;
