import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, DollarSign, Eye, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobs } from '../data/jobs';

const AgentDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const [applications, setApplications] = useState([]);

    // Fetch applications
    // Fetch applications
    useEffect(() => {
        const fetchApps = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const res = await fetch('http://localhost:5000/api/applications/my', {
                    headers: { 'x-auth-token': token }
                });

                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setApplications(data);
                    }
                }
            } catch (err) {
                console.error("Error fetching applications:", err);
            }
        };
        fetchApps();
    }, []);

    const recommendedJobs = jobs;

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex">
            {/* Sidebar (same as before) */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
                {/* ... Sidebar Content ... */}
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] font-serif">Agnt<span className="text-[var(--color-secondary)]">.</span></h2>
                </div>
                <nav className="mt-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'overview'
                            ? 'text-[var(--color-primary)] bg-[var(--color-secondary)]/10 border-r-4 border-[var(--color-primary)]'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]'
                            }`}
                    >
                        <LayoutDashboard className="h-5 w-5 mr-3" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('jobs')}
                        className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors ${activeTab === 'jobs'
                            ? 'text-[var(--color-primary)] bg-[var(--color-secondary)]/10 border-r-4 border-[var(--color-primary)]'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)]'
                            }`}
                    >
                        <Briefcase className="h-5 w-5 mr-3" />
                        My Applications
                    </button>
                    {/* ... other links ... */}
                </nav>
                {/* ... logout ... */}
                <div className="absolute bottom-0 w-64 p-6 border-t border-slate-200">
                    <button
                        onClick={logout}
                        className="flex items-center text-sm font-medium text-slate-600 hover:text-[var(--color-accent)] transition-colors"
                    >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <div className="max-w-5xl mx-auto">
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-[var(--color-primary)] font-serif">Hello, {user?.name}</h1>
                            <p className="text-slate-600">Track your applications and find new opportunities.</p>
                        </div>
                        <Link to="/jobs" className="btn btn-primary shadow-md">
                            Find New Jobs
                        </Link>
                    </header>

                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="card p-6 border-l-4 border-[var(--color-secondary)]">
                                    <div className="flex items-center">
                                        <div className="p-3 rounded-full bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]">
                                            <Briefcase className="h-6 w-6" />
                                        </div>
                                        <div className="ml-4">
                                            <p className="text-sm font-medium text-slate-500">Applications Sent</p>
                                            <p className="text-2xl font-bold text-[var(--color-primary)]">{applications.length}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* ... other stats (mocked) ... */}
                            </div>

                            {/* Recommended Jobs */}
                            <div className="card overflow-hidden">
                                <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                                    <h3 className="text-lg font-bold text-[var(--color-primary)]">Recommended For You</h3>
                                    <Link to="/jobs" className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium">View All</Link>
                                </div>
                                <div className="divide-y divide-slate-100">
                                    {recommendedJobs.map((job) => (
                                        <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors">
                                            {/* ... job item ... */}
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-[var(--color-primary)]">{job.title}</h4>
                                                    <p className="text-slate-600 text-sm mt-1">{job.company}</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {job.skills.slice(0, 3).map(skill => (
                                                            <span key={skill} className="px-2 py-0.5 rounded text-xs font-medium bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="flex flex-col items-end space-y-2">
                                                    <span className="font-bold text-[var(--color-primary)]">{job.budget}</span>
                                                    <Link to="/jobs" className="btn btn-outline text-sm px-4 py-1.5">Apply</Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'jobs' && (
                        <div className="card overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-100 bg-white">
                                <h3 className="text-lg font-bold text-[var(--color-primary)]">My Applications</h3>
                            </div>
                            <div className="divide-y divide-slate-100">
                                {applications.length === 0 ? (
                                    <p className="p-6 text-slate-500">No applications yet.</p>
                                ) : (
                                    applications.map((app) => (
                                        <div key={app._id} className="p-6 hover:bg-slate-50 transition-colors">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-[var(--color-primary)]">{app.job.title}</h4>
                                                    <p className="text-slate-600 text-sm mt-1">{app.job.company}</p>
                                                    <p className="text-xs text-slate-400 mt-2">Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex flex-col items-end space-y-2">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                                                        ${app.status === 'hired' ? 'bg-green-100 text-green-800' :
                                                            app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                                                'bg-blue-100 text-blue-800'}`}>
                                                        {app.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AgentDashboard;
