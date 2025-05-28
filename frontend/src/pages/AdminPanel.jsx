import React, { useState } from 'react';

const AdminPanel = () => {
  // Simple icon components to replace lucide-react
  const TrashIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="3,6 5,6 21,6"></polyline>
      <path d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
      <line x1="10" y1="11" x2="10" y2="17"></line>
      <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
  );

  const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.35-4.35"></path>
    </svg>
  );

  const XIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );

  const UsersIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
  );

  const BuildingIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
      <path d="M6 12h12"></path>
      <path d="M6 8h2"></path>
      <path d="M6 16h2"></path>
      <path d="M10 8h2"></path>
      <path d="M10 16h2"></path>
      <path d="M14 8h2"></path>
      <path d="M14 16h2"></path>
    </svg>
  );

  const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
      <polyline points="9,22 9,12 15,12 15,22"></polyline>
    </svg>
  );

  const CarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18.4 9c-.3-.6-.9-1-1.5-1h-5.8c-.6 0-1.2.4-1.5 1L7.5 11.1C6.7 11.3 6 12.1 6 13v3c0 .6.4 1 1 1h2"></path>
      <circle cx="7" cy="17" r="2"></circle>
      <circle cx="17" cy="17" r="2"></circle>
    </svg>
  );
  // Sample data - in real app this would come from API
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'User', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Premium', joinDate: '2024-02-20' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'User', joinDate: '2024-03-10' }
  ]);

  const [hotels, setHotels] = useState([
    { id: 1, name: 'Grand Plaza Hotel', location: 'New York', rooms: 150, rating: 4.5 },
    { id: 2, name: 'Seaside Resort', location: 'Miami', rooms: 80, rating: 4.2 },
    { id: 3, name: 'Mountain View Inn', location: 'Colorado', rooms: 45, rating: 4.7 }
  ]);

  const [homes, setHomes] = useState([
    { id: 1, title: 'Modern Downtown Apartment', location: 'Chicago', price: 2500, bedrooms: 2 },
    { id: 2, title: 'Cozy Suburban House', location: 'Austin', price: 3200, bedrooms: 3 },
    { id: 3, title: 'Luxury Penthouse', location: 'LA', price: 8000, bedrooms: 4 }
  ]);

  const [cars, setCars] = useState([
    { id: 1, make: 'Toyota', model: 'Camry', year: 2023, price: 28000 },
    { id: 2, make: 'BMW', model: 'X5', year: 2024, price: 65000 },
    { id: 3, make: 'Tesla', model: 'Model 3', year: 2023, price: 42000 }
  ]);

  const [activeTab, setActiveTab] = useState('users');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newItem, setNewItem] = useState({});

  // Form templates for different entities
  const getFormTemplate = (type) => {
    switch(type) {
      case 'hotel':
        return { name: '', location: '', rooms: '', rating: '' };
      case 'home':
        return { title: '', location: '', price: '', bedrooms: '' };
      case 'car':
        return { make: '', model: '', year: '', price: '' };
      default:
        return {};
    }
  };

  const handleDelete = (type, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      switch(type) {
        case 'users':
          setUsers(users.filter(user => user.id !== id));
          break;
        case 'hotels':
          setHotels(hotels.filter(hotel => hotel.id !== id));
          break;
        case 'homes':
          setHomes(homes.filter(home => home.id !== id));
          break;
        case 'cars':
          setCars(cars.filter(car => car.id !== id));
          break;
      }
    }
  };

  const handleCreate = () => {
    const id = Date.now(); // Simple ID generation
    const itemWithId = { ...newItem, id };
    
    if (activeTab === 'hotels') {
      setHotels([...hotels, { ...itemWithId, rooms: parseInt(itemWithId.rooms), rating: parseFloat(itemWithId.rating) }]);
    }
    
    setShowModal(false);
    setNewItem({});
  };

  const openCreateModal = (type) => {
    setModalType('create');
    setNewItem(getFormTemplate(type));
    setShowModal(true);
  };

  const filterData = (data, searchFields) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      searchFields.some(field => 
        item[field]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const TabButton = ({ tab, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(tab)}
      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
        isActive 
          ? 'bg-rose-500 text-white shadow-lg' 
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }`}
    >
      <Icon />
      {label}
    </button>
  );

  const Modal = ({ show, onClose, title, children }) => {
    if (!show) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <XIcon />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  const renderFormFields = (type) => {
    const fields = getFormTemplate(type);
    return Object.keys(fields).map(field => (
      <div key={field} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
          {field.replace(/([A-Z])/g, ' $1').trim()}
        </label>
        <input
          type={field.includes('price') || field.includes('rooms') || field.includes('year') || field.includes('bedrooms') ? 'number' : 'text'}
          step={field === 'rating' ? '0.1' : '1'}
          value={newItem[field] || ''}
          onChange={(e) => setNewItem({...newItem, [field]: e.target.value})}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          placeholder={`Enter ${field}`}
        />
      </div>
    ));
  };

  const renderTable = () => {
    switch(activeTab) {
      case 'users':
        const filteredUsers = filterData(users, ['name', 'email', 'role']);
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Join Date</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          user.role === 'Premium' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete('users', user.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'hotels':
        const filteredHotels = filterData(hotels, ['name', 'location']);
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rooms</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Rating</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHotels.map(hotel => (
                    <tr key={hotel.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{hotel.name}</td>
                      <td className="px-6 py-4 text-gray-600">{hotel.location}</td>
                      <td className="px-6 py-4 text-gray-600">{hotel.rooms}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          <span className="text-gray-600">{hotel.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete('hotels', hotel.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'homes':
        const filteredHomes = filterData(homes, ['title', 'location']);
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Bedrooms</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHomes.map(home => (
                    <tr key={home.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{home.title}</td>
                      <td className="px-6 py-4 text-gray-600">{home.location}</td>
                      <td className="px-6 py-4 text-gray-600">${home.price.toLocaleString()}/month</td>
                      <td className="px-6 py-4 text-gray-600">{home.bedrooms}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete('homes', home.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'cars':
        const filteredCars = filterData(cars, ['make', 'model']);
        return (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Make</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Model</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredCars.map(car => (
                    <tr key={car.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-900 font-medium">{car.make}</td>
                      <td className="px-6 py-4 text-gray-600">{car.model}</td>
                      <td className="px-6 py-4 text-gray-600">{car.year}</td>
                      <td className="px-6 py-4 text-gray-600">${car.price.toLocaleString()}</td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleDelete('cars', car.id)}
                          className="text-red-600 hover:text-red-800 transition-colors"
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, hotels, homes, and cars from one centralized panel</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          <TabButton 
            tab="users" 
            icon={UsersIcon} 
            label="Users" 
            isActive={activeTab === 'users'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="hotels" 
            icon={BuildingIcon} 
            label="Hotels" 
            isActive={activeTab === 'hotels'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="homes" 
            icon={HomeIcon} 
            label="Homes" 
            isActive={activeTab === 'homes'} 
            onClick={setActiveTab} 
          />
          <TabButton 
            tab="cars" 
            icon={CarIcon} 
            label="Cars" 
            isActive={activeTab === 'cars'} 
            onClick={setActiveTab} 
          />
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute left-3 top-3 text-gray-400">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
            />
          </div>
          
          {activeTab === 'hotels' && (
            <button
              onClick={() => openCreateModal(activeTab.slice(0, -1))}
              className="flex items-center gap-2 px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              <PlusIcon />
              Add Hotel
            </button>
          )}
        </div>

        {/* Table */}
        {renderTable()}

        {/* Create Modal */}
        <Modal 
          show={showModal} 
          onClose={() => setShowModal(false)}
          title="Create New Hotel"
        >
          {renderFormFields('hotel')}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCreate}
              className="flex-1 bg-rose-500 text-white py-2 px-4 rounded-lg hover:bg-rose-600 transition-colors font-medium"
            >
              Create
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition-colors font-medium"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default AdminPanel;