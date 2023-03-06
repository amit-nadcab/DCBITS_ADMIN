import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { roundTo } from "round-to";
import { botTradeHistory} from "../utils/apiFunction";
import './boatTable.css'


export const BoatTable = () => {
    const { user_id } = useSelector((state) => state.data.value);
    const [tab, setTab] = useState([]);
  
    useEffect(() => {
      botTradeHistory(user_id).then((res)=>{
            setTab(res?.history);
      })
    }, [user_id]);
  return (
    <>
   
        <div className="container pt-1 mb-3">
          <h4 className="text-center text-secondary">Boat Trading</h4>
          <div className="table-responsive mt-5 px-3 pb-3 pt-3" style={{ background: "#FFF", border: "1px solid white", borderRadius: "12px", maxHeight: "500px"}}>
            <table className="table table-borderless" style={{ background: "#FFF" }}>
              <thead className="bot-table-thead">
                <tr className="text-dark" style={{border: "1px solid white",borderRadius: "12px", fontSize: "1rem" }}>
                  <th scope="col">Trade Pair</th>
                  <th scope="col">Buy Price</th>
                  <th scope="col">Sell Price</th>
                  <th scope="col">Floating Loss</th>
                  <th scope="col">Profit</th>
                </tr>
              </thead>
              <tbody className="text-center text-dark">
                {tab && tab.length > 0 ? (
                  tab.map((e, i) => {
                    
                    return (  
                    
                      <tr>
                        <td>{"BTC/USDT"}</td>
                        <td className="td-min-with">{e?.low ? roundTo(e?.low,4): 0}</td>
                        <td className="td-min-with">{e?.high ? roundTo(e?.high,4): 0}</td>
                        <td>{e?.loss ? roundTo(e?.loss,4): 0}</td>
                        <td>{e?.profit ? roundTo(e?.profit,4): 0}</td>
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
    
     
    </>
  )
}
