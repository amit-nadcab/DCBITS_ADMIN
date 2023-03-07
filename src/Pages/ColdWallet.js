import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
import { Sidebar } from "../Components/Sidebar";
import Dropdown from "react-bootstrap/Dropdown";
import { toast } from "react-toastify";
import { getColdWallet, updateColdWallet } from "../utils/apiFunction";

export const ColdWallet = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);
  const [walletType, setWalletType] = useState("");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletTypeError, setWalletTypeError] = useState(false);
  const [walletAddressError, setWalletAddressError] = useState(false);

  useEffect(() => {
    getColdWallet(user_id).then((res) => {
      setTab(res);
    });
  }, [user_id]);

  const handleUpdate = () => {
    if (walletAddress === "") {
      setWalletAddressError(true);
    }
    if (walletType === "") {
      setWalletTypeError(true);
    }

    if (walletAddress !== "" && walletType !== "") {
      updateColdWallet(walletType, walletAddress).then((res) => {
        if (res?.message === "Wallet address added successfully.") {
          toast.success(res?.message);
          getColdWallet(user_id).then((res) => {
            setTab(res);
          });
        }else{
            toast(res?.message);
        }
        
      });
    }
  };

  const handleSelect = (e) => {
    console.log(e);
    if (e === "DCBT") {
      setWalletType("DCBT");
      setWalletTypeError(false);
    }
    if (e === "USDT") {
      setWalletType("USDT");
      setWalletTypeError(false);
    }
  };
  return (
    <>
      <Sidebar />

      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Cold Wallet</h4>
          <div className="row mx-1 align-items-center justify-content-center py-4 mt-5 dummy-data">
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <p className="ms-1"> Enter Wallet Type</p>
              </span>
              <b className="h3">
                <Dropdown onSelect={handleSelect}>
                  <Dropdown.Toggle
                    style={{ background: "#eef0f1", width: "50%" }}
                    variant="Secondary"
                    id="dropdown-basic"
                    size="sm"
                  >
                    {walletType == "USDT"
                      ? "USDT"
                      : walletType == "DCBT"
                      ? "DCBT"
                      : "Select Wallet Type"}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={"USDT"}>USDT</Dropdown.Item>
                    <Dropdown.Item eventKey={"DCBT"}>DCBT</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </b>
              {walletTypeError ? (
                <p className="error-msg">Select Wallet Type</p>
              ) : null}
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <p className="ms-1"> Enter Wallet Address</p>
              </span>
              <b className="h3">
                <input
                  className="form-control"
                  value={walletAddress}
                  onChange={(e) => {
                    if (e.target.value != "") {
                      setWalletAddressError(false);
                    }
                    setWalletAddress(e.target.value);
                  }}
                />
              </b>
              {walletAddressError ? (
                <p className="error-msg">Select Wallet Address</p>
              ) : null}
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <button
                className="btn btn-primary"
                onClick={() => handleUpdate()}
              >
                Update
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
                  <th scope="col">Wallet Type</th>
                  <th scope="col">Wallet Address</th>
                  <th scope="col">Total Fund</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    return (
                      <tr>
                        <td className="td-min-with">{e?.wallet_type}</td>
                        <td className="td-min-with">{e?.wallet_address}</td>
                        <td className="td-min-with">{e?.total_funds}</td>
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
