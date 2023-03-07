import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
import { Sidebar } from "../Components/Sidebar";
import { getHotWallet, updateHotWallet } from "../utils/apiFunction";
import { toast } from "react-toastify";

export const HotWallet = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);

  const [walletAddress, setWalletAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [walletError, setWalletError] = useState(false);
  const [privateKeyError, setPrivateKeyError] = useState(false)

  useEffect(() => {
    getHotWallet(user_id).then((res) => {
      setTab(res);
    });
  }, [user_id]);

  const handleUpdate = () => {
    if (walletAddress === "") {
        setWalletError(true)
    }
    if(privateKey ===''){
        setPrivateKeyError(true)
    }
    if (walletAddress !== "" && privateKey !=="") {
      updateHotWallet("TRX", walletAddress,privateKey).then((res) => {
        if (res?.message === "Wallet address added successfully.") {
          toast.success(res?.message);
          getHotWallet(user_id).then((res) => {
            setTab(res);
          });
        } else {
          toast(res?.message);
        }
      });
    }
  };
  return (
    <>
      <Sidebar />

      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Hot Wallet</h4>
          <div className="row mx-1 align-items-center justify-content-center py-4 mt-5 dummy-data">
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <p className="ms-1"> Enter Wallet Address</p>
              </span>
              <b className="h3">
                <input
                  className="form-control"
                  value={walletAddress}
                  onChange={(e) => {
                    if(e.target.value !=''){
                        setWalletError(false)
                    }
                    setWalletAddress(e.target.value);
                  }}
                />
              </b>
              {
                walletError ? <p className="error-msg">Enter Wallet Address</p> : null 
              }
              
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <span className="d-flex align-items-center justify-content-center">
                <p className="ms-1"> Enter Private Key</p>
              </span>
              <b className="h3">
                <input
                  className="form-control"
                  value={privateKey}
                  onChange={(e) => {
                    if(e.target.value){
                        setPrivateKeyError(false)
                    }
                    setPrivateKey(e.target.value);
                  }}
                />
              </b>
              {
                privateKeyError ? <p className="error-msg">Enter Private Key</p> : null 
              }
              
            </div>
            <div className="col-md-4 col-12 text-center card-mob">
              <button className="btn btn-primary" onClick={()=>{
                handleUpdate()
              }}>Update</button>
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
                  <th scope="col">Private Key</th>
                  <th scope="col">Total Fund</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    const test = new Date(e?.updatedAt);
                    return (
                      <tr>
                        <td className="td-min-with">{e?.wallet_type}</td>
                        <td className="td-min-with">{e?.wallet_address}</td>
                        <td className="td-min-with">{e?.private_key}</td>
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
