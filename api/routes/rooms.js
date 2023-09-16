const express = require('express');
const { createRoom, updateRoom, deleteRoom, getRoom, getRooms, updateRoomAvailability } = require('../controllers/room');
const { verifyAdmin } = require('../utils/verifyToken');
const router = express.Router();

router.post("/:hotelid",verifyAdmin, createRoom);

// update
router.put('/:id',verifyAdmin, updateRoom);
router.put('/availability/:id', updateRoomAvailability);

// delete
router.delete('/:id/:hotelid',verifyAdmin, deleteRoom);

// Get
router.get('/:id', getRoom);

// Get all
router.get('/', getRooms);



module.exports = router;

