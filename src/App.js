import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./App.css";

import { Home } from "./Pages/Home";
import { Signup } from "./Pages/Signup";
import { Login } from "./Pages/Login";
import { VerifyEmail } from "./Pages/VerifyEmail";
import { Dashboard } from "./Pages/Dashboard";
import { InvestHistory } from "./Pages/InvestHistory";
import { WithdrawHistory } from "./Pages/WithdrawHistory";
import { RequestWithdraw } from "./Pages/RequestWithdraw";
import {ReferralIncome} from './Pages/ReferralIncome'
import {RoiHistory} from './Pages/RoiHistory'
import { ActiveUsers } from "./Pages/ActiveUsers";
import { InactiveUser } from "./Pages/InactiveUser";
import { ColdWallet } from "./Pages/ColdWallet";
import { HotWallet } from "./Pages/HotWallet";
import { InvestHistoryAdmin } from "./Pages/InvestHistoryAdmin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const { isLoggedIn } = useSelector((state) => state.data.value);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Home />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to='/home' />} />
        <Route path="/home" element={<Home />} />

        <Route path="/withdrawHistory" element={isLoggedIn ? <WithdrawHistory /> : <Navigate to='/home' />} />
        <Route path="/requestWithdraw" element={isLoggedIn ? <RequestWithdraw /> : <Navigate to='/home' />} />
        <Route path="/investHistory" element={isLoggedIn ?  <InvestHistory />: <Navigate to='/home' /> } />
        <Route path="/activeUsers" element={isLoggedIn ?  <ActiveUsers />: <Navigate to='/home' /> } />
        <Route path="/inActiveUsers" element={isLoggedIn ?  <InactiveUser />: <Navigate to='/home' /> } />
        <Route path="/coldWallet" element={isLoggedIn ?  <ColdWallet />: <Navigate to='/home' /> } />
        <Route path="/hotWallet" element={isLoggedIn ?  <HotWallet />: <Navigate to='/home' /> } />
        <Route path="/investmentHistory" element={isLoggedIn ?  <InvestHistoryAdmin />: <Navigate to='/home' /> } />
        <Route path="/roiHistory" element={isLoggedIn ?  <RoiHistory />: <Navigate to='/home' /> } />
        <Route path="/referralIncome" element={isLoggedIn ?  <ReferralIncome />: <Navigate to='/home' /> } />

        <Route path="/verifyEmail" element={<VerifyEmail />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to='/home' /> : <Signup />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to='/home' /> : <Login />} />
        
      </>
    )
  )

  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
