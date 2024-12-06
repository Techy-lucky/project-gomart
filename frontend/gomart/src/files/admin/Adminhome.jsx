import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast } from 'react-toastify';

function Adminhome() {
    const navigate = useNavigate();
    const [adminData, setAdminData] = useState(null);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const response = await axios.get('/admin/profile');
                setAdminData(response.data);
            } catch (error) {
                console.error('Failed to fetch admin data:', error);
                if (error.response?.status === 401) {
                    toast.error('Please login to access this page');
                    navigate('/adminlogin');
                }
            }
        };

        fetchAdminData();
    }, [navigate]);

    if (!adminData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="pl-[276px] pt-0.5 min-h-screen ">
            <div className="p-8 m-4 backdrop-blur-lg bg-white/20 rounded-3xl shadow-xl ">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome, {adminData.fname}!</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Analytics Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Analytics</h2>
                        <p className="text-gray-600">View your store analytics and metrics</p>
                    </div>

                    {/* Orders Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Orders</h2>
                        <p className="text-gray-600">Manage customer orders and shipments</p>
                    </div>

                    {/* Products Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Products</h2>
                        <p className="text-gray-600">Add and manage your product inventory</p>
                    </div>

                    {/* Customers Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Customers</h2>
                        <p className="text-gray-600">View and manage customer information</p>
                    </div>

                    {/* Settings Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Settings</h2>
                        <p className="text-gray-600">Configure your store settings</p>
                    </div>

                    {/* Support Card */}
                    <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-md shadow-lg border border-white/50">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">Support</h2>
                        <p className="text-gray-600">Get help and support for your store</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Adminhome;