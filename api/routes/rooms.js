import express from "express";
import {
  createdRoom,
  deleteRoom,
  editRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} from "../controllers/roomController.js";
import { upload } from "../middlewares/multer.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

// CRUD
const router = express.Router();

router.post("/:hotelid", upload, verifyToken, verifyAdmin, createdRoom);
router.put("/:id", verifyToken, verifyAdmin, editRoom);
router.delete("/:id/:hotelid", verifyToken, verifyAdmin, deleteRoom);
router.get("/:id", getRoom);
router.get("/", getRooms);
router.put("/availability/:id", updateRoomAvailability);

export default router;
