import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Delete, Edit, Trash } from "lucide-react";
import { STATUS_STYLES } from "../utils/statusStyles";
import api from "../../api/axiosInstance";

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

  // Pagination states
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10); 

  // Fetch data when page changes
  useEffect(() => {
    getAllProperties();
  }, [currentPage]);

  const updateStatus = async (id, status) => {
    try {
      const res = await api.put(`/property/property/${id}`, { status: status });

      if (res?.status === 201) {
        toast.success(res.data.message);
        getAllProperties();
      }
    } catch (err) {
      //console.log(err);
      toast.error(err?.message);
    }
  };

  const getAllProperties = async () => {
    try {
      // Appended page and limit parameters to match backend query layout
      const res = await api.get(`/property/properties?page=${currentPage}&limit=${limit}`);
      
      if (res.status === 200) {
        setProperties(res?.data?.data || []);
        setTotalPages(res?.data?.totalPages || 1);
      }
    } catch (err) {
      //console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">
        Property Management
      </h2>
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg bg-white">
        <table className="min-w-full text-gray-600 table-auto rounded-md">
          <thead className="text-sm font-semibold bg-blue-500 text-white divide-y divide-gray-200">
            <tr className="border-b-2 border-white">
              {tableHeaders.map((header) => (
                <th key={header} className="p-4 text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {properties.map((property, i) => (
              <tr
                key={property._id}
                className={`text-center text-sm transition-all duration-300 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                {/* Dynamically calculates continuous numbering across pages */}
                <td className="p-2">{((currentPage - 1) * limit) + i + 1}</td>
                <td className="p-2">{property.propertyName}</td>
                <td className="p-2">{property.city}</td>
                <td className="p-2">
                  {property.gallery?.length || 0} {property.gallery?.length > 1 ? 'images' : 'image'}
                </td>
                <td className="p-2">{property.houseNo}</td>
                <td className="p-2">{property.ownerId}</td>
                <td className="p-2">{property.propertyContact}</td>
                <td className="p-2">{property.propertyEmail}</td>
                <td className="p-2">{property.propertyType}</td>
                <td className="p-1">
                  <span className={`p-1 text-xs font-bold rounded-md ${STATUS_STYLES[property.status] || STATUS_STYLES.DEFAULT}`}>
                    {property.status}
                  </span>
                </td>
                <td className="p-2">{property.isVerified ? "Yes" : "No"}</td>
                <td className="p-2">
                  {new Date(property.createdAt).toLocaleDateString()}
                </td>
                <td className="p-2 text-white space-x-1 flex justify-center">
                  <button
                    className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 disabled:opacity-50"
                    onClick={() => updateStatus(property._id, "APPROVED")}
                    disabled={property.status === 'APPROVED'}
                  >
                    Approve
                  </button>
                  <button
                    className="p-2 bg-red-500 hover:bg-red-700 rounded-md disabled:opacity-50"
                    onClick={() => updateStatus(property._id, "REJECTED")}
                    disabled={property.status === 'REJECTED'}
                  >
                    Reject
                  </button>
                  <button
                    className="p-2 bg-gray-500 hover:bg-gray-700 rounded-md"
                    onClick={() => updateStatus(property._id, property.status === 'BLOCKED' ? 'PENDING' : 'BLOCKED')}
                  >
                    {property.status === 'BLOCKED' ? 'Unblock' : 'Block'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* New Pagination Control UI */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-white">
          <span className="text-sm text-gray-600">
            Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
          </span>
          <div className="inline-flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
