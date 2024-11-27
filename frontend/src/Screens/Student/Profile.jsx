import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { setUserData } from "../../redux/actions";
import { baseApiURL } from "../../baseUrl";
import toast from "react-hot-toast";

const Profile = () => {
  const [showPass, setShowPass] = useState(false);
  const router = useLocation();
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const [password, setPassword] = useState({
    new: "",
    current: "",
  });

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/${router.state.type}/details/getDetails`,
        { enrollmentNo: router.state.loginid },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          setData(response.data.user[0]);
          dispatch(
            setUserData({
              fullname: `${response.data.user[0].firstName} ${response.data.user[0].middleName} ${response.data.user[0].lastName}`,
              semester: response.data.user[0].semester,
              enrollmentNo: response.data.user[0].enrollmentNo,
              branch: response.data.user[0].branch,
            })
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, router.state.loginid, router.state.type]);

  const checkPasswordHandler = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        `${baseApiURL()}/student/auth/login`,
        { loginid: router.state.loginid, password: password.current },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          changePasswordHandler(response.data.id);
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error(error);
      });
  };

  const changePasswordHandler = (id) => {
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .put(
        `${baseApiURL()}/student/auth/update/${id}`,
        { loginid: router.state.loginid, password: password.new },
        { headers }
      )
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          setPassword({ new: "", current: "" });
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
        console.error(error);
      });
  };

  return (
    <div className="w-full flex justify-center items-center py-8">
      {data && (
        <div className="bg-white shadow-lg rounded-lg w-full max-w-4xl p-8 flex flex-col md:flex-row items-center">
          {/* Profile Info */}
          <div className="flex flex-col justify-center items-start flex-1">
            <p className="text-3xl font-bold text-gray-800">
              Hello, {data.firstName} {data.middleName} {data.lastName} 👋
            </p>
            <div className="mt-6 text-gray-700 space-y-2">
              <p className="text-lg">
                <span className="font-semibold">Enrollment No:</span>{" "}
                {data.enrollmentNo}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Branch:</span> {data.branch}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Semester:</span> {data.semester}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Phone:</span> +91{" "}
                {data.phoneNumber}
              </p>
              <p className="text-lg">
                <span className="font-semibold">Email:</span> {data.email}
              </p>
            </div>
            {/* Change Password Button */}
            <button
              className={`mt-6 px-4 py-2 rounded-md font-semibold ${
                showPass
                  ? "bg-red-100 text-red-600 border border-red-500"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              } transition duration-300`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "Close Change Password" : "Change Password"}
            </button>
            {/* Password Change Form */}
            {showPass && (
              <form
                className="mt-6 w-full space-y-4"
                onSubmit={checkPasswordHandler}
              >
                <input
                  type="password"
                  value={password.current}
                  onChange={(e) =>
                    setPassword({ ...password, current: e.target.value })
                  }
                  placeholder="Current Password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <input
                  type="password"
                  value={password.new}
                  onChange={(e) =>
                    setPassword({ ...password, new: e.target.value })
                  }
                  placeholder="New Password"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>

          {/* Profile Picture */}
          <div className="flex-shrink-0 mt-8 md:mt-0 md:ml-8">
            <img
              src={`${process.env.REACT_APP_MEDIA_LINK}/${data.profile}`}
              alt="Profile"
              className="h-40 w-40 rounded-full object-cover shadow-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
