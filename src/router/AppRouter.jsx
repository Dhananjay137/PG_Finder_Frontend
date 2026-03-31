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
import { Properties } from "../components/owner/Properties"
import { OwnerBookings } from "../components/owner/OwnerBookings"
import { OwnerDashboard } from "../components/owner/OwnerDashboard"
import { PGDetailForm } from "../components/owner/PGDetailForm"
import { FlatDetailForm } from "../components/owner/FlatDetailForm"
import { AddRoomForm } from "../components/owner/AddRoomForm"
import { ViewUser } from "../components/utils/ViewUser"
import ProtectedRoutes from "../components/ProtectedRoutes"
import { ForgetPassword } from "../components/ForgetPassword"
import { PasswordReset } from "../components/utils/PasswordReset"
import { BookingDocumentForm } from "../components/seeker/BookingDocumentForm"
import { BookingDocument } from "../components/seeker/BookingDocument"
import { MainBookingForm } from "../components/seeker/MainBookingForm"
import { BookingDetails } from "../components/seeker/BookingDetails"
 
const router = createBrowserRouter([
  {path:"/", element:<Login />},
  {path:"/signUp", element: <SignUp/>},
  {path: "/aboutUs", element: <AboutUs/>},
  {path: "/password-forget", element: <ForgetPassword/>},
  {path: "/password-reset/:token", element: <PasswordReset/>},

  {path:"/seeker", element: 
    <ProtectedRoutes userRoles={['SEEKER']}>
      <SeekerHomePage/>
    </ProtectedRoutes>
    ,
    children: [
      {path:"home", element:<Home/>},
      {path:"bookings", element:<Bookings/>},
      {path:"feedback", element:<Feedbacks/>},
      {path:"help", element:<Help/>},
      {path:"wishList", element:<Wishlist/>},
      {path: "aboutUs", element: <AboutUs/>},
      {path:"reports", element:<Reports/>},
      {path:"profile", element:<Profile/>},
      {path:"detail/pg/:id", element:<PGDetails/>},
      {path:"detail/flat/:id", element:<FlatDetails/>},
      {path:"booking/:propertyType/:propertyId", element:<MainBookingForm/>},
      {path:'bookingDoc',element: <BookingDocument/>},
      {path:'booking-details/:id', element:<BookingDetails/>}
    ]
  },
  {path:"/owner", element: 
    <ProtectedRoutes userRoles={['OWNER']}>
      <OwnerHomePage/>
    </ProtectedRoutes>
  ,
    children:[
      {path:"dashboard", element:<OwnerDashboard/>},
      // {path:"aboutUs", element:<AboutUs/>},
      {path:"profile", element:<Profile/>},
      {path:"feedback-reports", element:<Reports/>},
      {path:"add-property", element:<AddProperty/>},
      {path:"properties/:status",element:<Properties/>},
      {path:"bookings/:status",element:<OwnerBookings/>},
      {path:"add-details/pg/:id",element:<PGDetailForm/>},
      {path:"add-details/flat/:id",element:<FlatDetailForm/>},
      {path:"detail/pg/:id", element: <PGDetails/>},
      {path:"detail/flat/:id",element:<FlatDetails/>},
      {path:"add-room/pg/:id", element: <AddRoomForm/>},
      {path:"view-user/:id", element: <ViewUser/>}

    ]
  },
  {path:"/admin", element: 
    <ProtectedRoutes userRoles={['ADMIN']}>
      <AdminHomePage/>
    </ProtectedRoutes>
  , 
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