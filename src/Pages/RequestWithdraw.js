import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
import { Sidebar } from "../Components/Sidebar";
import {
  adminPendingWithdrwa,
  adminSuccessWithdrwa,
} from "../utils/apiFunction";
export const RequestWithdraw = () => {
  const TOKEN_CONTRACT = "TBKdxmngduHGMVvxkrM39fWFq3xgDzfqqe";
  const MLM_CONTRACT = "TPUiP6gPWrdLz13bj3PRpzKZR7ZDwPBg8F";
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);
  const [userWalletAddress, setUserWalletAddress] = useState();
  const [arr, setArr] = useState([]);
  const [allcheck, setAllchek] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalFees, setTotalFees] = useState(0);

  useEffect(() => {
    gettronweb();
  }, [userWalletAddress]);
  async function gettronweb() {
    if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
      console.log("Yes, catch it:", window.tronWeb.defaultAddress.base58);
      setUserWalletAddress(window.tronWeb.defaultAddress.base58);
    }
  }
  async function makePayment() {
    try {
      let wallets = [];
      let usdtamount = [];
      let txn_id = [];
      let total_usdt = 0;

      arr.length > 0 &&
        arr.map((e, i) => {
          wallets.push(e?.to_address);
          txn_id.push(e?.transection_id);
          let withdrawAmount = e?.amount - e?.withdrawal_fee;
          usdtamount.push(withdrawAmount * 1000000);
          total_usdt += withdrawAmount;
        });
      setTotalAmount(usdtamount);
      console.log(wallets, usdtamount, total_usdt);

      if (
        wallets.length > 0 &&
        usdtamount.length > 0 &&
        total_usdt > 0 &&
        txn_id.length > 0
      ) {
        let TokenContract = await window.tronWeb.contract().at(TOKEN_CONTRACT);
        let MLMContract = await window.tronWeb.contract().at(MLM_CONTRACT);
        var approvalAmount = total_usdt * 1000000;
        console.log("Token Payment");
        var appres = await TokenContract.approve(
          MLM_CONTRACT,
          approvalAmount.toString()
        ).send({ feeLimit: 20000000 });
        if (appres) {
          //alert(appres);
          await MLMContract.multisend_USDT(
            wallets,
            usdtamount,
            approvalAmount.toString()
          )
            .send({
              feeLimit: 200000000,
            })
            .then(function (transaction) {
              adminSuccessWithdrwa(user_id, txn_id).then((res) => {
                console.log(res, "response");
                adminPendingWithdrwa(user_id).then((res) => {
                  setTab(res?.history);
                });
              });
              console.log("transaction", transaction);
            });
        } else {
          console.log("Confirmation declined by user");
        }
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    adminPendingWithdrwa(user_id).then((res) => {
      setTab(res?.history);
    });
  }, [user_id]);
  let ttamount = 0;
  let ttfees = 0;
  const getValue = (e, event, i) => {

    
      arr.length > 0 &&
      arr.map((e, i) => {
        let withdrawAmount = e?.amount - e?.withdrawal_fee;
        ttamount += withdrawAmount;
        (ttfees += e?.withdrawal_fee);
      });
    
    
    console.log(e, event, ttamount, "hh", ttfees);
    if (event) {
      document.getElementById(`${i}_id`).checked = true;
      setArr([...arr, e]);
    } else {
      setAllchek(false);
      document.getElementById(`${i}_id`).checked = false;
      const newArr = arr.filter(
        (ele) => ele?.transection_id !== e?.transection_id
      );
      setArr(newArr);
    }
  };

  console.log(arr);

  return (
    <>
      <Sidebar />
      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary"> Request Withdraw</h4>
          <div className="row mx-1 align-items-center justify-content-center py-4 mt-5 dummy-data">
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <div className="stat-card-dot-p"></div>{" "}
                <p className="ms-1"> Total Withdraw Amount</p>
              </span>
              <b className="h3">111 USDT</b>
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <div className="stat-card-dot-p"></div>{" "}
                <p className="ms-1"> Total Withdraw Fee</p>
              </span>
              <b className="h3">111 USDT</b>
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <button
                onClick={() => {
                  makePayment();
                }}
                className="btn btn-primary"
              >
                Make Payment
              </button>
            </div>
          </div>
          <div
            className="table-responsive mt-5 p-3"
            style={{
              background: "#FFF",
              border: "1px solid white",
              borderRadius: "12px",
            }}
          >
            <table
              className="table table-borderless"
              style={{ background: "#FFF" }}
            >
              <thead
                className="text-center"
                style={{
                  background: "#F4F5F9",
                  border: "1px solid white",
                  borderRadius: "12px",
                }}
              >
                <tr
                  className="text-dark"
                  style={{ border: "1px solid white", borderRadius: "12px" }}
                >
                  <th scope="col">
                    {" "}
                    <div className="form-check">
                      <label
                        className="form-check-label"
                        for="flexCheckDefault"
                      >
                        All
                      </label>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        checked={allcheck ? true : false}
                        id="flexCheckDefault"
                        onClick={(e) => {
                          if (e.target.checked) {
                            setAllchek(true);
                            const an = document.getElementsByClassName("amit");
                            for (let i = 0; 1 < an.length; i++) {
                              an[i].checked = true;
                            }

                            setArr(tab);
                          } else {
                            setAllchek(false);
                            const an = document.getElementsByClassName("amit");
                            for (let i = 0; 1 < an.length; i++) {
                              an[i].checked = false;
                            }
                          }
                        }}
                      />
                    </div>
                  </th>
                  <th scope="col">No</th>

                  <th scope="col">Amount</th>
                  <th scope="col">Fees</th>
                  <th scope="col">Withdraw Type</th>
                  <th scope="col">Withdraw Address</th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((element, i) => {
                    const test = new Date(element?.updatedAt);
                    return (
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              className="form-check-input amit"
                              type="checkbox"
                              value=""
                              onChange={(e) => {
                                if (e.target.checked) {
                                  document.getElementById(
                                    `${i}_id`
                                  ).checked = true;
                                }
                                if (allcheck) {
                                  document.getElementById(
                                    `${i}_id`
                                  ).checked = true;
                                }
                              }}
                              // checked={allcheck ? true : !allcheck ? true: true}
                              id={`${i}_id`}
                              onClick={(e) => {
                                getValue(element, e.target.checked, i);
                              }}
                            />
                          </div>
                        </td>
                        <td>{i + 1}</td>

                        <td className="td-min-with">{element?.amount} USDT</td>
                        <td className="td-min-with">
                          {element?.withdrawal_fee} USDT
                        </td>
                        <td className="td-min-with">
                          {element?.type === "roi" ? "ROI" : "Referral "}
                        </td>
                        <td className="td-min-with">
                          {element?.to_address.substr(0, 10) +
                            "......." +
                            element?.to_address.substr(28)}
                        </td>
                        <td className="td-min-with">
                          {element?.transection_id.substr(0, 10) +
                            "......." +
                            element?.transection_id.substr(28)}
                        </td>
                        <td>
                          <span
                            className={
                              element?.status === 1
                                ? "color-g"
                                : element?.status === -1
                                ? "color-o"
                                : element?.status === 2
                                ? "color-r"
                                : null
                            }
                          >
                            {element?.status === -1
                              ? "InProgress"
                              : element?.status === 1
                              ? "Completed"
                              : element?.status === 2
                              ? "Canceled"
                              : null}
                          </span>
                        </td>
                        <td>{test.toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <p> No data found</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
