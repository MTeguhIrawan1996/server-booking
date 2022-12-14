import express from "express";
import {
  countByCity,
  countByType,
  createdHotels,
  deleteHotels,
  editHotels,
  getHotelRooms,
  getHotels,
  getHotelsById,
} from "../controllers/hotelsController.js";
import { upload } from "../middlewares/multer.js";
import { verifyAdmin, verifyToken } from "../utils/verifyToken.js";

// CRUD
const router = express.Router();

router.post("/", upload, verifyToken, verifyAdmin, createdHotels);
router.put("/:id", upload, verifyToken, verifyAdmin, editHotels);
router.delete("/:id", upload, verifyToken, verifyAdmin, deleteHotels);
router.get("/:id", upload, getHotelsById);
router.get("/", upload, getHotels);
router.get("/room/:id", getHotelRooms);
router.get("/find/countByCity", countByCity);
router.get("/find/countByType", countByType);

export default router;
