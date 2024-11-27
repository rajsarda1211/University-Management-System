import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { baseApiURL } from "../baseUrl";

const Login = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("Student");
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    if (data.login !== "" && data.password !== "") {
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(`${baseApiURL()}/${selected.toLowerCase()}/auth/login`, data, {
          headers: headers,
        })
        .then((response) => {
          navigate(`/${selected.toLowerCase()}`, {
            state: { type: selected, loginid: response.data.loginid },
          });
        })
        .catch((error) => {
          toast.dismiss();
          console.error(error);
          toast.error(error.response.data.message);
        });
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="bg-gray-100 h-screen w-full flex justify-center items-center">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <div className="mb-6">
          <p className="text-2xl font-semibold text-center border-b-2 border-green-500 pb-2">
            {selected && selected} Login
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="eno" className="block text-sm font-medium text-gray-700">
              {selected && selected} Login ID
            </label>
            <input
              type="number"
              id="eno"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("loginid")}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
              {...register("password")}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 flex justify-center items-center"
          >
            Login
            <span className="ml-2">
              <FiLogIn />
            </span>
          </button>
        </form>
        <div className="mt-6 flex justify-center items-center space-x-4">
          <button
            className={`text-blue-500 text-sm font-semibold hover:text-blue-700 transition ${
              selected === "Student" && "border-b-2 border-green-500"
            }`}
            onClick={() => setSelected("Student")}
          >
            Student
          </button>
          <button
            className={`text-blue-500 text-sm font-semibold hover:text-blue-700 transition ${
              selected === "Faculty" && "border-b-2 border-green-500"
            }`}
            onClick={() => setSelected("Faculty")}
          >
            Faculty
          </button>
          <button
            className={`text-blue-500 text-sm font-semibold hover:text-blue-700 transition ${
              selected === "Admin" && "border-b-2 border-green-500"
            }`}
            onClick={() => setSelected("Admin")}
          >
            Admin
          </button>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Login;
