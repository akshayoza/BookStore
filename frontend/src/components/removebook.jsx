import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import AdminCards from "./Admincards";

function RemoveBook() {
  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get("http://localhost:4001/book");
        console.log(res.data);
        setBook(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const bookData = {
      title: data.title,
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/book/remove-book",
        bookData
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Book removed successfully");

        setTimeout(() => {
          localStorage.setItem("Books", JSON.stringify(res.data.book));
          navigate("/remove-book");
          window.location.reload();
        }, 2000);
      }
    } catch (err) {
      if (err.response) {
        console.log(err);
        toast.error("Error: " + err.response.data.message);
        setTimeout(() => {}, 3000);
      }
    }
  };

  return (
    <>
      <div className="flex mt-6 text-5xl items-center justify-center">
        <h3 className="font-bold">Available BOOK</h3>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-4">
        {book.map((item) => (
          <AdminCards
            key={item._id}
            item={item}
            onRemove={() => handleRemove(item.title)}
          />
        ))}
      </div>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[450px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Link
                to="/Admin/work"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>
              <h3 className="font-bold text-3xl">Remove BOOK</h3>
              <div className="mt-4 space-y-2">
                <label>Title:</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Book Title"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("title", { required: true })}
                />
                {errors.title && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>
              <div className="flex justify-around mt-6">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-5 py-2 hover:bg-pink-700 duration-200"
                >
                  RemoveBook
                </button>
                <p className="text-md">
                  Add Book{" "}
                  <Link
                    to="/add-book"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Addbook
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default RemoveBook;
