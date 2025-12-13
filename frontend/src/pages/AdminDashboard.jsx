import { useState } from 'react';
import { Users, AlertTriangle, DollarSign, CheckCircle, XCircle, Search } from 'lucide-react';
import { agents } from '../data/agents';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');

    return (
        <div className="min-h-screen bg-[var(--color-background)] p-8">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-3xl font-bold text-[var(--color-primary)] font-serif mb-8">Admin Dashboard</h1>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 border-l-4 border-[var(--color-primary)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Users</p>
                                <p className="text-2xl font-bold text-[var(--color-primary)]">1,248</p>
                            </div>
                            <Users className="h-8 w-8 text-[var(--color-primary)] opacity-20" />
                        </div>
                    </div>
                    <div className="card p-6 border-l-4 border-[var(--color-secondary)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Pending Approvals</p>
                                <p className="text-2xl font-bold text-[var(--color-primary)]">15</p>
                            </div>
                            <CheckCircle className="h-8 w-8 text-[var(--color-secondary)] opacity-20" />
                        </div>
                    </div>
                    <div className="card p-6 border-l-4 border-[var(--color-accent)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Reports</p>
                                <p className="text-2xl font-bold text-[var(--color-primary)]">3</p>
                            </div>
                            <AlertTriangle className="h-8 w-8 text-[var(--color-accent)] opacity-20" />
                        </div>
                    </div>
                    <div className="card p-6 border-l-4 border-[var(--color-primary)]">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-500">Total Revenue</p>
                                <p className="text-2xl font-bold text-[var(--color-primary)]">$45.2k</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-[var(--color-primary)] opacity-20" />
                        </div>
                    </div>
                </div>

                {/* Content Area */}
                <div className="card overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-white">
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'users' ? 'bg-[var(--color-primary)] text-white' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                User Management
                            </button>
                            <button
                                onClick={() => setActiveTab('reports')}
                                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'reports' ? 'bg-[var(--color-primary)] text-white' : 'text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                Reports & Issues
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Search users..."
                                className="pl-10 input-field py-1.5 text-sm w-64"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {agents.map((agent) => (
                                    <tr key={agent.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <img className="h-10 w-10 rounded-full object-cover" src={agent.image} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-[var(--color-primary)]">{agent.name}</div>
                                                    <div className="text-sm text-slate-500">user{agent.id}@example.com</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20">
                                                Agent
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                Active
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            Dec 12, 2023
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] mr-4">Edit</button>
                                            <button className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]">Ban</button>
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
};

export default AdminDashboard;
