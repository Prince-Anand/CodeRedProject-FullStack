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
    const [errors, setErrors] = useState({}); // Field-specific errors

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
                setProfile(data);
                // Parse experience periods into start/end years if possible
                const parsedExperience = (data.experience || []).map(exp => {
                    if (!exp.period) return { ...exp, startYear: '', endYear: '', isCurrent: false };
                    const parts = exp.period.split(' - ');
                    const start = parts[0] ? parts[0].replace(/\D/g, '') : ''; // Extract year digits or empty
                    const isCur = parts[1] === 'Present';
                    const end = parts[1] && !isCur ? parts[1].replace(/\D/g, '') : '';
                    return { ...exp, startYear: start, endYear: end, isCurrent: isCur };
                });
                setFormData({ ...data, experience: parsedExperience });
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
                // Specific message for image/file to remind user to save
                setMessage(`${field === 'cv' ? 'CV' : 'Image'} uploaded! Click "Save Profile" to apply changes.`);
            }
        } catch (err) {
            console.error(err);
            setError('File upload failed');
        }
    };

    const handleAddExperience = () => {
        setFormData(prev => ({
            ...prev,
            experience: [...(prev.experience || []), { title: '', company: '', period: '', description: '' }]
        }));
    };

    const handleRemoveExperience = (index) => {
        setFormData(prev => ({
            ...prev,
            experience: (prev.experience || []).filter((_, i) => i !== index)
        }));
    };

    const handleExperienceChange = (index, field, value) => {
        const newExperience = [...(formData.experience || [])];
        // Handle checkbox 
        if (field === 'isCurrent') {
            newExperience[index] = { ...newExperience[index], isCurrent: value, endYear: value ? '' : newExperience[index].endYear };
        } else {
            newExperience[index] = { ...newExperience[index], [field]: value };
        }
        setFormData(prev => ({ ...prev, experience: newExperience }));
    };

    const validateForm = () => {
        const newErrors = {};
        const currentYear = new Date().getFullYear();

        if (user.role === 'agent') {
            if (!formData.name?.trim()) newErrors.name = 'Display Name is required';
            if (!formData.title?.trim()) newErrors.title = 'Professional Title is required';
            if (!formData.bio?.trim()) newErrors.bio = 'Bio is required';
            if (!formData.hourlyRate) {
                newErrors.hourlyRate = 'Hourly Rate is required';
            } else if (Number(formData.hourlyRate) <= 0) {
                newErrors.hourlyRate = 'Rate must be positive';
            }

            if (!formData.skills || (Array.isArray(formData.skills) && formData.skills.length === 0) || (typeof formData.skills === 'string' && !formData.skills.trim())) {
                newErrors.skills = 'At least one skill is required';
            }

            // XP Validation
            if (formData.experience && formData.experience.length > 0) {
                formData.experience.forEach((exp, idx) => {
                    if (!exp.title?.trim()) newErrors[`exp_${idx}_title`] = 'Job Title is required';
                    if (!exp.company?.trim()) newErrors[`exp_${idx}_company`] = 'Company is required';

                    if (!exp.startYear) {
                        newErrors[`exp_${idx}_period`] = 'Start Year is required';
                    } else if (Number(exp.startYear) > currentYear) {
                        newErrors[`exp_${idx}_period`] = 'Start Year cannot be in the future';
                    } else if (exp.startYear.length !== 4) {
                        newErrors[`exp_${idx}_period`] = 'Use 4-digit year (YYYY)';
                    }

                    if (!exp.isCurrent) {
                        if (exp.endYear) {
                            if (Number(exp.endYear) > currentYear) {
                                newErrors[`exp_${idx}_period`] = 'End Year cannot be in the future';
                            } else if (Number(exp.endYear) < Number(exp.startYear)) {
                                newErrors[`exp_${idx}_period`] = 'End Year must be after Start Year';
                            } else if (exp.endYear.length !== 4) {
                                newErrors[`exp_${idx}_period`] = 'Use 4-digit year (YYYY)';
                            }
                        }
                    }
                });
            }
        } else if (user.role === 'employer') {
            if (!formData.companyName?.trim()) newErrors.companyName = 'Company Name is required';
            if (!formData.description?.trim()) newErrors.description = 'Description is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (!validateForm()) {
            setError('Please correct the errors in the form.');
            window.scrollTo(0, 0);
            return;
        }

        setSaving(true);

        try {
            const token = localStorage.getItem('token');
            // Prepare data: format experience period strings
            let submitData = { ...formData };

            if (user.role === 'agent') {
                if (typeof submitData.skills === 'string') {
                    submitData.skills = submitData.skills.split(',').map(s => s.trim()).filter(s => s);
                }

                // Construct period string from years
                if (submitData.experience) {
                    submitData.experience = submitData.experience.map(exp => ({
                        ...exp,
                        period: `${exp.startYear} - ${exp.isCurrent ? 'Present' : (exp.endYear || 'Present')}`
                    }));
                }
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
                                            className={`mt-1 block w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Professional Title</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title || ''}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior React Developer"
                                            className={`mt-1 block w-full border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                        />
                                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                                    <textarea
                                        name="bio"
                                        rows={4}
                                        value={formData.bio || ''}
                                        onChange={handleChange}
                                        className={`mt-1 block w-full border ${errors.bio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                    />
                                    {errors.bio && <p className="mt-1 text-sm text-red-600">{errors.bio}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hourly Rate ($/hr)</label>
                                        <input
                                            type="number"
                                            name="hourlyRate"
                                            value={formData.hourlyRate || ''}
                                            onChange={handleChange}
                                            className={`mt-1 block w-full border ${errors.hourlyRate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                        />
                                        {errors.hourlyRate && <p className="mt-1 text-sm text-red-600">{errors.hourlyRate}</p>}
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
                                    />
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-medium text-gray-900">Work History</h3>
                                        <button
                                            type="button"
                                            onClick={handleAddExperience}
                                            className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-secondary)]"
                                        >
                                            + Add Experience
                                        </button>
                                    </div>

                                    <div className="space-y-6">
                                        {(formData.experience || []).map((exp, index) => (
                                            <div key={index} className="bg-slate-50 p-4 rounded-lg relative border border-slate-200">
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveExperience(index)}
                                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm font-medium"
                                                >
                                                    Remove
                                                </button>
                                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Job Title</label>
                                                        <input
                                                            type="text"
                                                            value={exp.title || ''}
                                                            onChange={(e) => handleExperienceChange(index, 'title', e.target.value)}
                                                            className={`mt-1 block w-full border ${errors[`exp_${index}_title`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                                        />
                                                        {errors[`exp_${index}_title`] && <p className="mt-1 text-sm text-red-600">{errors[`exp_${index}_title`]}</p>}
                                                    </div>
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700">Company</label>
                                                        <input
                                                            type="text"
                                                            value={exp.company || ''}
                                                            onChange={(e) => handleExperienceChange(index, 'company', e.target.value)}
                                                            className={`mt-1 block w-full border ${errors[`exp_${index}_company`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]`}
                                                        />
                                                        {errors[`exp_${index}_company`] && <p className="mt-1 text-sm text-red-600">{errors[`exp_${index}_company`]}</p>}
                                                    </div>
                                                    <div className="sm:col-span-2">
                                                        <label className="block text-sm font-medium text-gray-700">Period (Years)</label>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <input
                                                                type="text" // using text to enforce length=4 check manually, or number
                                                                placeholder="Start (YYYY)"
                                                                maxLength={4}
                                                                value={exp.startYear || ''}
                                                                onChange={(e) => handleExperienceChange(index, 'startYear', e.target.value.replace(/\D/g, ''))}
                                                                className={`w-32 border ${errors[`exp_${index}_period`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[var(--color-primary)]`}
                                                            />
                                                            <span className="text-gray-500">-</span>
                                                            {!exp.isCurrent ? (
                                                                <input
                                                                    type="text"
                                                                    placeholder="End (YYYY)"
                                                                    maxLength={4}
                                                                    value={exp.endYear || ''}
                                                                    onChange={(e) => handleExperienceChange(index, 'endYear', e.target.value.replace(/\D/g, ''))}
                                                                    className={`w-32 border ${errors[`exp_${index}_period`] ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[var(--color-primary)]`}
                                                                />
                                                            ) : (
                                                                <span className="font-medium text-[var(--color-primary)] px-3">Present</span>
                                                            )}

                                                            <div className="flex items-center ml-4">
                                                                <input
                                                                    id={`current-${index}`}
                                                                    type="checkbox"
                                                                    checked={exp.isCurrent || false}
                                                                    onChange={(e) => handleExperienceChange(index, 'isCurrent', e.target.checked)}
                                                                    className="h-4 w-4 text-[var(--color-primary)] focus:ring-[var(--color-primary)] border-gray-300 rounded"
                                                                />
                                                                <label htmlFor={`current-${index}`} className="ml-2 block text-sm text-gray-900">
                                                                    Currently Working
                                                                </label>
                                                            </div>
                                                        </div>
                                                        {errors[`exp_${index}_period`] && <p className="mt-1 text-sm text-red-600">{errors[`exp_${index}_period`]}</p>}
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                                    <textarea
                                                        rows={2}
                                                        value={exp.description || ''}
                                                        onChange={(e) => handleExperienceChange(index, 'description', e.target.value)}
                                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {(formData.experience || []).length === 0 && (
                                            <p className="text-sm text-gray-500 italic">No work history added yet.</p>
                                        )}
                                    </div>
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
