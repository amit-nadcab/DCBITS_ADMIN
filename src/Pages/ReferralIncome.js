import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../Components/Sidebar";
import { Footer } from "../Components/Footer";
import { Header } from "../Components/Header";
import { getReferralHistroy } from "../utils/apiFunction";

export const ReferralIncome = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);

  useEffect(() => {
    getReferralHistroy(user_id).then((res) => {
      setTab(res?.history);
    });
  }, [user_id]);

  return (
    <>
      {/* <Sidebar /> */}
      <Header />
      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Referral Income</h4>
          <div className="table-responsive mt-5 p-3" style={{ background: "#FFF", border: "1px solid white", borderRadius: "10px" }}>
            <table className="table table-borderless">
              <thead className="text-center" style={{ background: "#F4F5F9",border: "1px solid white", borderRadius: "10px" }}>
                <tr className="text-dark">
                  <th scope="col">No</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Level</th>
                  <th scope="col">Gmail</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>  
              <tbody className="text-center text-dark">
                {tab && tab?.length > 0 ? (
                  tab.map((e, i) => {
                    const test = new Date((e?.createdAt));
                    return (
                      <tr>
                        <td>{i+1}</td>
                        <td className="td-min-with">
                          {`${e?.amount} USDT`}</td>
                        <td className="td-min-with">{e?.level}</td>
                        <td className="td-min-with">{e?.email}</td>
                        <td>{test.toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tbody className="">
                    <p className="text-dark text-center w-100">No Data Found</p>
                  </tbody>
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
