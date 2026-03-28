import { useNavigate } from "react-router-dom"

export const useLogout = () => {
  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return logOut
}