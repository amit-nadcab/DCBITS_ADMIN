import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { RiUserFill } from "react-icons/ri";
import { verifyEmail } from '../utils/apiFunction';
import { setIsLoggedIn } from '../redux/reducer';
import { Footer } from '../Components/Footer';
import { toast } from "react-toastify";

export const VerifyEmail = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [otp, setOtp] = useState(0)
  const [showOtpError, setShowOtpError] = useState(false)

  console.log(location.state.user_id);
  return (
    <>
      <div className=" mx-auto signup-form-page page-wrapper">
        <div className=" mt-5 mb-5">
          <div className="container">
            <div className="col-md-5 signup-form mx-auto">
              <div className="header">
                <h1>Verify Email</h1>
                <p>Check Email to get OTP</p>
              </div>
              <form>
                <div className="input" style={{ marginBottom: '0px !important' }}>
                  <i className="">
                    <RiUserFill />
                  </i>
                  <input
                    type="text"
                    name="refID"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(event) =>
                      setOtp(event.target.value
                        ?.replace(/[^0-9.]/, "")
                        .replace(/(\..?)\../g, "$1"))
                    }
                    onBlur={() => {
                      if (otp === '') {
                        setShowOtpError(true)
                      }
                    }}
                    onFocus={() => {
                      setShowOtpError(false)
                    }}
                  />

                </div>
                {showOtpError ? <p className='text-danger text-start'>Enter OTP</p> : null}
                <input className="signup-btn btn btn-primary" type="button" value="Verify" onClick={() => {
                  if (otp === '') {
                    setShowOtpError(true)
                  } else {
                    verifyEmail(otp, location?.state?.user_id, navigate).then((res) => {
                      console.log(res,"varifyOTP response");
                      console.log(res.params.ev, "verify Response");
                      if (res?.params?.ev) {
                        dispatch(setIsLoggedIn({ user_id: res.params.user_id }));
                        toast.info(res.message);
                        navigate("/dashboard");
                      }
                    }).catch((err) => {
                      console.log(err);
                    })
                  }

                }} />
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
