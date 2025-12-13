import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut, Plus, Users, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobs } from '../data/jobs';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    const myJobs = jobs.filter(job => job.company === 'Tech Corp'); // Mock filter

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:block">
                <div className="p-6">
                    <h2 className="text-2xl font-bold text-[var(--color-primary)] font-serif">Employer</h2>
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
                        My Jobs
                    </button>
                    <Link
                        to="/chat"
                        className="w-full flex items-center px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors"
                    >
                        <MessageSquare className="h-5 w-5 mr-3" />
                        Messages
                    </Link>
                    <button className="w-full flex items-center px-6 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-[var(--color-primary)] transition-colors">
                        <Settings className="h-5 w-5 mr-3" />
                        Settings
                    </button>
                </nav>
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
                            <h1 className="text-2xl font-bold text-[var(--color-primary)] font-serif">Welcome back, {user?.name}</h1>
                            <p className="text-slate-600">Here's what's happening with your job postings.</p>
                        </div>
                        <Link to="/post-job" className="btn btn-primary flex items-center shadow-md">
                            <Plus className="h-5 w-5 mr-2" />
                            Post a Job
                        </Link>
                    </header>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="card p-6 border-l-4 border-[var(--color-primary)]">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-[var(--color-secondary)]/20 text-[var(--color-primary)]">
                                    <Briefcase className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500">Active Jobs</p>
                                    <p className="text-2xl font-bold text-[var(--color-primary)]">12</p>
                                </div>
                            </div>
                        </div>
                        <div className="card p-6 border-l-4 border-[var(--color-secondary)]">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-[var(--color-secondary)]/20 text-[var(--color-secondary)]">
                                    <Users className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500">Total Applicants</p>
                                    <p className="text-2xl font-bold text-[var(--color-primary)]">48</p>
                                </div>
                            </div>
                        </div>
                        <div className="card p-6 border-l-4 border-[var(--color-accent)]">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                                    <MessageSquare className="h-6 w-6" />
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-slate-500">Unread Messages</p>
                                    <p className="text-2xl font-bold text-[var(--color-primary)]">5</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Applicants / Jobs */}
                    <div className="card overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                            <h3 className="text-lg font-bold text-[var(--color-primary)]">Recent Job Postings</h3>
                            <button className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium">View All</button>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {myJobs.map((job) => (
                                <div key={job.id} className="p-6 hover:bg-slate-50 transition-colors">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="text-lg font-semibold text-[var(--color-primary)]">{job.title}</h4>
                                            <div className="flex items-center mt-1 text-sm text-slate-500">
                                                <Clock className="h-4 w-4 mr-1" />
                                                Posted {job.posted}
                                                <span className="mx-2">•</span>
                                                <span className="px-2 py-0.5 rounded-full bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20 text-xs font-medium">
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <p className="text-2xl font-bold text-[var(--color-primary)]">8</p>
                                                <p className="text-xs text-slate-500">Applicants</p>
                                            </div>
                                            <button className="btn btn-outline text-sm px-4 py-2">Manage</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
