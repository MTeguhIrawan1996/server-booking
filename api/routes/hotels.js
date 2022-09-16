const router = require("express").Router();
const hotelsControllers = require("../controllers/hotelsControllers");
const { upload } = require("../middlewares/multer");

// CRUD

router.post("/", upload, hotelsControllers.createdHotels);
router.put("/:id", upload, hotelsControllers.editHotels);
router.delete("/:id", upload, hotelsControllers.deleteHotels);
router.get("/:id", upload, hotelsControllers.getHotelsById);
router.get("/", upload, hotelsControllers.getHotels);

module.exports = router;
