import express from "express";
import { login, register } from "../controllers/authController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hallo World auth end point");
});
router.post("/register", upload, register);
router.post("/login", upload, login);

export default router;
