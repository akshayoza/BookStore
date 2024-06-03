import Book from "../model/book.model.js";
import mongoose from "mongoose";
export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const addBook = async (req, res) => {
  try {
    const { name, price, category, title, image } = req.body;

    if (!name || !price || !category || !title || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newbook = await Book.findOne({ title });
    if (newbook) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const createdBook = new Book({
      name: name,
      price: price,
      category: category,
      title: title,
      image: image,
    });
    await createdBook.save();
    res.status(201).json({
      message: "Book Inserted successfully",
      book: {
        _id: createdBook._id,
        name: createdBook.name,
        price: createdBook.price,
        category: createdBook.category,
        title: createdBook.title,
        image: createdBook.image,
      },
    });
  } catch (error) {
    console.log("Error: " + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const RemoveBook = async (req, res) => {
    try {
      const { title } = req.body;
      if (!title) {
        return res
          .status(400)
          .json({ message: "Title of the book to delete is required" });
      }
      const removedBook = await Book.findOneAndDelete({ title });
      if (removedBook) {
        return res.status(200).json({ message: "Book deleted successfully" });
      } else {
        res.status(404).json({
          message: "Book not found",
        });
      }
    } catch (error) {
      console.log("Error: " + error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  