import React, { useState } from "react";
import img1 from "../assets/Group 11648.png";
import img2 from "../assets/Frame 6.png";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import { handleError } from "../Utilities/HandleError";

const Signin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const url = "http://localhost:3000/api/auth/register";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    const body = {

      name: data.name,
      email: data.email,
      phone: data.phone,
      city: data.city,
      state: data.state,
      password: data.password,
      role: "CLIENT"
    }
    axios.post(url, body, config).then((res) => {
      console.log("gfdgdgf", res.data.data);
      if (res.data.data) {
        toast.success("You have successfully registered.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000,
          theme: "colored",
        });
        localStorage.setItem("userID", res.data.data.id)
        navigate("/login");
      }
    }).catch((error) => {
      setLoading(false);
      toast.dismiss();
      if (error.response.data.message) {
        toast.error("You have entered wrong details for resgistering.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000,
          theme: "colored",
        });
      }
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

  return (
    <>
      <div className="login">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center p-3 pt-5">
            <div className="col-6 text-center p-5">
              <span className="wel">Welcome</span>
              <p className="dis">
                Lorem ipsum dolor sit amet, consectetur <br />
                adipiscing elit.
              </p>
              <img
                src={img1}
                alt=""
                width={400}
                height={300}
                className="img-fluid mt-3"
              />
            </div>
            <div className="col-6 d-flex justify-content-center align-items-center mt-5">
              <Card className="rounded-4 crd_hgt">
                <Card.Body className="mt-5 text-center">
                  <span>
                    <img src={img2} alt="" className="img-fluid img_posi" />
                  </span>
                  <h4 className="mt-3 mb-4 logtex">Sign up</h4>
                  <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                      <Form.Control type="text" placeholder="Full Name" name="name"
                        {...register("name", { required: true })}
                      />
                      <span className='text-danger d-flex justify-content-start'>
                        {errors.name?.type === "required" ? "Name is required." : ""}
                      </span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control type="email" placeholder="Email" name="email"
                        {...register("email", { required: true })} />
                      <span className='text-danger d-flex justify-content-start'>
                        {errors.email?.type === "required" ? "Email is required." : ""}
                      </span>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder="Phone Number"
                        maxLength={10}
                        name="phone"
                        {...register("phone", { required: true })}

                      />
                      <span className='text-danger d-flex justify-content-start'>
                        {errors.phone?.type === "required" ? "Phone number is required." : ""}
                      </span>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        maxLength={10}
                        name="password"
                        {...register("password", { required: true })}
                      />
                      <span className='text-danger d-flex justify-content-start'>
                        {errors.password?.type === "required" ? "Password is required." : ""}
                      </span>
                    </Form.Group>
                    <Form.Select className="mb-3" name="city"
                      {...register("city", { required: true })}>
                      <option disabled selected>Select a city</option>
                      <option value="Indore">Indore</option>
                      <option value="Ujjain">Ujjain</option>
                      <option value="Dewas">Dewas</option>
                    </Form.Select>
                    <span className='text-danger d-flex justify-content-start'>
                      {errors.city?.type === "required" ? "City is required." : ""}
                    </span>
                    <Form.Select className="mb-3" name="state"
                      {...register("state", { required: true })}>
                      <option disabled selected>Select a State</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </Form.Select>
                    <span className='text-danger d-flex justify-content-start'>
                      {errors.state?.type === "required" ? "State is required." : ""}
                    </span>
                    <div className="d-flex justify-content-center">
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
                      >
                        Sign Up
                      </Button>
                    </div>
                  </Form>
                  <hr />
                  <span className="logfoot">I already have an account</span>
                  {" "}

                  <Link to="/login" className="text-decoration text-black">Login</Link>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
