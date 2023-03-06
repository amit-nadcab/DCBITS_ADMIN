import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { login, resendOtp } from "../utils/apiFunction";
import { setIsLoggedIn } from "../redux/reducer";

import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";

import { RiLockPasswordFill } from "react-icons/ri";
import {BiHide, BiShow} from 'react-icons/bi'
import { MdEmail } from "react-icons/md";
import { toast } from "react-toastify";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormdata] = useState({});
  const [showEmailError, setShowEmailError] = useState(false);
  const [passwordError, setShowPasswordError] = useState(false);
  const [showP, setShowP] = useState(false)

  const getInputs = (value, name) => {
    const data = { [name]: value };
    setFormdata({ ...formData, ...data });
  };

 
  return (
    <>
      <Navbar />

      <div className=" mx-auto signup-form-page page-wrapper">
        <div className=" mt-5 mb-5">
          <div className="container">
            <div className="col-lg-4 col-md-6 col-sm-6 signup-form mx-auto">
              <div className="header">
                <h1>Login</h1>
              </div>
              <form>
                <div className="input">
                  <i className="">
                    <MdEmail />
                  </i>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={(event) => {
                      getInputs(event.target.value, event.target.name);
                    }}
                    onBlur={() => {
                      const re =
                        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      const t = re.test(formData?.email);
                      if (t) {
                        setShowEmailError(false);
                      } else {
                        setShowEmailError(true);
                      }
                    }}
                  />
                  {showEmailError ? (
                    <p className="text-danger text-start">Enter Valid Email</p>
                  ) : null}
                 
                </div>
                <div className="input">
                  <i className="">
                    <RiLockPasswordFill />
                  </i>
                  <input
                    type={showP ? "text" : "password" }
                    placeholder="Password"
                    name="password"
                    onChange={(event) => {
                      getInputs(event.target.value, event.target.name);
                    }}
                    onBlur={() => {
                      if (
                        formData?.password === "" ||
                        formData?.password === undefined
                      ) {
                        setShowPasswordError(true);
                      } else {
                        setShowPasswordError(false);
                      }
                    }}
                  />
                  {passwordError ? (
                    <p className="text-danger text-start">Enter Password</p>
                  ) : null}
                  {
                    showP ? <BiShow className="position-absolute show-hide"
                   
                    onClick={() => {
                      setShowP(!showP)
                    }}/> :<BiHide
                    className="position-absolute show-hide"
                    onClick={() => {
                      setShowP(!showP)
                    }}
                  />
                  }
                   
                </div>
                
                <input
                  className="signup-btn btn btn-primary"
                  type="button"
                  value="LOGIN"
                  onClick={() => {
                    if (!passwordError && !showEmailError) {
                      login(formData?.email, formData?.password, navigate).then(
                        (res) => {
                          if (
                            res.message === "Login successfully!" &&
                            res?.params?.ev == 1
                          ) {
                            dispatch(setIsLoggedIn({ user_id: res.params.user_id }));
                            toast(res.message);
                            navigate("/dashboard", {
                              state: { user_id: res.params.user_id },
                            });
                          } else if (
                            res.message === "Login successfully!" &&
                            res?.params?.ev === false
                          ) {
                            resendOtp(res?.params?.user_id)
                              .then((res1) => {
                                console.log(res1, "resend res");
                                if (
                                  res1?.message === "Email sent successfully" &&
                                  res1?.status == 200
                                ) {
                                  navigate("/verifyEmail", {
                                    state: {
                                      user_id: res?.params?.user_id,
                                    },
                                  });
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        }
                      );
                    }
                    if (
                      formData?.password === "" ||
                      formData?.password === undefined
                    ) {
                      setShowPasswordError(true);
                    } else {
                      setShowPasswordError(false);
                    }
                    if (
                      formData?.email === "" ||
                      formData?.email === undefined
                    ) {
                      setShowEmailError(true);
                    } else {
                      setShowEmailError(false);
                    }
                  }}
                />
              </form>
              <p>
                Don't have an account? <Link to="/signup" className="text-primary">sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
