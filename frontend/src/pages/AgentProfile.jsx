import { useParams, Link } from 'react-router-dom';
import { MapPin, Star, Mail, Globe, Download, Check } from 'lucide-react';
import { agents } from '../data/agents';

const AgentProfile = () => {
    const { id } = useParams();
    const agent = agents.find((a) => a.id === parseInt(id));

    if (!agent) {
        return <div className="text-center py-20 text-[var(--color-primary)]">Agent not found</div>;
    }

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="card overflow-hidden">
                    {/* Header */}
                    <div className="bg-[var(--color-primary)] h-32 sm:h-48 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    </div>
                    <div className="relative px-6 pb-6">
                        <div className="flex flex-col sm:flex-row items-center sm:items-end -mt-12 sm:-mt-16 mb-6">
                            <img
                                className="h-24 w-24 sm:h-32 sm:w-32 rounded-full ring-4 ring-white object-cover bg-white"
                                src={agent.image}
                                alt={agent.name}
                            />
                            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left flex-1">
                                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] font-serif">{agent.name}</h1>
                                <p className="text-[var(--color-secondary)] font-medium text-lg">{agent.role}</p>
                                <div className="flex items-center justify-center sm:justify-start mt-2 text-sm text-slate-500">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {agent.location}
                                </div>
                            </div>
                            <div className="mt-4 sm:mt-0 flex space-x-3">
                                <button className="btn btn-primary flex items-center shadow-md">
                                    <Mail className="h-4 w-4 mr-2" />
                                    Contact
                                </button>
                                <button className="btn btn-outline">Hire Now</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-8">
                                <section>
                                    <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-slate-100 pb-2">About</h2>
                                    <p className="text-slate-600 leading-relaxed">{agent.bio}</p>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-slate-100 pb-2">Skills</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {agent.skills.map((skill) => (
                                            <span key={skill} className="px-3 py-1 rounded-full bg-[var(--color-background)] text-[var(--color-primary)] font-medium border border-[var(--color-secondary)]/20">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-xl font-bold text-[var(--color-primary)] mb-4 border-b border-slate-100 pb-2">Work History</h2>
                                    <div className="space-y-6">
                                        {/* Mock Work History */}
                                        {[1, 2].map((job) => (
                                            <div key={job} className="border-l-2 border-[var(--color-secondary)]/30 pl-4 pb-6 last:pb-0">
                                                <h3 className="text-lg font-semibold text-[var(--color-primary)]">Senior Developer at Tech Corp</h3>
                                                <p className="text-sm text-slate-500 mb-2">Jan 2022 - Present</p>
                                                <p className="text-slate-600 leading-relaxed">
                                                    Led the development of a cloud-based SaaS platform. Improved performance by 40% and reduced infrastructure costs.
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-6">
                                <div className="bg-[var(--color-background)]/50 p-6 rounded-lg border border-slate-200">
                                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Overview</h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Hourly Rate</span>
                                            <span className="font-bold text-[var(--color-primary)] text-lg">${agent.hourlyRate}/hr</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Rating</span>
                                            <div className="flex items-center font-bold text-[var(--color-primary)]">
                                                <Star className="h-4 w-4 text-[var(--color-accent)] fill-current mr-1" />
                                                {agent.rating}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-slate-600">Jobs Completed</span>
                                            <span className="font-bold text-[var(--color-primary)]">24</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[var(--color-background)]/50 p-6 rounded-lg border border-slate-200">
                                    <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4">Documents</h3>
                                    <div className="space-y-3">
                                        <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md hover:border-[var(--color-primary)] transition-colors group">
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-[var(--color-primary)]">Resume.pdf</span>
                                            <Download className="h-4 w-4 text-slate-400 group-hover:text-[var(--color-primary)]" />
                                        </button>
                                        <button className="w-full flex items-center justify-between p-3 bg-white border border-slate-200 rounded-md hover:border-[var(--color-primary)] transition-colors group">
                                            <span className="text-sm font-medium text-slate-700 group-hover:text-[var(--color-primary)]">Portfolio.pdf</span>
                                            <Download className="h-4 w-4 text-slate-400 group-hover:text-[var(--color-primary)]" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgentProfile;
