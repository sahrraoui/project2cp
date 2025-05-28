import React, { useState, useRef, useEffect } from 'react';
import { FaBell, FaUserCircle, FaBars, FaTimes, FaHome, FaHotel, FaCar, FaArrowLeft } from 'react-icons/fa';
import './NavbarProf.css';

const notifications = [
  'Your booking is confirmed!',
  'New message from host.',
  'Special offer: 10% off your next trip!'
];

const NavbarProf = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const profileRef = useRef();
  const notifRef = useRef();
  const mobileMenuRef = useRef();
  const [profilePhoto, setProfilePhoto] = useState(null);

  // Prevent all scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target) &&
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setShowProfile(false);
        setShowNotifications(false);
        setShowMobileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar-prof">
      <div className="navbar-logo">TraveEase</div>
      <div className="navbar-links hide-on-mobile">
        <a href="#home" className="nav-home"><FaHome className="nav-icon" /> Home</a>
        <a href="#hotels" className="nav-hotels"><FaHotel className="nav-icon" /> Hotels</a>
        <a href="#cars" className="nav-cars"><FaCar className="nav-icon" /> Cars</a>
      </div>
      <div className="navbar-actions hide-on-mobile">
        <div className="navbar-notification" ref={notifRef}>
          <button className="notif-btn" onClick={() => {
            setShowNotifications((v) => !v);
            setShowProfile(false);
            setShowMobileMenu(false);
          }}>
            <FaBell className="notif-icon" />
          </button>
          {showNotifications && (
            <div className="notif-dropdown fade-in">
              <div className="notif-title">Notifications</div>
              <ul>
                {notifications.map((notif, idx) => (
                  <li key={idx}>{notif}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="navbar-profile" ref={profileRef}>
          <button className="profile-btn" onClick={() => {
            setShowProfile((v) => !v);
            setShowNotifications(false);
            setShowMobileMenu(false);
          }}>
            <span className="profile-name">User name</span>
            {profilePhoto ? (
              <img src={profilePhoto} alt="Profile" className="profile-icon" style={{ width: '2rem', height: '2rem', borderRadius: '50%' }} />
            ) : (
              <FaUserCircle className="profile-icon" />
            )}
          </button>
          {showProfile && (
            <div className="profile-dropdown fade-in">
              <ul>
                <li>Profile</li>
                <li>Favorites</li>
                <li className="divider"></li>
                <li>Host an experience</li>
                <li className="divider"></li>
                <li className="logout">Log out</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <button className="navbar-hamburger show-on-mobile" onClick={() => setShowMobileMenu((v) => !v)}>
        {showMobileMenu ? <FaTimes /> : <FaBars />}
      </button>
      {/* Mobile menu overlay */}
      {showMobileMenu && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-list">
            <button className="back-arrow-btn" onClick={() => setShowMobileMenu(false)}>
              <FaArrowLeft className="back-arrow-icon" />
            </button>
            <a href="#home" onClick={() => setShowMobileMenu(false)}><FaHome className="nav-icon" /> Home</a>
            <a href="#hotels" onClick={() => setShowMobileMenu(false)}><FaHotel className="nav-icon" /> Hotels</a>
            <a href="#cars" onClick={() => setShowMobileMenu(false)}><FaCar className="nav-icon" /> Cars</a>
            <button className="notif-btn" onClick={() => setShowNotifications((v) => !v)}>
              <FaBell className="notif-icon" /> Notifications
            </button>
            <button className="profile-btn" onClick={() => {
              setShowProfile(true);
              setShowNotifications(false);
              setShowMobileMenu(false);
            }}>
              <span className="profile-name">Portfolio</span>
              <FaUserCircle className="profile-icon" />
            </button>
            {showNotifications && (
              <div className="notif-dropdown fade-in">
                <div className="notif-title">Notifications</div>
                <ul>
                  {notifications.map((notif, idx) => (
                    <li key={idx}>{notif}</li>
                  ))}
                </ul>
              </div>
            )}
            {showProfile && (
              <div className="profile-dropdown fade-in">
                <ul>
                  <li>Profile</li>
                  <li>Favorites</li>
                  <li className="divider"></li>
                  <li>Host an experience</li>
                  <li className="divider"></li>
                  <li className="logout">Log out</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavbarProf; 