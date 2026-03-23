import axios from "axios"
import { toast } from "react-toastify"
import api from "../../api/axiosInstance"

export const getUser = async(userId) => {
  try {
    //console.log('userId:',userId)
    const res = await api.get(`/user/user`)
    //console.log('res.data.data',res.data.data)
    //setUserFirstName(res.data.data.firstName)
    return res.data.data

  } catch(err) {
    toast.error("error to get user")
  }
}

