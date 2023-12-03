import React, { useState } from "react";
import img1 from "../assets/Group 11648.png";
import img2 from "../assets/Frame 6.png";
import { Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from "react-toastify";
import { handleError } from "../Utilities/HandleError";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const handleLogin = (data) => {

    const url = "http://localhost:3000/api/auth/login";
    const config = {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json",
      },
    };
    const body = {
      email: data.email,
      password: data.password,
    }
    axios.post(url, body, config).then((res) => {
      if (res.data.data) {
        toast.success("You have successfully login.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 4000,
          theme: "colored",
        });
        console.log(res.data.data);
        const token = jwtDecode(res.data.data.token)
        console.log(token);
        localStorage.setItem("role", token.data.role)
        localStorage.setItem(
          "review_token",
          res.data.data.token
        );
        navigate('/companylist');

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
              <div className="">
                <Card className="rounded-4 crd_hgt">
                  <Card.Body className="mt-5 text-center">
                    <span>
                      <img src={img2} alt="" className="img-fluid img_posi" />
                    </span>
                    <h4 className="mt-3 logtex">Login</h4>
                    <p className="logdis">
                      Hello! Please enter your details for login.
                    </p>
                    <Form onSubmit={handleSubmit(handleLogin)}>
                      <Form.Group className="mb-3">
                        <Form.Control type="email" placeholder="Email" name="email"   {...register("email", { required: true })} />
                        <span className='text-danger d-flex justify-content-start'>
                          {errors.email?.type === "required" ? "Email is required." : ""}
                        </span>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"   {...register("password", { required: true })}
                        // maxLength={10}
                        />
                        <span className='text-danger d-flex justify-content-start'>
                          {errors.password?.type === "required" ? "Password is required." : ""}
                        </span>
                      </Form.Group>
                      <span className="text-end">
                        <p>Forget Password ?</p>
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
                          Login{" "}
                        </Button>
                      </div>
                    </Form>
                    <hr />
                    <span className="logfoot">
                      I don’t have an account on Review & Rate
                    </span>
                    <br />
                    <Link to="/register" className="text-decoration text-black">Register Now</Link>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
