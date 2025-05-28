import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import EmailVer from './email-ver';
import VerCode from './ver-code';
import Signup from './signup';
import ChangePassword from './changepass';
import Card from './card';
import Hotel from './Hotel';
import Car from './Car';
import Rental from './Rental';
import Home from './Home';
import AuthSuccess from './AuthSuccess';
import Profile from './profile';
import HotelDetails from './components/HotelDetails';
import HomeDetails from './components/HomeDetails';
import CarDetails from './components/CarDetails';
import PropertyTypes from './components/PropertyTypes';
import PropertyForm from './components/PropertyForm';
import HostForm from './components/hostform';
import CreateCar from './components/CreateCar';
import Payment from './pages/Payment';
import PaymentSuccess from './pages/PaymentSucess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />
        <Route path="/cars/:id" element={<CarDetails />} />
        <Route path="/homes/:id" element={<HomeDetails />} />
        <Route path="/hotel" element={<Hotel />} />
        <Route path="/car" element={<Car />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/email-ver" element={<EmailVer />} />
        <Route path="/verify-code" element={<VerCode />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/auth/success" element={<AuthSuccess />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/property-types" element={<PropertyTypes />} />
        <Route path="/property-form/:type" element={<PropertyForm />} />
        <Route path="/host-form" element={<HostForm />} />
        <Route path="/create-car" element={<CreateCar />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;