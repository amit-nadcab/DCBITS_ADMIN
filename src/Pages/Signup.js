import React, { useEffect, useState, useReducer } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";

import { Footer } from "../Components/Footer";
import { Navbar } from "../Components/Navbar";

import { RiUserFill, RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";
import { toast } from "react-toastify";
import { registration } from "../utils/apiFunction";
import { Header } from "../Components/Header";

const initialTodos = {
  handleShowP: false,
  handleShowCP: false,
};

const reducer = (state, action) => {
  if (action.type === "HANDLE_SHOW_P") {
    return {
      handleShowP: !state?.handleShowP,
    };
  }
  if (action.type === "HANDLE_SHOW_CP") {
    return {
      handleShowCP: !state?.handleShowCP,
    };
  }

  throw Error("Unknown action.");
};

export const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();


  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [formData, setFormDate] = useState({});
  // const [ref, setRef] = useEffect("");

  // const [showRefIDError, setShowRefIDError] = useState(false)
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const [showCPasswordErrorError, setShowCPasswordError] = useState(false);

  const getInputs = (value, name) => {
    const data = { [name]: value };
    setFormDate({ ...formData, ...data });
  };
  

  useEffect(() => {
    if (location?.search) {
      console.log("in",location?.search);
      setFormDate({ ...formData, refID: location?.search.slice(4) });
    } else {
      console.log("out");
    }
  }, []);

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Navbar />
    {/* <Header/> */}
      <div className=" mx-auto signup-form-page page-wrapper">
        <div className=" mx-auto mt-5 mb-5">
          <div className="container">
            <div className="col-md-8 col-lg-4 col-12 signup-form mx-auto">
              <div className="header">
                <h1>Create an Account</h1>
                <p>Get start</p>
              </div>
              <form>
                <div className="input">
                  <i className="">
                    <RiUserFill />
                  </i>
                  <input
                    type="text"
                    name="refID"
                    placeholder="Referral ID (Optional)"
                    value={formData?.refID}
                    onChange={(event) => {
                      getInputs(event.target.value, event.target.name);
                    }}
                  />
                  {/* {showRefIDError ? <p className="text-danger text-start mt-1">Enter Referral ID</p> : null} */}
                </div>
                <div className="input">
                  <i className="">
                    <MdEmail />
                  </i>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
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
                    onFocus={() => setShowEmailError(false)}
                  />

                  {showEmailError ? (
                    <p className="text-danger text-start mt-1">
                      Enter Valid Email ID
                    </p>
                  ) : null}
                </div>
                <div className="input position-relative">
                  <i className="">
                    <RiLockPasswordFill />
                  </i>
                  <input
                    type={todos.handleShowP ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    onChange={(event) => {
                      getInputs(event.target.value, event.target.name);
                    }}
                    onBlur={() => {
                      const re =
                        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
                      const t = re.test(formData?.password);
                      if (t) {
                        setShowPasswordError(false);
                      } else {
                        setShowPasswordError(true);
                      }
                    }}
                    onFocus={() => setShowPasswordError(false)}
                  />
                  {showPasswordError ? (
                    <>
                      <p className="text-danger text-start mt-1">
                        Enter Valid Password
                      </p>
                    </>
                  ) : null}
                      
                  <BiHide
                    className="position-absolute show-hide"
                    onClick={() => {
                      dispatch({ type: "HANDLE_SHOW_P" });
                    }}
                  />
                  
                </div>
                <p className="mb-3">Password should be between 8 to 16 characters<br/>and consist of number and special symbols</p>
                <div className="input">
                  <i className="">
                    <RiLockPasswordFill />
                  </i>

                  <input
                    type={todos.handleShowCP ? "text" : "password"}
                    name="cPassword"
                    placeholder="Confirm Password"
                    onChange={(event) =>
                      getInputs(event.target.value, event.target.name)
                    }
                    onBlur={() => {
                      console.log();
                      if (
                        formData?.cPassword === "" ||
                        formData?.cPassword === undefined
                      ) {
                        setShowCPasswordError(true);
                      } else {
                        setShowCPasswordError(false);
                      }
                    }}
                    onFocus={() => setShowCPasswordError(false)}
                  />
                  {showCPasswordErrorError ? (
                    <p className="text-danger text-start mt-1">
                      Enter Confirm Password
                    </p>
                  ) : null}

                  <BiHide
                    className="position-absolute show-hide"
                    onClick={() => {
                      dispatch({ type: "HANDLE_SHOW_CP" });
                    }}
                  />
                </div>

                <input
                  className="signup-btn btn btn-primary"
                  type="button"
                  value="SIGN UP"
                  onClick={() => {
                    console.log(formData, "kk");

                    if (
                      formData?.password === "" ||
                      formData?.password === undefined
                    ) {
                      setShowPasswordError(true);
                    }
                    if (
                      formData?.cPassword === "" ||
                      formData?.cPassword === undefined
                    ) {
                      setShowCPasswordError(true);
                    }
                    if (
                      formData?.email === "" ||
                      formData?.email === undefined
                    ) {
                      setShowEmailError(true);
                    }
                    if (
                      formData?.password !== "" &&
                      formData?.password !== undefined &&
                      formData?.cPassword !== "" &&
                      formData?.cPassword !== undefined &&
                      formData?.email !== "" &&
                      formData?.email !== undefined
                    ) {
                      registration(
                        formData?.refID,
                        formData?.email,
                        formData?.password,
                        formData?.cPassword,
                        navigate
                      )
                        .then((res) => {
                          console.log(res, "aaa");
                          console.log(res?.params?.user_id, "response");
                          if (res?.status == "400") {
                            
                            toast.error(res?.message);
                          }
                          if (res?.params?.user_id) {
                            navigate("/verifyEmail", {
                              state: { user_id: res?.params?.user_id },
                            });
                            toast.info("OTP is Shared on Email");
                          }
                        })
                        .catch((err) => {
                          console.log(err, "amit error");
                        });
                    } else {
                      
                      toast.error("Fill complete form");
                    }
                  }}
                />
              </form>
              <p className="">
                Already have an account? <Link to="/login" className="text-primary">sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
