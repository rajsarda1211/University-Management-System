import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Heading from "../../components/Heading";
import { MdOutlineDelete } from "react-icons/md";
import { baseApiURL } from "../../baseUrl";

const Subjects = () => {
  const [data, setData] = useState({
    name: "",
    code: "",
  });
  const [selected, setSelected] = useState("add");
  const [subject, setSubject] = useState();

  useEffect(() => {
    getSubjectHandler();
  }, []);

  const getSubjectHandler = () => {
    axios
      .get(`${baseApiURL()}/subject/getSubject`)
      .then((response) => {
        if (response.data.success) {
          setSubject(response.data.subject);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const addSubjectHandler = () => {
    toast.loading("Adding Subject...");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(`${baseApiURL()}/subject/addSubject`, data, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          setData({ name: "", code: "" });
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const deleteSubjectHandler = (id) => {
    toast.loading("Deleting Subject...");
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .delete(`${baseApiURL()}/subject/deleteSubject/${id}`, { headers })
      .then((response) => {
        toast.dismiss();
        if (response.data.success) {
          toast.success(response.data.message);
          getSubjectHandler();
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div className="w-full mx-auto mt-10 flex justify-center items-start flex-col mb-10">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full mb-6">
        <Heading title="Manage Subjects" />
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              selected === "add"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition duration-200`}
            onClick={() => setSelected("add")}
          >
            Add Subject
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-medium ${
              selected === "view"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition duration-200`}
            onClick={() => setSelected("view")}
          >
            View Subjects
          </button>
        </div>
      </div>

      {/* Add Subject Form */}
      {selected === "add" && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg mx-auto">
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Code
            </label>
            <input
              type="number"
              id="code"
              value={data.code}
              onChange={(e) => setData({ ...data, code: e.target.value })}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200"
              placeholder="Enter subject code"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Subject Name
            </label>
            <input
              type="text"
              id="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              className="mt-2 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition duration-200"
              placeholder="Enter subject name"
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition duration-200"
            onClick={addSubjectHandler}
          >
            Add Subject
          </button>
        </div>
      )}

      {/* View Subjects List */}
      {selected === "view" && (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-3xl mx-auto">
          {subject && subject.length > 0 ? (
            <ul className="space-y-4">
              {subject.map((item) => (
                <li
                  key={item.code}
                  className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
                >
                  <div className="text-lg font-medium">
                    {item.code} - {item.name}
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 transition duration-200 text-2xl"
                    onClick={() => deleteSubjectHandler(item._id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No subjects available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Subjects;
