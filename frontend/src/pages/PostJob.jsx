import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Briefcase, MapPin, DollarSign, Clock, FileText } from 'lucide-react';

const PostJob = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        company: '', // Optional, or pre-filled from usage
        type: 'Full-time',
        budget: '',
        description: '',
        location: '',
        skills: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            const skillsArray = formData.skills.split(',').map(s => s.trim());

            const submitData = {
                ...formData,
                skills: skillsArray,
                company: formData.company || 'Tech Corp' // Fallback
            };

            const res = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(submitData)
            });

            if (!res.ok) throw new Error('Failed to post job');

            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Error posting job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-[var(--color-primary-dark)] sm:text-3xl sm:truncate font-serif">
                            Post a New Job
                        </h2>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {error && <div className="text-red-500 text-sm">{error}</div>}

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    placeholder="e.g. Senior Frontend Engineer"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    placeholder="Your Company Name"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Job Type</label>
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Freelance">Freelance</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Budget / Salary</label>
                                <input
                                    type="text"
                                    name="budget"
                                    required
                                    value={formData.budget}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    placeholder="e.g. $50/hr or $100k/yr"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    required
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    placeholder="e.g. Remote, New York, NY"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                name="description"
                                rows={6}
                                required
                                value={formData.description}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                placeholder="Describe the role, responsibilities, and requirements..."
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                            <input
                                type="text"
                                name="skills"
                                required
                                value={formData.skills}
                                onChange={handleChange}
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                placeholder="e.g. React, Node.js, TypeScript"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => navigate('/dashboard')}
                                className="mr-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-[var(--color-primary)] border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]"
                            >
                                {loading ? 'Posting...' : 'Post Job'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostJob;
