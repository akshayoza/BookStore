import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function Course() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:4001/user/customer");
        console.log(res.data);
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, []);

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:4001/user/customer/${id}`);
      if (response.status === 200) {
        setUsers(users.filter(user => user._id !== id));
        toast.success("User deleted successfully");
      } else {
        toast.error("Failed to delete user");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-10 items-center justify-center text-center">
          <h1 className="text-2xl md:text-4xl mb-20">
            USER <span className="text-pink-500">Details:)</span>
          </h1>
        </div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Database ID</th>
                <th className="px-4 py-2">Full Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Password</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{user._id}</td>
                  <td className="border px-4 py-2">{user.fullname}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.password}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => deleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 duration-300"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-6">
          <Link to="/Admin/work">
            <button className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-700 duration-300">
              BACK
            </button>
          </Link>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Course;
