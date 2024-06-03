import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

function AddBook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const bookData = {
      name: data.name,
      price: data.price,
      category: data.category,
      title: data.title,
      image: "bookbanner.jpg", // default image
    };

    try {
      const res = await axios.post(
        "http://localhost:4001/book/add-book",
        bookData
      );
      console.log(res.data);
      if (res.data) {
        toast.success("Book added successfully");

        setTimeout(() => {
          localStorage.setItem("Books", JSON.stringify(res.data.book));
          navigate("/");
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

              <h3 className="font-bold text-3xl">ADD LATEST BOOK</h3>

              <div className="mt-4 space-y-2">
                <label>Name:</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Book name"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <label>Price:</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter price of book"
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("price", { required: true })}
                />
                {errors.price && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

              <div className="mt-4 space-y-2">
                <label>Category:</label>
                <br />
                <select
                  className="w-80 px-3 py-1 border rounded-md outline-none"
                  {...register("category", { required: true })}
                >
                  <option value="free">Free Book</option>
                  <option value="entertainment">Entertainment Book</option>
                  <option value="sports">Sports Book</option>
                  <option value="song">Song Book</option>
                  <option value="food">Food Book</option>
                </select>
                {errors.category && (
                  <span className="text-red-500">This field is required</span>
                )}
              </div>

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

              <div className="mt-4 space-y-2">
                <input
                  type="hidden"
                  value="bookbanner.jpg"
                  {...register("image")}
                />
              </div>

              <div className="flex justify-around mt-6">
                <button
                  type="submit"
                  className="bg-pink-500 text-white rounded-md px-5 py-2 hover:bg-pink-700 duration-200"
                >
                  Submit
                </button>

                <p className="text-xl">
                  Remove Book{" "}
                  <Link
                    to="/remove-book"
                    className="underline text-blue-500 cursor-pointer"
                  >
                    Removebook
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

export default AddBook;
