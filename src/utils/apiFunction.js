import axios from "axios";
import { BASE_URL } from "./config";

import { toast } from "react-toastify";

export const registration = async (refID, email, password, confirm_password, navigate) => {
  try {
    const data = await axios.post(`${BASE_URL}/register-user`, { parent_ref_code: refID, email: email, password: password, confirm_password: confirm_password, });
    return data.data;
  } catch (error) {
    if (error) {
      toast.error(error?.response?.data?.message);
    }
    console.log(error, "error");
  }
};
export const verifyEmail = async (otp, user_id) => {
  try {
    const data = await axios.post(`${BASE_URL}/varifie/email`, { otp: otp, user_id: user_id, });
    return data.data;
  } catch (error) {
    toast.error(error.response.data.message);
    console.log(error, "");
  }
};
export const login = async (email, password, navigate) => {
  try {
    const data = await axios.post(`${BASE_URL}/admin/login`, {
      email: email,
      password: password,
    });
    return data.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
export const resendOtp = async (user_id) => {
  try {
    const data = await axios.post(`${BASE_URL}/resend-otp`, {
      user_id: user_id,
    });
    console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const createWallet = async (user_id) => {
  try {
    const data = await axios.post(`${BASE_URL}/create-wallets-dcbit`, {
      user_id: user_id,
    });
    return data.data;
  } catch (error) {
    console.log(error);
  }
};
export const getWalletAddress = async (user_id) => {
  try {
    const data = await axios.post(`${BASE_URL}/get-wallets-dcbits`, { user_id: user_id })
    console.log(data.data)
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const updateWallet = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/update-wallet`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getWithdrawHistory = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/withdraw-history`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const checkUserStatus = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/check_user_status`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getReferralHistroy = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/reffral-history`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getInvestmentHistory = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/investment-history`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getRoiHistory = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/roi-history`,{user_id: user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const botTradeHistory = async(user_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/trade-bot-history`,{user_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const withdraw = async(user_id, type,toAddress, volume)=>{
  try {
    console.log(user_id,toAddress,type,volume)
    const data = await axios.post(`${BASE_URL}/get-withdraw`,{user_id, type,toAddress,volume})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const verifyWithdrawOtp = async(user_id,otp,transection_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/varify/email-Withdraw`,{user_id, otp, transection_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}



export const adminPendingWithdrwa  = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/admin/pending-withdraw`,{user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const adminSuccessWithdrwa = async(user_id,withdrawHistory)=>{
  try {
    const data = axios.post(`${BASE_URL}/admin/success-withdraw`,{user_id,withdrawHistory})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const adminWithdrawHistroy = async(user_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/admin/withdraw-history`,{user_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getActiveUsers = async(user_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/admin/activeUser`,{user_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getInactiveUser = async(user_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/admin/notActiveUser`,{user_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getTotalData = async(user_id)=>{
  try {
    const data = await axios.post(`${BASE_URL}/admin/get-data`,{user_id})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getColdWallet = async()=>{
  try {
    const data = await axios.get(`${BASE_URL}/coldwallet`)
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getHotWallet = async()=>{
  try {
    const data = await axios.get(`${BASE_URL}/hotwallet`)
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const updateColdWallet = async(wallet_type, wallet_address)=>{
  try {
      const data = await axios.post(`${BASE_URL}/updatecoldwallet`,{wallet_type, wallet_address})
      return data.data
  } catch (error) {
    console.log(error);
  }
}
export const updateHotWallet =async(wallet_type, wallet_address, private_key)=>{
  try {
    const data = await axios.post(`${BASE_URL}/updatehotwallet`,{wallet_type,wallet_address,private_key})
    return data.data
  } catch (error) {
    console.log(error);
  }
}
export const getInvetHistory = async(user_id)=>{
  try {
      const data = await axios.post(`${BASE_URL}/admin/investment-history`,{user_id})
      return data.data
  } catch (error) {
    console.log(error);
  }
}



