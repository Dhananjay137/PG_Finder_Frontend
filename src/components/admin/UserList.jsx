import axios from "axios";
import { Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const tableHeaders = ["Sr", "Profile", "First Name", "Middle Name", "Last Name","Phone", "Email", "Looking For Partner", "Role", "Status","Action"];

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/user/users");
      //console.log(res?.data?.data)
      if (res.status == 200) {
        setUsers(res?.data?.data);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err?.response?.data?.message)
      toast.error("error while fetch");
    }
  };

  return (
    <div className="p-6 bg-gray-50 lg:min-h-screen ">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">User Management</h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-gray-600 table-auto divide-y divide-gray-200">
          <thead className="font-semibold text-sm bg-blue-500 text-white">
            <tr className="border-b-2 border-white">
              {tableHeaders.map((header) => (
                <th key={header} className="p-4">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user, i) => (
              <tr key={user._id} className={`text-center text-sm transition-all duration-300 ${i%2 == 0 ? 'bg-gray-50':'bg-white'} hover:bg-gray-100`}>
                <td className="p-2">{i + 1}</td>
                <td className="p-2"><img className="h-10 w-10 rounded-full" src={user.profilePic} alt={user.name} /></td>
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.middleName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.contact}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.lookingForPartner ? 'YES' : 'NO'}</td>
                <td className="p-2">{user.role}</td>
                <td className={user.status == 'ACTIVE'? 'p-3 font-bold text-green-600':'p-3 font-bold text-red-600'}>{user.status}</td>
                <td className="text-white space-x-1">
                  <button className="bg-red-500 hover:bg-red-600 p-2 rounded-md cursor-pointer transition-all duration-300"><Trash size={16}/></button>
                  <button className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer transition-all duration-300"><Edit size={16}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
