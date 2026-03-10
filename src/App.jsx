import axios from "axios"
import AppRouter from "./router/AppRouter"

function App() {

  axios.defaults.baseURL = "http://localhost:3000"
  
  return (
    <>
      <AppRouter></AppRouter>
    </>
  )
}

export default App
