import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"
import { SeekerHomePage } from "../pages/seeker/SeekerHomePage"
import { OwnerHomePage } from "../pages/owner/OwnerHomePage"
import { AdminHomePage } from "../pages/admin/AdminHomePage"
import { AllUserList } from "../components/admin/AllUserList"
import { AllPropertyList } from "../components/AllPropertyList"

const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/signUp", element: <SignUp/>},

  {path:"/seeker", element: <SeekerHomePage/>,
    children: [
      {path:"allPropertyList", element: <AllPropertyList/>}
    ]
  },
  {path:"/owner", element: <OwnerHomePage/>},
  {path:"/admin", element: <AdminHomePage/>, 
    children: [
      {path:"allUserList", element: <AllUserList/>},
      {path:"allPropertyList", element: <AllPropertyList/>}
    ]
  }

])

const AppRouter = () => {
  return <RouterProvider router={router} ></RouterProvider>

}
export default AppRouter