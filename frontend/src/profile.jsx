import React, { useEffect, useState, useRef } from "react"
import Navbar from "./navbar"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { FaHome, FaCar, FaTrash, FaEye, FaEyeSlash } from 'react-icons/fa';

const sidebarItems = [
  {
    icon: (
      <span role="img" aria-label="info" className="text-2xl">📝</span>
    ),
    label: "Personal info & security",
    id: "personal"
  },
  {
    icon: (
      <span role="img" aria-label="property" className="text-2xl">🏠</span>
    ),
    label: "My Properties",
    id: "properties"
  },
]

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ 
    email: '', 
    firstName: '', 
    lastName: '' 
  })
  const [activeSection, setActiveSection] = useState('personal')
  const [editingField, setEditingField] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [properties, setProperties] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPasswordIcon, setShowPasswordIcon] = useState(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser)
        setUser(parsedUser)
        fetchUserProperties();
      } catch (e) {
        setUser({ email: '', firstName: '', lastName: '' })
      }
    }
  }, [])

  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/v1/users/properties', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProperties(response.data.properties || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleDeleteProperty = async (propertyId, propertyType) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/v1/${propertyType}s/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUserProperties(); // Refresh the list
      setSuccess('Property deleted successfully');
    } catch (error) {
      setError('Failed to delete property');
    }
  };

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId)
    setError('')
    setSuccess('')
  }

  const handleEditClick = (field) => {
    setEditingField(field)
    if (inputRef.current) {
      inputRef.current.value = user[field] || '';
    }
    setError('')
    setSuccess('')
  }

  const handleCancelEdit = () => {
    setEditingField(null)
    if (inputRef.current) {
      inputRef.current.value = '';
    }
    setError('')
    setSuccess('')
  }

  const handleSaveEdit = async () => {
    try {
      setError('')
      setSuccess('')

      const newValue = inputRef.current ? inputRef.current.value.trim() : '';

      if (!newValue) {
        setError('This field cannot be empty')
        return
      }

      if (editingField === 'email' && !newValue.includes('@')) {
        setError('Please enter a valid email address')
        return
      }

      const token = localStorage.getItem('token')
      if (!token) {
        setError('Authentication required')
        return
      }

      const response = await axios.put(
        'http://localhost:5000/api/users/profile',
        {
          [editingField]: newValue
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUser(prev => ({
        ...prev,
        [editingField]: newValue
      }))

      const updatedUser = { ...user, [editingField]: newValue }
      localStorage.setItem('user', JSON.stringify(updatedUser))

      setSuccess('Profile updated successfully')
      setEditingField(null)

      window.dispatchEvent(new Event('localStorageUpdate'));

    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile')
    }
  }

  const handlePasswordEdit = () => {
    navigate('/edit-password');
  }

  const renderEditableField = (field, label) => {
    return (
      <div className="mb-6 flex justify-between items-center border-b pb-4">
        <div className="flex-1">
          <div className="text-lg font-semibold">{label}</div>
          {editingField === field ? (
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                type={field === 'email' ? 'email' : 'text'}
                defaultValue={user[field] || ''}
                className="p-2 border rounded-md flex-1"
              />
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="text-gray-700">
                {user[field] || 'Not set'}
              </div>
              {(field === 'firstName' || field === 'lastName') && (
                <button
                  onClick={() => handleEditClick(field)}
                  className="text-blue-600 hover:text-blue-800 font-medium ml-4"
                >
                  Edit
                </button>
              )}
               {field === 'email' && (
                <span className="text-gray-500 text-sm ml-4">Email cannot be changed here</span>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  const filteredProperties = activeFilter === 'all' 
    ? properties 
    : properties.filter(prop => prop.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#F5F5F5] p-0">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="bg-[#E9E9E9] rounded-2xl p-8 flex flex-col gap-4 min-w-[300px]">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-4 w-full p-4 rounded-xl transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-[#E61E51] text-white shadow-md' 
                    : 'hover:bg-gray-200'
                }`}
              >
                {item.icon}
                <span className="text-xl font-bold">{item.label}</span>
              </button>
            ))}
          </div>
          {/* Main Content */}
          <div className="flex-1 bg-[#E9E9E9] rounded-2xl p-8 relative">
            <div className="absolute -top-8 left-0 bg-[#E9E9E9] rounded-t-2xl px-8 py-2 font-bold text-lg">Profile</div>
            {/* Personal Info & Security Section */}
            {activeSection === 'personal' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Personal info</h2>
                {renderEditableField('firstName', 'First Name')}
                {renderEditableField('lastName', 'Last Name')}
                {renderEditableField('email', 'Email address')}
              </div>
            )}
            {/* My Properties Section */}
            {activeSection === 'properties' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">My Properties</h2>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setActiveFilter('all')}
                      className={`px-4 py-2 rounded-full ${
                        activeFilter === 'all'
                          ? 'bg-rose-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setActiveFilter('home')}
                      className={`px-4 py-2 rounded-full ${
                        activeFilter === 'home'
                          ? 'bg-rose-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Homes
                    </button>
                    <button
                      onClick={() => setActiveFilter('car')}
                      className={`px-4 py-2 rounded-full ${
                        activeFilter === 'car'
                          ? 'bg-rose-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Cars
                    </button>
                  </div>
                </div>
                
                {filteredProperties.length > 0 ? (
                  <div className="space-y-4">
                    {filteredProperties.map((property) => (
                      <div key={property._id} className="flex items-center justify-between bg-white p-4 rounded-md shadow-sm">
                        <div className="flex items-center gap-4">
                          {property.type === 'home' ? (
                            <FaHome className="text-blue-600 text-xl" />
                          ) : (
                            <FaCar className="text-green-600 text-xl" />
                          )}
                          <div>
                            <div className="font-semibold">{property.title}</div>
                            <div className="text-sm text-gray-600">Type: {property.type}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteProperty(property._id, property.type)}
                          className="text-red-600 hover:text-red-800"
                          aria-label="Delete property"
                        >
                          <FaTrash className="text-lg" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center">No properties found</p>
                )}
              </div>
            )}
            {/* Payment Section */}
            {activeSection === 'payment' && (
              <div className="bg-[#E9E9E9] rounded-xl p-6 mt-8">
                <h2 className="text-2xl font-bold mb-6">Payment Methods</h2>
                <p className="text-gray-700">Coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile 