import React from "react";
import { Link } from "react-router-dom";

function Work() {
  return (
    <>
      <div className="flex mt-6 text-5xl items-center justify-center">
        <h3 className="font-bold">Welcome to your workspace</h3>
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[450px]">
          <div>
            <div className="flex items-center mt-0">
              <Link
                to="/add-book"
                className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition duration-200 text-center w-full"
              >
                ADD BOOK
              </Link>
            </div>
            <div className="flex items-center mt-4">
              <Link
                to="/remove-book"
                className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition duration-200 text-center w-full"
              >
                REMOVE BOOK
              </Link>
            </div>
            <div className="flex items-center mt-4">
              <Link
                to="/see-customers"
                className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition duration-200 text-center w-full"
              >
                SEE ALL CUSTOMERS
              </Link>
            </div>
            <div className="flex items-center mt-4">
              <Link
                to="/"
                className="bg-pink-500 text-white rounded-md px-6 py-2 hover:bg-pink-700 transition duration-200 text-center w-full"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Work;
