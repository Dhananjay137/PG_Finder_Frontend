import axios from "axios"
import AppRouter from "./router/AppRouter"
import { ToastContainer, Zoom } from "react-toastify"

function App() {
  
  return (
    <>
      <AppRouter></AppRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Zoom}
      />
    </>
  )
}

export default App
