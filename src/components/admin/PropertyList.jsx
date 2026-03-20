import axios from "axios";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useState } from "react";
import { Delete, Edit, Trash } from "lucide-react";
import { STATUS_STYLES } from "../utils/statusStyles";

export const PropertyList = () => {
  const tableHeaders = [
    "Sr.",
    "Name",
    "City",
    "Gallery",
    "House No",
    "Owner ID",
    "Contact",
    "Email",
    "Type",
    "Status",
    "Verified",
    "Created At",
    "Action",
  ];
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    getAllPropertyies();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`/property/property/${id}`,{status: status})

      if (res?.status == 201) {
        toast.success(res.data.message);
        getAllPropertyies()
      }

    } catch(err) {
      console.log(err)
      toast.error('error while update')
    }
  };

  const getAllPropertyies = async () => {
    try {
      const res = await axios.get("/property/properties");
      //console.log(res?.data?.data)
      if (res.status == 200) {
        toast.success(res?.data?.message);
        setProperties(res?.data?.data);
      }
    } catch (err) {
      console.log(err?.response);
      toast.error("error while fetching data");
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">
        Property Management
      </h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-gray-600 table-auto rounded-md">
          <thead className="text-sm font-semibold bg-blue-500 text-white divide-y divide-gray-200">
            <tr className="border-b-2 border-white">
              {tableHeaders.map((header) => (
                <th key={header} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property, i) => (
              <tr
                key={property._id}
                className={`text-center text-sm transition-all duration-300 ${i % 2 == 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{property.propertyName}</td>
                <td className="p-2">{property.city}</td>
                <td className="p-2">{property.gallery?.length || 0} images</td>
                <td className="p-2">{property.houseNo}</td>
                <td className="p-2">{property.ownerId}</td>
                <td className="p-2">{property.propertyContact}</td>
                <td className="p-2">{property.propertyEmail}</td>
                <td className="p-2">{property.propertyType}</td>
                <td className={`p-1`}>
                  <span className={`p-1 text-xs font-bold rounded-md ${STATUS_STYLES[property.status] || STATUS_STYLES.DEFAULT}`}>
                    {property.status}
                  </span>
                </td>
                <td className="p-2">{property.isVerified ? "Yes" : "No"}</td>
                <td className="p-2">
                  {new Date(property.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-white space-x-1 flex">
                  <button
                    className="p-2 bg-blue-500 rounded-md hover:bg-blue-700"
                    onClick={() => updateStatus(property._id, "APPROVED")}
                    disabled={ property.status == "APPROVED" ? true: false}
                  >
                    Approve
                  </button>
                  <button
                    className="p-2 bg-red-500 hover:bg-red-700 rounded-md"
                    onClick={() => updateStatus(property._id, "REJECTED")}
                  >
                    Reject
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
