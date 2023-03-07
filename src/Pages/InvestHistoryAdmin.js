import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roundTo } from "round-to";
import { Footer } from "../Components/Footer";
import { Sidebar } from "../Components/Sidebar";
import { getInvetHistory} from "../utils/apiFunction";

export const InvestHistoryAdmin = () => {
    const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);
  const [total,setTotal] = useState([])

  useEffect(() => {
    getInvetHistory(user_id).then((res) => {
      setTab(res?.history);
      setTotal(res?.total)
    });
  }, [user_id]);
  return (
    <>
      <Sidebar />

      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Investment History</h4>
          <div className="row mx-1 align-items-center justify-content-center py-4 mt-5 dummy-data">
            
              <div className="col-md-6 col-12 text-center card-mob">
                <span className="d-flex align-items-center justify-content-center">
                  {/* <div className="stat-card-dot-p"></div>{" "} */}
                  <p className="ms-1"> Total Invested Amount</p>
                </span>
                <b className="h3">{total[0]?.totalInvest ? roundTo((total[0]?.totalInvest),4) : 0} USDT</b>
              </div>
              {/* <div className="col-md-6 col-12 text-center card-mob">
                <span className="d-flex align-items-center justify-content-center">
                  <div className="stat-card-dot-p"></div>{" "}
                  <p className="ms-1"> Total Withdraw Fee</p>
                </span>
                <b className="h3">{total[0]?.totalWithdrawFee ? roundTo((total[0]?.totalWithdrawFee),4) : 0} USDT</b>
              </div> */}
           
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
                  <th scope="col">No</th>
                  <th scope="col">Amount</th>
                  <th scope="col">ROI %</th>
                  <th scope="col">Investment Type</th>
                  <th scope="col">ROI Max Paid</th>
                  <th scope="col">ROI Paid</th>
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
                        <td className="td-min-with">{e?.roi_amount} USDT</td>
                        <td className="">{e?.roi_percent}</td>
                        <td><span>{e?.invest_type === 1? "Invest": e?.invest_type === 2? "Reinvest": null}</span></td>
                        <td>{e?.roi_max_paid}</td>
                        <td>{e?.roi_paid ? roundTo(e?.roi_paid,4) : 0}</td>
                        <td><span className={e?.is_roi_expired ? "color-g" : "color-o"}>{e?.is_roi_expired ? "Completed" : "Incomplete"}</span></td>
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
  )
}
