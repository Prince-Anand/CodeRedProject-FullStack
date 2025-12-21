import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Check, X, CreditCard } from 'lucide-react';

const JobApplicants = () => {
    const { id } = useParams(); // Job ID
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchApplicants();
        // Load razorpay script
        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);
    }, [id]);

    const fetchApplicants = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/applications/job/${id}`, {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();
            if (res.ok) {
                setApplicants(data);
            } else {
                setError(data.msg || 'Failed to load applicants');
            }
        } catch (err) {
            console.error(err);
            setError('Error loading applicants');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (appId, status) => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:5000/api/applications/${appId}/status`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ status })
            });
            if (res.ok) {
                fetchApplicants();
            }
        } catch (err) {
            console.error(err);
            alert('Error updating status');
        }
    };

    const handleHire = async (app) => {
        const token = localStorage.getItem('token');
        try {
            // Create Order
            const amount = 500; // Fixed amount for test
            const orderRes = await fetch('http://localhost:5000/api/payment/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify({ amount, applicationId: app._id })
            });
            const order = await orderRes.json();

            const options = {
                key: 'rzp_test_RuIxzwGZv4Rh9h', // Razorpay Key ID
                amount: order.amount,
                currency: "INR",
                name: "Agnt.",
                image: "/border-favicon.png",
                description: `Hiring ${app.agent.name}`,
                order_id: order.id,
                handler: async function (response) {
                    // Verify Payment
                    const verifyRes = await fetch('http://localhost:5000/api/payment/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'x-auth-token': token
                        },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            applicationId: app._id
                        })
                    });
                    const verifyData = await verifyRes.json();
                    if (verifyData.status === 'success') {
                        alert('Payment Successful! Agent Hired.');
                        fetchApplicants();
                    } else {
                        alert('Payment Verification Failed');
                    }
                },
                prefill: {
                    name: "Employer Name",
                    email: "employer@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        } catch (err) {
            console.error(err);
            alert('Payment initialization failed');
        }
    };

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-primary)] font-serif">Job Applicants</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}

                {loading ? <p>Loading...</p> : (
                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul className="divide-y divide-gray-200">
                            {applicants.length === 0 && <li className="p-4 text-gray-500">No applicants yet.</li>}
                            {applicants.map((app) => (
                                <li key={app._id} className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                                                    <User className="h-6 w-6 text-gray-500" />
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-[var(--color-primary)]">{app.agent.name}</div>
                                                <div className="text-sm text-gray-500">{app.agent.email}</div>
                                                <div className="text-xs text-gray-400 mt-1">Status: {app.status}</div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            {app.status === 'pending' && (
                                                <button
                                                    onClick={() => handleStatusUpdate(app._id, 'reviewing')}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold hover:bg-blue-200"
                                                >
                                                    Review
                                                </button>
                                            )}
                                            {app.status === 'reviewing' && (
                                                <>
                                                    <button
                                                        onClick={() => handleStatusUpdate(app._id, 'rejected')}
                                                        className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                                        title="Reject"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleHire(app)}
                                                        className="px-3 py-1 bg-green-600 text-white rounded text-xs font-semibold hover:bg-green-700 flex items-center"
                                                    >
                                                        <CreditCard className="h-3 w-3 mr-1" />
                                                        Hire ($500)
                                                    </button>
                                                </>
                                            )}
                                            {app.status === 'hired' && (
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold flex items-center">
                                                    <Check className="h-3 w-3 mr-1" /> Hired
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-2 flex justify-end">
                                        <Link to={`/agent/${app.agent._id}`} className="text-sm text-[var(--color-primary)] hover:underline flex items-center">
                                            View Profile
                                        </Link>
                                    </div>
                                    {app.coverLetter && (
                                        <div className="mt-2 ml-16 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                                            <p className="font-semibold text-xs text-gray-400">Cover Letter:</p>
                                            {app.coverLetter}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobApplicants;
