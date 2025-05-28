import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {  const [data, setData] = useState({
    users: [],
    houses: [],
    hotels: [],
    cars: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();
  const fetchDashboardData = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      const [users, houses, hotels, cars] = await Promise.all([
        axios.get('http://localhost:5000/admin/users', config),
        axios.get('http://localhost:5000/admin/houses', config),
        axios.get('http://localhost:5000/admin/hotels', config),
        axios.get('http://localhost:5000/admin/cars', config)
      ]);

      setData({
        users: users.data.users || [],
        houses: houses.data.houses || [],
        hotels: hotels.data.hotels || [],
        cars: cars.data.cars || []
      });
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      }
      console.error('Dashboard error:', error);
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminUser = JSON.parse(localStorage.getItem('adminUser') || '{}');
    
    if (!token || adminUser.role !== 'admin') {
      navigate('/admin/login');
      return;
    }

    fetchDashboardData();
  }, [navigate, fetchDashboardData]);
  const handleDelete = async (type, id) => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };

      // Update delete URL to match backend route structure
      const endpoint = `http://localhost:5000/admin/${type.slice(0, -1) === 'user' ? 'users' : type}/${id}`;
      await axios.delete(endpoint, config);
      toast.success(`${type.slice(0, -1)} deleted successfully`);
      fetchDashboardData();
    } catch (error) {
      console.error('Delete error:', error);
      toast.error(`Failed to delete ${type.slice(0, -1)}`);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    delete axios.defaults.headers.common['Authorization'];
    navigate('/admin/login');
    toast.success('Logged out successfully');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading dashboard...</div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Total Users" count={data.users.length} color="blue" />
      <StatCard title="Total Houses" count={data.houses.length} color="green" />
      <StatCard title="Total Hotels" count={data.hotels.length} color="yellow" />
      <StatCard title="Total Cars" count={data.cars.length} color="purple" />
    </div>
  );

  const renderDataTable = (items, type) => (
    <div className="mt-4 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name/Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {type === 'users' ? 'Email' : 'Owner'}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.map((item) => (
                  <tr key={item._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {type === 'users' 
                          ? `${item.firstName} ${item.lastName}`
                          : item.name || item.title}
                      </div>
                      {type !== 'users' && item.location && (
                        <div className="text-xs text-gray-500">
                          {item.location.wilaya || item.location}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {type === 'users' ? (
                        <div className="text-sm text-gray-500">{item.email}</div>
                      ) : item.owner ? (
                        <>
                          <div className="text-sm text-gray-900">
                            {`${item.owner.firstName} ${item.owner.lastName}`}
                          </div>
                          <div className="text-xs text-gray-500">
                            {item.owner.email}
                          </div>
                        </>
                      ) : (
                        <div className="text-sm text-gray-500">No owner</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDelete(type, item._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tab Navigation */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {['overview', 'users', 'houses', 'hotels', 'cars'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeTab === tab
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'users' && (
            <>
              {renderDataTable(data.users, 'users')}
            </>
          )}
          {activeTab === 'houses' && (
            <>
              <div className="mb-6">
                <Link
                  to="/admin/houses/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Add New House
                </Link>
              </div>
              {renderDataTable(data.houses, 'houses')}
            </>
          )}
          {activeTab === 'hotels' && (
            <>
              <div className="mb-6">
                <Link
                  to="/admin/hotels/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Add New Hotel
                </Link>
              </div>
              {renderDataTable(data.hotels, 'hotels')}
            </>
          )}
          {activeTab === 'cars' && (
            <>
              <div className="mb-6">
                <Link
                  to="/admin/cars/add"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                >
                  Add New Car
                </Link>
              </div>
              {renderDataTable(data.cars, 'cars')}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, count, color }) => {
  const colors = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className={`flex-shrink-0 rounded-md p-3 ${colors[color]}`}>
            <div className="h-6 w-6 text-white" />
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-500 truncate">
                {title}
              </dt>
              <dd className="text-3xl font-semibold text-gray-900">
                {count}
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;