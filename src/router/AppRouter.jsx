import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"
import { SeekerHomePage } from "../pages/seeker/SeekerHomePage"
import { OwnerHomePage } from "../pages/owner/OwnerHomePage"
import { AdminHomePage } from "../pages/admin/AdminHomePage"
import { AllUserList } from "../components/admin/AllUserList"
import { AboutUs } from "../components/utils/AboutUs"
import { Bookings } from "../components/seeker/Bookings"
import { Feedbacks } from "../components/seeker/Feedbacks"
import { Help } from '../components/seeker/Help'
import { PropertyList } from "../components/seeker/PropertyList"
import { Wishlist } from "../components/seeker/Wishlist"
import { Reports } from "../components/utils/Reports"
import { Profile } from "../components/utils/Profile"
import { AddProperty } from "../components/owner/AddProperty"
import { PGDetails } from "../components/utils/PGDetails"
import { FlatDetails } from "../components/utils/FlatDetails"

const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/signUp", element: <SignUp/>},
  {path: "/aboutUs", element: <AboutUs/>},

  {path:"/seeker", element: <SeekerHomePage/>,
    children: [
      {path:"bookings", element:<Bookings/>},
      {path:"feedback", element:<Feedbacks/>},
      {path:"help", element:<Help/>},
      {path:"propertyList", element:<PropertyList/>},
      {path:"wishList", element:<Wishlist/>},
      {path: "aboutUs", element: <AboutUs/>},
      {path:"reports", element:<Reports/>},
      {path:"profile", element:<Profile/>},
      {path:"pgDetails/:propertyId", element:<PGDetails/>},
      {path:"flatDetails/:propertyID", element:<FlatDetails/>}
    ]
  },
  {path:"/owner", element: <OwnerHomePage/>,
    children:[
      {path:"aboutUs", element:<AboutUs/>},
      {path:"profile", element:<Profile/>},
      {path:"reports", element:<Reports/>},
      {path:"addProperty", element:<AddProperty/>}
    ]
  },
  {path:"/admin", element: <AdminHomePage/>, 
    children: [
      {path:"allUserList", element: <AllUserList/>},
    ]
  }

])

const AppRouter = () => {
  return <RouterProvider router={router} ></RouterProvider>

}
export default AppRouter