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
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "HOTEL" });
    const apartmentCount = await Hotel.countDocuments({ type: "APARTMENT" });
    const resortCount = await Hotel.countDocuments({ type: "RESORT" });
    const villaCount = await Hotel.countDocuments({ type: "VILLA" });
    const cabinCount = await Hotel.countDocuments({ type: "CABIN" });

    res.status(200).json([
      { type: "HOTEL", count: hotelCount },
      { type: "APARTMENT", count: apartmentCount },
      { type: "RESORT", count: resortCount },
      { type: "VILLA", count: villaCount },
      { type: "CABIN", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city.toUpperCase() });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

export {
  createdHotels,
  editHotels,
  deleteHotels,
  getHotelsById,
  getHotels,
  countByCity,
  countByType,
};
