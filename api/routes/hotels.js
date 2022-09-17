import express from "express";
import {
  createdHotels,
  deleteHotels,
  editHotels,
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

export default router;
