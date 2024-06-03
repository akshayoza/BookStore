import express from "express";
import { getBook, addBook, RemoveBook } from "../controller/book.controller.js";

const router = express.Router();

router.get("/", getBook);
router.post("/add-book", addBook);
router.post("/remove-book", RemoveBook);

export default router;
