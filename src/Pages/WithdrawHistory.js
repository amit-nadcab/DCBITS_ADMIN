import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Footer } from "../Components/Footer";
// import { Header } from "../Components/Header";
import { Sidebar } from "../Components/Sidebar";
import { getWithdrawHistory } from "../utils/apiFunction";

export const WithdrawHistory = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);

  useEffect(() => {
    getWithdrawHistory(user_id).then((res) => {
      setTab(res?.history);
    });
  }, [user_id]);

  return (
    <>
      <Sidebar />
     
      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Withdraw History</h4>
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
                  <th scope="col">No</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Withdraw Type</th>
                  <th scope="col">Withdraw Address</th>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Status</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    const test = new Date(e?.updatedAt);
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td className="td-min-with">{e?.amount} USDT</td>
                        <td className="td-min-with">
                          {e?.type === "roi" ? "ROI" : "Referral "}
                        </td>
                        <td className="td-min-with">
                          {e?.to_address.substr(0, 14) +
                            "......." +
                            e?.to_address.substr(28)}
                        </td>
                        <td className="td-min-with">
                          {e?.transection_id.substr(0, 14) +
                            "......." +
                            e?.transection_id.substr(28)}
                        </td>
                        <td>
                          <span
                            className={
                              e?.status === 1
                                ? "color-g"
                                : e?.status === -1
                                ? "color-o"
                                : e?.status === 2
                                ? "color-r"
                                : null
                            }
                          >
                            {e?.status === -1
                              ? "InProgress"
                              : e?.status === 1
                              ? "Completed"
                              : e?.status === 2
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
