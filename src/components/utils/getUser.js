import axios from "axios"
import { toast } from "react-toastify"

export const getUser = async(userId) => {
  try {
    //console.log('userId:',userId)
    const res = await axios.get(`/user/user/${userId}`)
    //console.log('res.data.data',res.data.data)
    //setUserFirstName(res.data.data.firstName)
    return res.data.data

  } catch(err) {
    toast.error("error to get user")
  }
}

