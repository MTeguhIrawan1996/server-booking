import Hotel from "../models/Hotel.js";
import { createError } from "../utils/error.js";

const createdHotels = async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const saveHotel = await newHotel.save();
    res.status(200).json(saveHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
const editHotels = async (req, res) => {
  try {
    const updateHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateHotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteHotels = async (req, res) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel Has Been Delete");
  } catch (err) {
    res.status(500).json(err);
  }
};
const getHotelsById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    res.status(500).json(err);
  }
};
const getHotels = async (req, res, next) => {
  try {
    const hotel = await Hotel.find();
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};

export { createdHotels, editHotels, deleteHotels, getHotelsById, getHotels };
