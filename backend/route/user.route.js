import express from "express";
import { signup, login, getCustomer ,deleteUser} from "../controller/user.controller.js";
const router = express.Router();

router.get("/customer", getCustomer);
router.post("/signup", signup);
router.post("/login", login);
router.delete('/customer/:id', deleteUser);

export default router;
