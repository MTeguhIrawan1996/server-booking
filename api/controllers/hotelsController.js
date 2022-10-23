import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
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
  const { min, max, ...others } = req.query;
  const maxValue = await Hotel.findOne().sort({ cheapestPrice: -1 });
  try {
    const hotel = await Hotel.find({
      ...others,
      cheapestPrice: { $gte: min || 1, $lte: max || maxValue.cheapestPrice },
    }).limit(req.query.limit);
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
      { type: "Hotel", count: hotelCount },
      { type: "Apartment", count: apartmentCount },
      { type: "Resort", count: resortCount },
      { type: "Villa", count: villaCount },
      { type: "Cabin", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};
const countByCity = async (req, res, next) => {
  // const cities = req.query.cities.split(",");
  try {
    const countHotel = await Hotel.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
        },
      },
    ]).limit(5);
    // const list = await Promise.all(
    //   cities.map((city) => {
    //     return Hotel.countDocuments({ city: city.toUpperCase() });
    //   })
    // );
    res.status(200).json(countHotel);
  } catch (err) {
    next(err);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
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
  getHotelRooms,
};
