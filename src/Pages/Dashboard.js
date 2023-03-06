import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TradingViewWidget from "react-tradingview-widget";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";

import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { WalletAddressAlert } from "../Components/walletAddressAlert";
import { TransactionSuccessful } from "../Components/TransactionSuccessful";
import { TransactionCancled } from "../Components/TransactionCancled";
import { BoatTable } from "../Components/BoatTable";

import { Sidebar } from "../Components/Sidebar";
import { AiFillCopy } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { CopyToClipboard } from "react-copy-to-clipboard";
import OtpInput from "react-otp-input";
import { roundTo } from "round-to";

import {
  createWallet,
  getWalletAddress,
  updateWallet,
  checkUserStatus,
  withdraw,
  verifyWithdrawOtp
} from "../utils/apiFunction";
import { BASE_URL_1, BASE_URL_2 } from "../utils/config";

export const Dashboard = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [walletAddress, setWalletAddress] = useState([]);
  const [copiedUSDT, setCopiedUSDT] = useState(false);
  const [copiedDCBT, setCopiedDCBT] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);

  const [otpValue, setOtpValue] = useState("");
  const [userStats, setUserStats] = useState({});
  const [totalInvest, setTotalInvest] = useState(0);
  const [mainBtn, setMainBtn] = useState(true);
  const [trnsactionID, setTransactionID] = useState('')

  const [withdrawType, setWithDrawType] = useState('Income Type')
  const [withdrawValue, setWithdrawValue] = useState("");
  const [withdrawAddress, setWithdrawAddress] = useState("");
  const [showAddressError, setShowAddressError] = useState(false);
  const [showAmountError, setShowAmountError] = useState(false);
  const [showIncomeTypeError, setShowIncomeTypeError] = useState(false)
  const [showotpError, setShowOtpError] = useState(false)

  const [showOtp, setShowOtp] = useState(false);
  const [showWithdrawForm, setshowWithdrawForm] = useState(true)
  const [showTransactionSuccessful, setShowTransactionSuccesful] = useState(false)

  useEffect(() => {
    getWalletAddress(user_id).then((res) => {
      setWalletAddress(res?.wallets);
    });
    updateWallet(user_id).then((res) => {
      // console.log(res, "update wallet address");
    });
    checkUserStatus(user_id).then((res) => {
      setUserStats(res?.user_data);
      setTotalInvest(res?.total);
    });
  }, [user_id]);

  setTimeout(() => {
    setCopiedUSDT(false);
    setCopiedDCBT(false);
    setCopiedRef(false);
  }, 2000);

  const handleCopy = (type) => {
    console.log(type, "type");
    if (type === "USDT") {
      setCopiedUSDT(true);
    }
    if (type === "DCBT") {
      setCopiedDCBT(true);
    }
  };
  const handleSelect = (e) => {

    if (e === "roi") {
      setWithDrawType(e)
      setWithdrawValue(userStats?.roi_income);
      setShowIncomeTypeError(false)
    }
    if (e === "reffral") {
      setWithDrawType(e)
      setWithdrawValue(userStats?.referral_income);
      setShowIncomeTypeError(false)
    }
  };
  const handleWithdraw = () => {
    console.log(withdrawValue,'withdrawValue');
    if (withdrawAddress === "") {
      setShowAddressError(true);
    }
    if (withdrawValue === "") {
      setShowAmountError(true);
    }
    if(withdrawType === '' || withdrawType ==='Income Type'){
      setShowIncomeTypeError(true)
    }
    if(withdrawAddress && withdrawValue>=0 && withdrawType !== 'Income Type'){
      console.log(user_id,withdrawType,withdrawAddress,withdrawValue);
      withdraw(user_id,withdrawType,withdrawAddress,withdrawValue).then((res)=>{
        console.log(res,"withdrwa response");
        toast.info(res?.message)
        if(res?.message === 'OTP Send Successfully!'){
          setShowOtp(true)
          setTransactionID(res?.params?.transection_id)
          setshowWithdrawForm(false)
        }
      })
    }
  };

  

  const verifyWithdrawOTP = ()=>{
    try {
      if(otpValue.length >=6){
        verifyWithdrawOtp(user_id, otpValue,trnsactionID).then((res)=>{
          console.log(res, "verifyotpwith ersponse");
          console.log(res?.message);
          if(res?.message === 'USDT WITHDRAWAL in Progress!'){
            setShowTransactionSuccesful(true)
            setShowOtp(false)
          }
        })
      }else{
        setShowOtpError(true)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* <Navbar /> */}
      <Sidebar />
      {/* <Header /> */}

      <div className="page-wrapper pt-5">
        {/* {window.innerWidth < 768 ? (
          <div className="main-btn mt-3">
            <div className="btn-wrap ">
              <div
                className={mainBtn ? "selcted" : "static-btn"}
                onClick={() => setMainBtn(true)}
              >
                Dashboard
              </div>
              <div
                className={!mainBtn ? "selcted" : "static-btn"}
                onClick={() => setMainBtn(false)}
              >
                Withdraw
              </div>
            </div>
          </div>
        ) : null} */}

        <div className="container-fluid">
          {window.innerWidth < 768 ? (
            mainBtn ? (
              <>
                <div
                  className="row px-3"
                  style={{
                    background:
                      "linear-gradient(146.85deg, #5059F4 -13.31%, #E1ECFE -13.31%, #5451FF 36.91%, #3A48F5 85.7%)",
                  }}
                >
                  <div className="col-md-12 col-12">
                    <div
                      className="row mb-4  align-items-center justify-content-between py-4 mt-5 dummy-data"
                      style={{ background: "rgba(255, 255, 255, 0.2)" }}
                    >
                      <div className="col-6">
                        <p className="mobile-stats-key">Total Earning</p>
                        <p className="mobile-stats-key">Total Investment</p>
                        <p className="mobile-stats-key">Total ROI Income</p>
                        <p className="mobile-stats-key">Total Direct Members</p>
                        <p className="mobile-stats-key">Total Level Income</p>
                      </div>
                      <div className="col-6">
                        <p className="text-center mobile-stats-key">
                          {userStats?.roi_income || userStats?.referral_income
                            ? roundTo(
                                Number(
                                  userStats?.roi_income +
                                    Number(userStats?.referral_income)
                                ),
                                4
                              )
                            : 0}{" "}
                          USDT
                        </p>
                        <p className="text-center mobile-stats-key">
                          {totalInvest ? roundTo(totalInvest, 4) : 0} USDT
                        </p>
                        <p className="text-center mobile-stats-key">
                          {userStats?.roi_income
                            ? roundTo(userStats?.roi_income, 4)
                            : 0}{" "}
                          USDT
                        </p>
                        <p className="text-center mobile-stats-key">
                          {userStats?.directs ? userStats?.directs : 0}
                        </p>
                        <p className="text-center mobile-stats-key">
                          {userStats?.referral_income
                            ? roundTo(userStats?.referral_income, 4)
                            : 0}{" "}
                          USDT
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row px-3">
                  <div className="mt-3 mb-3">
                    <div className="create-wallet-1 d-flex flex-column align-items-start p-2 mt-2">
                      <h6 className="text-white">
                        Invite your friend and get{" "}
                        <span className="text-warning"> $10</span>
                      </h6>
                      <p className="text-white">
                        Effortlessly manage your finance with us
                      </p>

                      <CopyToClipboard
                        text={`${BASE_URL_1}/signup?id=${userStats?.self_ref_code}`}
                        onCopy={() => setCopiedRef(true)}
                      >
                        <span className="mx-1 small">
                          <button className="btn btn-light mt-2">
                            Copy Link
                          </button>
                          {copiedRef ? (
                            <span
                              className="small mx-1"
                              style={{ color: "white" }}
                            >
                              Copied
                            </span>
                          ) : null}
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                </div>
              </>
            ) : null
          ) : (
            <div className="row mx-1">
              {/* <div className="col-md-12 col-12"> */}
                <div className="row align-items-center justify-content-center py-4 mt-5 dummy-data">
                  <div className="col-md-2 col-6 text-center card-mob">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="stat-card-dot-g"></div>{" "}
                      <p className="ms-1"> Total Earning</p>
                    </span>
                    <b className="h3">
                      {userStats?.roi_income || userStats?.referral_income
                        ? roundTo(
                            Number(
                              userStats?.roi_income +
                                Number(userStats?.referral_income)
                            ),
                            4
                          )
                        : 0}{" "}
                      USDT
                    </b>
                  </div>
                  <div className="col-md-2 col-6 border-start text-center card-mob">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="stat-card-dot-b"></div>{" "}
                      <p className="ms-1"> Total Investment</p>
                    </span>
                    <b className="h3">
                      {totalInvest ? roundTo(totalInvest, 4) : 0} USDT
                    </b>
                  </div>
                  <div className="col-md-2 col-6 border-start text-center card-mob">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="stat-card-dot-r"></div>{" "}
                      <p className="ms-1"> Total ROI Income</p>
                    </span>
                    <b className="h3">
                      {userStats?.roi_income
                        ? roundTo(userStats?.roi_income, 4)
                        : 0}{" "}
                      USDT
                    </b>
                  </div>
                  <div className="col-md-2 col-6 border-start text-center card-mob">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="stat-card-dot-o"></div>{" "}
                      <p className="ms-1"> Total Direct Members</p>
                    </span>
                    <b className="h3">
                      {userStats?.directs ? userStats?.directs : 0}
                    </b>
                  </div>
                  <div className="col-md-2 col-12 border-start text-center card-mob">
                    <span className="d-flex align-items-center justify-content-center">
                      <div className="stat-card-dot-p"></div>{" "}
                      <p className="ms-1"> Total Level Income</p>
                    </span>
                    <b className="h3">
                      {userStats?.referral_income
                        ? roundTo(userStats?.referral_income, 4)
                        : 0}{" "}
                      USDT
                    </b>
                  </div>
                </div>
              {/* </div> */}
            </div>
          )}

          <div className="row mt-4 mb-3">
            {/* <div className="col-md-8 mt-3">
              <div className="d-block-ai-assitent justify-content-between align-items-center ai-banner">
                <div className="d-flex align-items-center ai-wrap">
                  <div id="ai-assisent-img" className="me-4">
                    <img src="assets/img/symbole.svg" alt="img" />
                  </div>
                  <div className="">
                    <h4 className="">Hi, I am your AI assistent</h4>
                    <h6 className="">
                      Maximize your investment potential with our AI assistent.{" "}
                      <a href="#">
                        <u>Check Out</u>
                      </a>
                    </h6>
                  </div>
                </div>
                <div className="roi-expexted text-center">
                  <span className="">
                    <p className="" style={{ color: "#3D9236" }}>
                      {" "}
                      Next ROI Income Expected on
                    </p>

                    <p className="text-dark">
                      <b> 23 March 2023</b>
                    </p>
                  </span>
                </div>
              </div>
              {window.innerWidth < 768 ? (
                mainBtn ? (
                  <div className="ai-banner mt-3 mb-3">
                    <TradingViewWidget
                      symbol="BINANCE:BTCUSDT"
                      height="450px"
                      width="100%"
                    />
                  </div>
                ) : null
              ) : (
                <div className="ai-banner mt-3 mb-2">
                  <TradingViewWidget
                    symbol="BINANCE:BTCUSDT"
                    height="450px"
                    width="100%"
                  />
                </div>
              )}
            </div> */}
            {/* {window.innerWidth < 768 ? (
              !mainBtn ? (
                <div
                  className={
                    userStats?.user_status === 1
                      ? "col-md-4 mt-3 d-flex flex-column"
                      : "col-md-4 mt-3 d-flex flex-column-reverse"
                  }
                >
                  <div className="ai-banner mt-5 mb-3">
                    <div className="d-flex justify-content-between">
                      <div>
                        <img
                          src="assets/img/icon1.png"
                          alt="img"
                          width="25px"
                        />{" "}
                        Withdraw
                      </div>
                    
                    </div>

                  
                {showWithdrawForm ? <form className="mt-2">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label
                          for="exampleInputEmail1"
                          className="form-label form-lalbe-text"
                        >
                          Wallet Address
                        </label>
                        <label
                          for="exampleInputEmail1"
                          className="form-label form-lalbe-text"
                        >
                          <Dropdown
                          onSelect={handleSelect}
                          >
                            <Dropdown.Toggle
                              variant="Secondary"
                              id="dropdown-basic" 
                              size="sm"
                            >
                              {withdrawType === 'roi' ? "ROI" : withdrawType === 'reffral' ? "Referral" : "Income Type"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item eventKey={"roi"}>
                                ROI
                              </Dropdown.Item>
                              <Dropdown.Item eventKey={"reffral"}>
                                Referral
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={withdrawAddress}
                        onChange={(e)=>{
                          if(e.target.value != ''){
                            setShowAddressError(false)
                          }
                          setWithdrawAddress(e.target.value)
                        }}
                      />
                     {showAddressError ? <p className="error-msg">Enter Address</p> : null} 
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="form-label form-lalbe-text"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={withdrawValue}
                        onChange={(e)=>{
                          if(e.target.value != ''){
                            setShowAmountError(false)
                          }
                          setWithdrawValue(e.target.value)
                        }}
                      />
                      {showAmountError ? <p className="error-msg">Enter Amount</p> : null}
                      
                    </div>
                    <div className="mb-3">
                      <div className="text-center">
                        <label
                          for="exampleInputPassword1"
                          className="form-label form-lalbe-text"
                        >
                          Fees:
                        </label>
                        {""} $1
                      </div>
                    </div>
                    {showIncomeTypeError ? <p className="error-msg text-center fs-6">select income type</p> : null}
                        
                    <div className="d-grid gap-2 mt-5">
                      <button
                        className="btn"
                        type="button"
                        style={{ background: "#394CF4", color: "white" }}
                        onClick={()=>{
                          handleWithdraw()
                        }}
                      >
                        Withdraw Amount
                      </button>
                    </div>
                  </form> :null}
                  
                     
                        {
                          showOtp ?  <form className="mt-3">
                          <div className="mb-3">
                            <label
                              for="exampleInputEmail1"
                              className="form-label form-lalbe-text ms-5"
                            >
                              Enter OTP
                            </label>
                            <span className="justify-content-center d-flex">
                              <OtpInput
                                value={otpValue}
                                onChange={(e) => {
                                  setOtpValue(e?.replace(/[^0-9.]/, "").replace(/(\..?)\../g, "$1"));
                                }}
                                inputStyle="otp-input"
                                focusStyle="otp-text"
                                placeholder={0}
                                numInputs={6}
                                separator={<span>{""}</span>}
                              />
                            </span>
                          </div>
                          {showotpError ? <p className="error-msg text-center">Enter Valid OTP</p> : null}
                          <div className="d-grid gap-2 mt-5">
                            <button
                              className="btn"
                              type="button"
                              style={{ background: "#394CF4", color: "white" }}
                              onClick={()=> verifyWithdrawOTP()}
                            >
                              Confirm OTP
                            </button>
                          </div>
                           
                        </form> :null
                        }
                       
                 {showTransactionSuccessful ? <TransactionSuccessful address={withdrawAddress} amount={withdrawValue} date={Date.now()}/> : null}
                  </div>
                  <div className="mt-4 ">
                    {walletAddress && walletAddress?.length > 0 ? (
                      <div
                        className="card border-0 mb-3"
                        style={{ borderRadius: "12px" }}
                      >
                        <div className="card-body wallet-card">
                          <div className="d-block-wallet-data align-items-center justify-content-between border-bottom">
                            <div>
                              {" "}
                              <img
                                src="assets/img/wallet.png"
                                alt="img"
                                width="20px"
                              />
                              <span>
                                {" "}
                                {walletAddress[0]?.wallet_type} Wallet Address
                              </span>
                            </div>

                            <div className="d-flex align-items-center px-5 wallet-address">
                              <div>
                                {" "}
                                <p className="address-text position-realative">
                                  {walletAddress[0]?.wallet_address.slice(
                                    0,
                                    10
                                  ) +
                                    "..." +
                                    walletAddress[0]?.wallet_address.slice(25)}
                                </p>
                              </div>
                              <div className="">
                                <CopyToClipboard
                                  className="mx-1"
                                  text={walletAddress[0]?.wallet_address}
                                  onCopy={() =>
                                    handleCopy(walletAddress[0]?.wallet_type)
                                  }
                                >
                                  <span className="mx-1 small">
                                    <AiFillCopy
                                      color="#394CF4"
                                      cursor="pointer"
                                    />
                                  </span>
                                </CopyToClipboard>
                                {copiedUSDT ? (
                                  <span
                                    className="small mx-1 position-absolute"
                                    style={{ color: "#394CF4" }}
                                  >
                                    Copied
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                          <div className="d-block-wallet-data align-items-center justify-content-between">
                            <div>
                              {" "}
                              <img
                                src="assets/img/wallet.png"
                                alt="img"
                                width="20px"
                              />{" "}
                              <span>
                                {" "}
                                {walletAddress[1]?.wallet_type} Wallet Address
                              </span>
                            </div>
                            <div className="d-flex align-items-center px-5 wallet-address">
                              <div>
                                <p className="address-text position-realative">
                                  {walletAddress[1]?.wallet_address.slice(
                                    0,
                                    10
                                  ) +
                                    "..." +
                                    walletAddress[1]?.wallet_address.slice(25)}
                                </p>
                              </div>
                              <div>
                                <CopyToClipboard
                                  className="mx-1"
                                  text={walletAddress[1]?.wallet_address}
                                  onCopy={() =>
                                    handleCopy(walletAddress[1]?.wallet_type)
                                  }
                                >
                                  <span className="mx-1 small">
                                    <AiFillCopy
                                      color="#394CF4"
                                      cursor="pointer"
                                    />
                                  </span>
                                </CopyToClipboard>
                                {copiedDCBT ? (
                                  <span
                                    className="small mx-1 position-absolute"
                                    style={{ color: "#394CF4" }}
                                  >
                                    Copied
                                  </span>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="create-wallet d-flex flex-column align-items-start p-2">
                          <h6 className="text-white">Create Your Wallet</h6>
                          <p className="text-white">
                            Effortlessly manage your finance with us
                          </p>

                          <button
                            className="btn btn-light mt-2"
                            onClick={() =>
                              createWallet(user_id).then((res) => {
                                console.log(res, "wallet Response create");
                                getWalletAddress(user_id).then((res1) => {
                                  setWalletAddress(res1?.wallets);
                                });
                              })
                            }
                          >
                            Craete Wallet
                          </button>
                        </div>
                        <div className="create-wallet-1 d-flex flex-column align-items-start p-2 mt-2">
                          <h6 className="text-white">
                            Invite your friend and get{" "}
                            <span className="text-warning"> $10</span>
                          </h6>
                          <p className="text-white">
                            Effortlessly manage your finance with us
                          </p>

                          <CopyToClipboard
                            text={`${BASE_URL_1}/signup?id=${userStats?.self_ref_code}`}
                            onCopy={() => setCopiedRef(true)}
                          >
                            <span className="mx-1 small">
                              <button className="btn btn-light mt-2">
                                Copy Link
                              </button>
                            </span>
                          </CopyToClipboard>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ) : null
            ) : (
              <div className="col-md-4 mt-3">
                <div className="ai-banner">
                  <div className="d-flex justify-content-start align-items-center">
                    <div>
                      <img src="assets/img/icon1.png" alt="img" width="25px" />{" "}
                      Withdraw
                    </div>
                  </div>
         
                {showWithdrawForm ? <form className="mt-2">
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <label
                          for="exampleInputEmail1"
                          className="form-label form-lalbe-text"
                        >
                          Wallet Address
                        </label>
                        <label
                          for="exampleInputEmail1"
                          className="form-label form-lalbe-text"
                        >
                          <Dropdown
                          onSelect={handleSelect}
                          >
                            <Dropdown.Toggle
                              variant="Secondary"
                              id="dropdown-basic" 
                              size="sm"
                            >
                              {withdrawType === 'roi' ? "ROI" : withdrawType === 'reffral' ? "Referral" : "Income Type"}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item eventKey={"roi"}>
                                ROI
                              </Dropdown.Item>
                              <Dropdown.Item eventKey={"reffral"}>
                                Referral
                              </Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </label>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={withdrawAddress}
                        onChange={(e)=>{
                          if(e.target.value != ''){
                            setShowAddressError(false)
                          }
                          setWithdrawAddress(e.target.value)
                        }}
                      />
                     {showAddressError ? <p className="error-msg">Enter Address</p> : null} 
                    </div>
                    <div className="mb-3">
                      <label
                        for="exampleInputPassword1"
                        className="form-label form-lalbe-text"
                      >
                        Amount
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputPassword1"
                        value={withdrawValue}
                        onChange={(e)=>{
                          if(e.target.value != ''){
                            setShowAmountError(false)
                          }
                          setWithdrawValue(e.target.value)
                        }}
                      />
                      {showAmountError ? <p className="error-msg">Enter Amount</p> : null}
                      
                    </div>
                    <div className="mb-3">
                      <div className="text-center">
                        <label
                          for="exampleInputPassword1"
                          className="form-label form-lalbe-text"
                        >
                          Fees:
                        </label>
                        {""} $1
                      </div>
                    </div>
                    {showIncomeTypeError ? <p className="error-msg text-center fs-6">select income type</p> : null}
                        
                    <div className="d-grid gap-2 mt-5">
                      <button
                        className="btn"
                        type="button"
                        style={{ background: "#394CF4", color: "white" }}
                        onClick={()=>{
                          handleWithdraw()
                        }}
                      >
                        Withdraw Amount
                      </button>
                    </div>
                  </form> :null}
                  
                      
                        {
                          showOtp ?  <form className="mt-3">
                          <div className="mb-3">
                            <label
                              for="exampleInputEmail1"
                              className="form-label form-lalbe-text ms-5"
                            >
                              Enter OTP
                            </label>
                            <span className="justify-content-center d-flex">
                              <OtpInput
                                value={otpValue}
                                onChange={(e) => {
                                  setOtpValue(e?.replace(/[^0-9.]/, "").replace(/(\..?)\../g, "$1"));
                                }}
                                inputStyle="otp-input"
                                focusStyle="otp-text"
                                placeholder={0}
                                numInputs={6}
                                separator={<span>{""}</span>}
                              />
                            </span>
                          </div>
                          {showotpError ? <p className="error-msg text-center">Enter Valid OTP</p> : null}
                          <div className="d-grid gap-2 mt-5">
                            <button
                              className="btn"
                              type="button"
                              style={{ background: "#394CF4", color: "white" }}
                              onClick={()=> verifyWithdrawOTP()}
                            >
                              Confirm OTP
                            </button>
                          </div>
                           
                        </form> :null
                        }
                      
                 {showTransactionSuccessful ? <TransactionSuccessful address={withdrawAddress} amount={withdrawValue} date={Date.now()}/> : null}
                </div>
                <div className="mt-3">
                  {walletAddress && walletAddress?.length > 0 ? (
                    <div
                      className="card border-0"
                      style={{ borderRadius: "12px" }}
                    >
                      <div className="card-body wallet-card">
                        <div className="row">
                          <div className="col-lg-4">
                            {" "}
                            <img
                              src="assets/img/wallet.png"
                              alt="img"
                              width="20px"
                            />
                            <span className="fs-15">
                              {" "}
                              {walletAddress[0]?.wallet_type} Wallet Address
                            </span>
                          </div>
                          <div className="col-lg-8 wallet-address">
                          <div className="d-flex">
                            <div>
                              {" "}
                              <p className="address-text position-realative">
                                {walletAddress[0]?.wallet_address.slice(0, 10) +
                                  "..." +
                                  walletAddress[0]?.wallet_address.slice(25)}
                              </p>
                            </div>
                            
                            <div className="">
                              <CopyToClipboard
                                className="mx-1"
                                text={walletAddress[0]?.wallet_address}
                                onCopy={() =>
                                  handleCopy(walletAddress[0]?.wallet_type)
                                }
                              >
                                <span className="mx-1 small">
                                  <AiFillCopy
                                    color="#394CF4"
                                    cursor="pointer"
                                  />
                                </span>
                              </CopyToClipboard>
                              {copiedUSDT ? (
                                <span
                                  className="small mx-1 position-absolute"
                                  style={{ color: "#394CF4" }}
                                >
                                  Copied
                                </span>
                              ) : null}
                            </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-4">
                            {" "}
                            <img
                              src="assets/img/wallet.png"
                              alt="img"
                              width="20px"
                            />{" "}
                            <span className="fs-15">
                              {" "}
                              {walletAddress[1]?.wallet_type} Wallet Address
                            </span>
                          </div>
                          <div className="col-lg-8 wallet-address">
                            <div className="d-flex">
                              <div> 
                                <p className="address-text position-realative">
                                  {walletAddress[1]?.wallet_address.slice(0, 10) +
                                    "..." +
                                    walletAddress[1]?.wallet_address.slice(25)}
                                </p>
                              </div>
                              <div>
                              <CopyToClipboard
                                className="mx-1"
                                text={walletAddress[1]?.wallet_address}
                                onCopy={() =>
                                  handleCopy(walletAddress[1]?.wallet_type)
                                }
                              >
                                <span className="mx-1 small">
                                  <AiFillCopy
                                    color="#394CF4"
                                    cursor="pointer"
                                  />
                                </span>
                              </CopyToClipboard>
                              {copiedDCBT ? (
                                <span
                                  className="small mx-1 position-absolute"
                                  style={{ color: "#394CF4" }}
                                >
                                  Copied
                                </span>
                              ) : null}
                            </div>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="create-wallet d-flex flex-column align-items-start p-2">
                        <h6 className="text-white">Create Your Wallet</h6>
                        <p className="text-white">
                          Effortlessly manage your finance with us
                        </p>
                        <button
                          className="btn btn-light mt-2"
                          onClick={() =>
                            createWallet(user_id).then((res) => {
                              console.log(res, "wallet Response create");
                              getWalletAddress(user_id).then((res1) => {
                                setWalletAddress(res1?.wallets);
                              });
                            })
                          }
                        >
                          Create Wallet
                        </button>
                      </div>
                    </>
                  )}
                </div>
               
                {userStats?.user_status === 1 ? (
                  <div className="mt-3">
                    <div className="create-wallet-1 d-flex flex-column align-items-start p-2 mt-2">
                      <h6 className="text-white">
                        Invite your friend and get{" "}
                        <span className="text-warning"> $10</span>
                      </h6>
                      <p className="text-white">
                        Effortlessly manage your finance with us
                      </p>

                      <CopyToClipboard
                        text={`${BASE_URL_1}/signup?id=${userStats?.self_ref_code}`}
                        onCopy={() => setCopiedRef(true)}
                      >
                        <span className="mx-1 small">
                          <button className="btn btn-light mt-2">
                            Copy Link
                          </button>
                          {copiedRef ? (
                            <span
                              className="small mx-1"
                              style={{ color: "white" }}
                            >
                              Copied
                            </span>
                          ) : null}
                        </span>
                      </CopyToClipboard>
                    </div>
                  </div>
                ) : null}
              </div>
            )} */}
            <BoatTable/>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Enter OTP
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input className="form-controll" />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
