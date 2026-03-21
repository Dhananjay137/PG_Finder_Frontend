import axios from "axios";
import { Edit, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileCard } from "../utils/FileCard";
import { STATUS_STYLES } from "../utils/statusStyles";

export const UserList = () => {
  const [users, setUsers] = useState([]);
  const [displayFile, setDisplayFile] = useState(false)
  const [fileUrl, setFileUrl] = useState('')
  const [fileName, setFileName] = useState('')
  const tableHeaders = ["Sr", "Profile", "First Name", "Middle Name", "Last Name","Phone", "Email", "Looking For Partner", "Role", "Status","Action"];

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleFile = (url, name) => {
    console.log(url, name)
    setFileUrl(url)
    setFileName(name)
    setDisplayFile(!displayFile)
  }

  const deleteUser = async(id) => {
    try{
      const res = await axios.delete(`/user/user/${id}`)
      if(res?.status == 200){
        toast.success(res?.data?.message)
        getAllUsers()
      }

    } catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const updateStatus = async(id, status) => {
    try{
      let formData = new FormData()
      formData.append('status',status)
      console.log([...formData])

      const res = await axios.put(`user/user/${id}`,formData)

      if(res?.status == 200){
        toast.success(res?.data?.message)
        getAllUsers()
      }
      
    } catch(err) {
      console.log(err)
      toast.error(err?.message)
    }
  }

  const getAllUsers = async () => {
    try {
      const res = await axios.get("/user/users");
      //console.log(res?.data?.data)
      if (res.status == 200) {
        setUsers(res?.data?.data);
        toast.success(res?.data?.message);
      }
    } catch (err) {
      console.log(err)
      toast.error(err?.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 lg:min-h-screen ">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">User Management</h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        {/* Moved OUTSIDE the overflow-hidden div so it can cover the full screen */}
        {displayFile && (
          <FileCard 
            fileUrl={fileUrl} 
            fileName={fileName} 
            onClose={() => setDisplayFile(false)} 
          />
        )}
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
                <td className="p-2">
                  <button onClick={() => handleFile(user.profilePic,user.firstName)}>
                    <img className="h-10 w-10 rounded-full" src={user.profilePic} alt={user.firstName}  />
                  </button>
                </td>
                <td className="p-2">{user.firstName}</td>
                <td className="p-2">{user.middleName}</td>
                <td className="p-2">{user.lastName}</td>
                <td className="p-2">{user.contact}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.lookingForPartner ? 'YES' : 'NO'}</td>
                <td className="p-2">{user.role}</td>
                <td className="p-1">
                  <span className={`text-xs p-1 rounded-md font-bold ${STATUS_STYLES[user.status] || STATUS_STYLES.DEFAULT}`}>
                    {user.status}
                  </span>
                </td>
                <td className="text-white space-x-1">
                  <button 
                  className="bg-red-500 hover:bg-red-600 p-2 rounded-md cursor-pointer transition-all duration-300"
                  onClick={() => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-blue-500 hover:bg-blue-600 p-2 rounded-md cursor-pointer transition-all duration-300"
                    onClick={() => updateStatus(user._id, user.status == 'BLOCKED'? 'ACTIVE':'BLOCKED')}
                  >
                    {user.status == 'BLOCKED'? 'Unblock':'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </div>
  );
};
