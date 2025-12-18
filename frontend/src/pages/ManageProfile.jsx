import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Upload, Save, User, Building, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ManageProfile = () => {
    const { user } = useAuth();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({});

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/profiles/me', {
                headers: { 'x-auth-token': token }
            });
            const data = await res.json();

            // Should return { user, profile } or just profile depending on implementation
            // My backend returns 'profile' object directly or checks if null.
            // Wait, backend logic:
            // if profile exists -> res.json(profile) (which populates user)
            // if not -> res.json({ user, profile: null })

            if (data.companyName || data.hourlyRate || data.bio) {
                // It's a profile object
                setProfile(data);
                setFormData(data);
            } else if (data.profile === null) {
                // No profile yet
                setProfile(null);
                setFormData({});
            }
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load profile');
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileUpload = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadData = new FormData();
        uploadData.append('file', file);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/profiles/upload', {
                method: 'POST',
                headers: { 'x-auth-token': token },
                body: uploadData
            });
            const data = await res.json();
            if (data.url) {
                setFormData(prev => ({ ...prev, [field]: data.url }));
                setMessage(`${field === 'cv' ? 'CV' : 'Image'} uploaded successfully`);
            }
        } catch (err) {
            console.error(err);
            setError('File upload failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage('');
        setError('');

        try {
            const token = localStorage.getItem('token');
            // Parse skills if agent
            let submitData = { ...formData };
            if (user.role === 'agent' && typeof submitData.skills === 'string') {
                submitData.skills = submitData.skills.split(',').map(s => s.trim());
            }

            const res = await fetch('http://localhost:5000/api/profiles/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-auth-token': token
                },
                body: JSON.stringify(submitData)
            });

            if (res.ok) {
                setMessage('Profile saved successfully');
                fetchProfile(); // Reload
            } else {
                setError('Failed to save profile');
            }
        } catch (err) {
            console.error(err);
            setError('Error saving profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="md:flex md:items-center md:justify-between mb-8">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold leading-7 text-[var(--color-primary-dark)] sm:text-3xl sm:truncate font-serif">
                            Manage Profile
                        </h2>
                    </div>
                </div>

                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {user.role === 'agent' && (
                            <>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name || user.name || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title || ''}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior React Developer"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows={4}
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($/hr)</label>
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            value={formData.hourlyRate || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Location</label>
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location || ''}
                                            onChange={handleChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={Array.isArray(formData.skills) ? formData.skills.join(', ') : (formData.skills || '')}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Files</h3>
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">Profile Image</label>
                                            <div className="mt-1 flex items-center">
                                                {formData.image && <img src={formData.image} alt="Profile" className="h-12 w-12 rounded-full mr-4" />}
                                                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]">
                                                    <span>Upload Image</span>
                                                    <input type="file" className="sr-only" onChange={(e) => handleFileUpload(e, 'image')} accept="image/*" />
                                                </label>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700">CV (PDF)</label>
                                            <div className="mt-1 flex items-center">
                                                {formData.cv && <a href={formData.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 mr-4 text-sm">View Current CV</a>}
                                                <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]">
                                                    <span>Upload CV</span>
                                                    <input type="file" className="sr-only" onChange={(e) => handleFileUpload(e, 'cv')} accept=".pdf,.doc,.docx" />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {user.role === 'employer' && (
                            <>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company Name</label>
                                    <input
                                        type="text"
                                        name="companyName"
                                        value={formData.companyName || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        name="description"
                                        rows={4}
                                        value={formData.description || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Website</label>
                                    <input
                                        type="text"
                                        name="website"
                                        value={formData.website || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Location</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location || ''}
                                        onChange={handleChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Company Logo</label>
                                    <div className="mt-1 flex items-center">
                                        {formData.logo && <img src={formData.logo} alt="Logo" className="h-12 w-12 object-contain mr-4" />}
                                        <label className="cursor-pointer bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)]">
                                            <span>Upload Logo</span>
                                            <input type="file" className="sr-only" onChange={(e) => handleFileUpload(e, 'logo')} accept="image/*" />
                                        </label>
                                    </div>
                                </div>
                            </>
                        )}

                        <div className="flex items-center justify-end">
                            {message && <div className="text-green-600 mr-4 flex items-center"><CheckCircle className="h-4 w-4 mr-2" /> {message}</div>}
                            {error && <div className="text-red-600 mr-4 flex items-center"><AlertCircle className="h-4 w-4 mr-2" /> {error}</div>}
                            <button
                                type="submit"
                                disabled={saving}
                                className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-md hover:bg-[var(--color-primary-dark)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-primary)] disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManageProfile;
