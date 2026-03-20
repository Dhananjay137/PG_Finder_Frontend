import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"
import { SeekerHomePage } from "../pages/seeker/SeekerHomePage"
import { OwnerHomePage } from "../pages/owner/OwnerHomePage"
import { AdminHomePage } from "../pages/admin/AdminHomePage"
import { AboutUs } from "../components/utils/AboutUs"
import { Bookings } from "../components/seeker/Bookings"
import { Feedbacks } from "../components/seeker/Feedbacks"
import { Help } from '../components/seeker/Help'
import { Wishlist } from "../components/seeker/Wishlist"
import { Reports } from "../components/utils/Reports"
import { Profile } from "../components/utils/Profile"
import { AddProperty } from "../components/owner/AddProperty"
import { PGDetails } from "../components/utils/PGDetails"
import { FlatDetails } from "../components/utils/FlatDetails"
import { Home } from "../components/seeker/Home"
import { AdminDashboard } from "../components/admin/AdminDashboard"
import { UserList } from "../components/admin/UserList"
import { PropertyList } from "../components/admin/PropertyList"
import { VerificationDocumentList } from "../components/admin/VerificationDocumentList"
import { BookingList } from "../components/admin/BookingList"
import { FeedbackList } from "../components/admin/FeedbackList"
import { FeedbackReportList } from "../components/admin/FeedbackReportList"
import { FileCard } from "../components/utils/FileCard"

const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/signUp", element: <SignUp/>},
  {path: "/aboutUs", element: <AboutUs/>},

  {path:"/seeker", element: <SeekerHomePage/>,
    children: [
      {path:"home", element:<Home/>},
      {path:"bookings", element:<Bookings/>},
      {path:"feedback", element:<Feedbacks/>},
      {path:"help", element:<Help/>},
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
      {path:'dashboard', element: <AdminDashboard/>},
      {path:'users', element: <UserList/>},
      {path:'properties', element: <PropertyList/>},
      {path:'document-verification', element: <VerificationDocumentList/>},
      {path:'bookings', element: <BookingList/>},
      {path:'feedbacks', element: <FeedbackList/>},
      {path:'feedback-reports', element: <FeedbackReportList/>}
    ]
  }

])

const AppRouter = () => {
  return <RouterProvider router={router} ></RouterProvider>

}
export default AppRouter