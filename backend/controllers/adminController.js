const Home = require('../models/Home');
const Hotel = require('../models/Hotel');
const Car = require('../models/car');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

// Admin Login
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check if user exists
    const user = await User.findOne({ email }).select('+password');
    if (!user || user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid admin credentials'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get all hotels
exports.getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find().populate('owner', 'firstName lastName email');
    res.status(StatusCodes.OK).json({ hotels });
  } catch (error) {
    console.error('Get hotels error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hotels'
    });
  }
};

// Get all houses
exports.getAllHouses = async (req, res) => {
  try {
    const houses = await Home.find().populate('owner', 'firstName lastName email');
    res.status(StatusCodes.OK).json({ houses });
  } catch (error) {
    console.error('Get houses error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching houses'
    });
  }
};

// Get all cars
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find().populate('owner', 'firstName lastName email');
    res.status(StatusCodes.OK).json({ cars });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching cars'
    });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.status(StatusCodes.OK).json({ users });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching users'
    });
  }
};

// Houses Management
exports.createHouse = async (req, res) => {
  const house = await Home.create(req.body);
  res.status(StatusCodes.CREATED).json({ house });
};

exports.updateHouse = async (req, res) => {
  const { id: houseId } = req.params;
  const house = await Home.findByIdAndUpdate(houseId, req.body, {
    new: true,
    runValidators: true
  });
  if (!house) {
    throw new BadRequestError(`No house with id ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ house });
};

exports.deleteHouse = async (req, res) => {
  const { id: houseId } = req.params;
  const house = await Home.findByIdAndDelete(houseId);
  if (!house) {
    throw new BadRequestError(`No house with id ${houseId}`);
  }
  res.status(StatusCodes.OK).json({ message: 'House deleted successfully' });
};

// Hotels Management
exports.createHotel = async (req, res) => {
  const hotel = await Hotel.create(req.body);
  res.status(StatusCodes.CREATED).json({ hotel });
};

exports.updateHotel = async (req, res) => {
  const { id: hotelId } = req.params;
  const hotel = await Hotel.findByIdAndUpdate(hotelId, req.body, {
    new: true,
    runValidators: true
  });
  if (!hotel) {
    throw new BadRequestError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ hotel });
};

exports.deleteHotel = async (req, res) => {
  const { id: hotelId } = req.params;
  const hotel = await Hotel.findByIdAndDelete(hotelId);
  if (!hotel) {
    throw new BadRequestError(`No hotel with id ${hotelId}`);
  }
  res.status(StatusCodes.OK).json({ message: 'Hotel deleted successfully' });
};

// Cars Management
exports.createCar = async (req, res) => {
  const car = await Car.create(req.body);
  res.status(StatusCodes.CREATED).json({ car });
};

exports.updateCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.findByIdAndUpdate(carId, req.body, {
    new: true,
    runValidators: true
  });
  if (!car) {
    throw new BadRequestError(`No car with id ${carId}`);
  }
  res.status(StatusCodes.OK).json({ car });
};

exports.deleteCar = async (req, res) => {
  const { id: carId } = req.params;
  const car = await Car.findByIdAndDelete(carId);
  if (!car) {
    throw new BadRequestError(`No car with id ${carId}`);
  }
  res.status(StatusCodes.OK).json({ message: 'Car deleted successfully' });
};

// Users Management
exports.deleteUser = async (req, res) => {
  const { id: userId } = req.params;
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new BadRequestError(`No user with id ${userId}`);
  }
  res.status(StatusCodes.OK).json({ message: 'User deleted successfully' });
};
