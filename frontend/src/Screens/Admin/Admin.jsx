import React, { useState } from "react";
import Heading from "../../components/Heading";
import EditAdmin from "./Admin/EditAdmin";
import AddAdmin from "./Admin/AddAdmin";

const Admin = () => {
  const [selected, setSelected] = useState("add");

  return (
    <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <div className="mb-6">
          <Heading title="Admin Management" />
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b mb-6">
          <button
            className={`w-1/2 py-2 text-center font-semibold text-lg ${
              selected === "add"
                ? "text-blue-600 border-b-4 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setSelected("add")}
          >
            Add Admin
          </button>
          <button
            className={`w-1/2 py-2 text-center font-semibold text-lg ${
              selected === "edit"
                ? "text-blue-600 border-b-4 border-blue-500"
                : "text-gray-600"
            }`}
            onClick={() => setSelected("edit")}
          >
            Edit Admin
          </button>
        </div>

        {/* Content Section */}
        <div className="mt-4">
          {selected === "add" && <AddAdmin />}
          {selected === "edit" && <EditAdmin />}
        </div>
      </div>
    </div>
  );
};

export default Admin;
