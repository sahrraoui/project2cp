const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/isAdmin');
const {
  adminLogin,
  getAllHouses,
  createHouse,
  updateHouse,
  deleteHouse,
  getAllHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getAllCars,
  createCar,
  updateCar,
  deleteCar,
  getAllUsers,
  deleteUser
} = require('../controllers/adminController');

// Admin Authentication
router.post('/login', adminLogin);

// Houses Management
router.route('/houses')
  .get(protect, isAdmin, getAllHouses)
  .post(protect, isAdmin, createHouse);

router.route('/houses/:id')
  .put(protect, isAdmin, updateHouse)
  .delete(protect, isAdmin, deleteHouse);

// Hotels Management
router.route('/hotels')
  .get(protect, isAdmin, getAllHotels)
  .post(protect, isAdmin, createHotel);

router.route('/hotels/:id')
  .put(protect, isAdmin, updateHotel)
  .delete(protect, isAdmin, deleteHotel);

// Cars Management
router.route('/cars')
  .get(protect, isAdmin, getAllCars)
  .post(protect, isAdmin, createCar);

router.route('/cars/:id')
  .put(protect, isAdmin, updateCar)
  .delete(protect, isAdmin, deleteCar);

// Users Management
router.route('/users')
  .get(protect, isAdmin, getAllUsers);

router.route('/users/:id')
  .delete(protect, isAdmin, deleteUser);

module.exports = router;
