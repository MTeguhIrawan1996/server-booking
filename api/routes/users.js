import express from "express";
import {
  deleteUser,
  editUser,
  getUser,
  getUserById,
} from "../controllers/userController.js";
import { upload } from "../middlewares/multer.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// CRUD
const router = express.Router();

// router.get("/checkauth", verifyToken, (req, res, next) => {
//   res.send("Hallo User, your Login");
// });
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hallo User, your Login and you can delete your accont");
// });
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hallo Admin, your Login and you can delete all accont");
// });
router.put("/:id", upload, verifyToken, verifyUser, editUser);
router.delete("/:id", upload, verifyToken, verifyUser, deleteUser);
router.get("/:id", upload, verifyToken, verifyUser, getUserById);
router.get("/", upload, verifyToken, verifyAdmin, getUser);

export default router;
