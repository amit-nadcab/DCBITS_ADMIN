import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "../Components/Sidebar";
import { Footer } from "../Components/Footer";
// import { Header } from "../Components/Header";
import { getInvestmentHistory } from "../utils/apiFunction";

export const InvestHistory = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);

  useEffect(() => {
    getInvestmentHistory(user_id).then((res) => {
      setTab(res?.history);
    });
  }, [user_id]);

  

  return (
    <>
      <Sidebar />
      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Investment History</h4>
          <div className="table-responsive mt-5 p-3" style={{ background: "#FFF", border: "1px solid white", borderRadius: "12px" }}>
            <table className="table table-borderless" style={{ background: "#FFF" }}>
              <thead className="text-center" style={{ background: "#F4F5F9",border: "1px solid white", borderRadius: "12px" }}>
                <tr className="text-dark" style={{border: "1px solid white",borderRadius: "12px" }}>
                  <th scope="col">No</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Investment Type</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    const test = new Date((e?.createdAt));
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td className="td-min-with">
                            {
                                e?.invest_type === 1 ? `${e?.roi_amount} USDT` : 
                                `${e?.roi_amount} USDT`
                            }
                        </td>
                        <td className="td-min-with">
                          {e?.invest_type === 1 ? "Investment" : "Reinvestment"}
                        </td>
                        <td>
                          <span className={e?.is_roi_expired === true ? "color-g" : "color-o"}>{e?.is_roi_expired === true ? "Completed" : "Running"}</span>
                          
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
