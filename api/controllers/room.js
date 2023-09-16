const Room = require("../models/Room");
const Hotel = require('../models/Hotel');
const createError = require("../utils/error");

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body); // Use Room model

    try {
        const savedRoom = await newRoom.save();
        await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
        res.status(201).json(savedRoom); // 201 Created for successful creation
    } catch (err) {
        next(err); // Propagate the error to the error-handling middleware
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

const updateRoomAvailability = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    unavilableDates: req.body.dates
                }
            },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err);
    }
};

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } });
        res.status(204).send("room have been deleted"); // 204 No Content for successful deletion
    } catch (err) {
        next(err);
    }
};

const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        if (!room) {
            return next(createError(404, "Room not found")); // 404 Not Found for missing resource
        }
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};

const getRooms = async (req, res, next) => {
    try {
        const rooms = await Room.find();
        res.status(200).json(rooms);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createRoom,
    updateRoom,
    updateRoomAvailability,
    deleteRoom,
    getRoom,
    getRooms
};
