const User = require("../models/User");


// const createUser = async (req, res, next) => {
//     const newUser = new User(req.body);
//     try {
//       const savedUser = await newUser.save();
//       res.status(200).json(savedHotel);
//     } catch (err) {
//       next(err);
//     }
//   };
  
  const updateUser = async (req, res, next) => {
    // const newHotel = new User(req.body);
    try {
      const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body},{new:true})
      res.status(200).json(updateUser);
    } catch (err) {
      next(err);
    }
  };
  
  const deleteUser = async (req, res, next) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("user has been deleted");
    } catch (err) {
      next(err);
    }
  };
  
  const getUser = async (req, res, next) => {
    try {
      const user = await Hotel.findById(req.params.id);
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  };
  
  const getUsers = async (req, res, next) => {
    try {
      const users = await User.find(req.params.id);
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };
  
  module.exports = {
    // createUser,
    updateUser,
    deleteUser,
    getUser,
    getUsers,
  };
  