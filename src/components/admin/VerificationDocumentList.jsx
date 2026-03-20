import axios from "axios";
import { Edit, Trash, View } from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FileCard } from "../utils/FileCard";
import { STATUS_STYLES } from "../utils/statusStyles";

export const VerificationDocumentList = () => {
  const [documents, setDocuments] = useState([]);
  const [displayFile, setDisplayFile] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const tableHeaders = [
    "Sr",
    "User ID",
    "Doc Name",
    "Doc",
    "Verification Status",
    "Created At",
    "Action",
  ];

  useEffect(() => {
    getAllDocument();
  }, []);
  const handleFile = (url, name) => {
    console.log(url, name);
    setFileUrl(url);
    setFileName(name);
    setDisplayFile(!displayFile);
  };
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `/bookingDocument/bookingDocument/${id}`,
        {verificationStatus: status}
      );
      //console.log(res)
      if (res?.status == 201) {
        toast.success(res.data.message);
        getAllDocument();
      }
    } catch (err) {
      console.log(err);
      toast.error("error while updating status");
    }
  };
  const getAllDocument = async () => {
    try {
      const res = await axios.get("/bookingDocument/bookingDocuments");
      //console.log(res)
      if (res?.status == 200) {
        toast.success(res?.data?.message);
        setDocuments(res?.data?.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("error while fetching");
    }
  };
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-gray-600 font-extrabold text-2xl mb-2">
        Document Verification Management
      </h2>
      {/* Moved OUTSIDE the overflow-hidden div so it can cover the full screen */}
      {displayFile && (
        <FileCard
          fileUrl={fileUrl}
          fileName={fileName}
          onClose={() => setDisplayFile(false)}
        />
      )}
      <div className="overflow-hidden overflow-x-auto border border-gray-200 rounded-lg">
        <table className="min-w-full text-gray-600 table-auto rounded-md">
          <thead className="font-semibold text-sm bg-blue-500 text-white divide-y divide-gray-200">
            <tr className="border-b-2 border-white">
              {tableHeaders.map((header) => (
                <th key={header} className="p-4">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {documents.map((document, i) => (
              <tr
                key={document._id}
                className={`text-center text-sm transition-all duration-300 ${i % 2 == 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100`}
              >
                <td className="p-2">{i + 1}</td>
                <td className="p-2">{document.userID}</td>
                <td className="p-2">{document.documentName}</td>
                <td className="p-2 text-white">
                  {/* {document.fileUrl} */}
                  <button
                    className="cursor-pointer transition-all duration-300 bg-gray-500 hover:bg-gray-600 p-2 rounded-md"
                    onClick={() =>
                      handleFile(document.fileUrl, document.documentName)
                    }
                  >
                    <View size={16} />
                  </button>
                </td>
                <td className="p-1">{}
                  <span className={`text-xs p-1 rounded-md font-bold ${STATUS_STYLES[document.verificationStatus] || STATUS_STYLES.DEFAULT}`}>
                    {document.verificationStatus}
                  </span>
                </td>
                <td className="p-2">
                  {new Date(document.createdAt).toLocaleString()}
                </td>
                <td className="p-2 text-white space-x-1">
                  <button
                    className="p-2 bg-blue-500 rounded-md hover:bg-blue-700"
                    onClick={() => updateStatus(document._id, "VERIFIED")}
                    disabled={document.verificationStatus == "VERIFIED" ? true: false}
                  >
                    Approve
                  </button>
                  <button
                    className="p-2 bg-red-500 hover:bg-red-700 rounded-md"
                    onClick={() => updateStatus(document._id, "REJECTED")}
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
