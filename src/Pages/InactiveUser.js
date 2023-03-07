import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roundTo } from "round-to";
import { Footer } from "../Components/Footer";
import { Sidebar } from "../Components/Sidebar";
import { getInactiveUser } from "../utils/apiFunction";

export const InactiveUser = () => {
  const { user_id } = useSelector((state) => state.data.value);
  const [tab, setTab] = useState([]);

  useEffect(() => {
    getInactiveUser(user_id).then((res) => {
      console.log(res, "active user response");
      setTab(res?.activeUser);
    });
  }, [user_id]);
  return (
    <>
      <Sidebar />

      <div className="page-wrapper pt-5">
        <div className="container pt-5">
          <h4 className="text-center text-secondary">Inactive Users</h4>
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
                  <th scope="col">email</th>
                  <th scope="col">Parent ID</th>
                  <th scope="col">Direct Members</th>
                  <th scope="col">Withdraw</th>
                  <th scope="col">Referral Income</th>
                  <th scope="col">ROI Income</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    const test = new Date(e?.updatedAt);
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td className="td-min-with">{e?.email}</td>
                        <td className="td-min-with">{e?.parent_ref_code}</td>
                        <td className="">{e?.directs}</td>
                        <td className="td-min-with">{e?.total_withdrawal}</td>
                        <td>
                          {e?.referral_income
                            ? roundTo(e?.referral_income, 4)
                            : 0}
                        </td>
                        <td>{e?.roi_income ? roundTo(e?.roi_income, 4) : 0}</td>
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
