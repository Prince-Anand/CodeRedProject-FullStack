import { useState } from 'react';
import { Search, MapPin, DollarSign, Clock } from 'lucide-react';
import { jobs } from '../data/jobs';

const JobBoard = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-[var(--color-primary)] font-serif">Find Jobs</h1>
                    <div className="mt-4 md:mt-0 w-full md:w-1/3">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="input-field pl-10"
                                placeholder="Search jobs or companies"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    {filteredJobs.map((job) => (
                        <div key={job.id} className="card p-6 group hover:border-[var(--color-secondary)]/50 transition-all">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center justify-between md:justify-start">
                                        <h2 className="text-xl font-bold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">{job.title}</h2>
                                        <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20 md:hidden">
                                            {job.type}
                                        </span>
                                    </div>
                                    <p className="text-lg text-slate-700 mt-1 font-medium">{job.company}</p>
                                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                                        <div className="flex items-center">
                                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                                            {job.location}
                                        </div>
                                        <div className="flex items-center">
                                            <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                                            {job.budget}
                                        </div>
                                        <div className="flex items-center">
                                            <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                                            {job.posted}
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 md:mt-0 flex flex-col items-end space-y-2">
                                    <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20">
                                        {job.type}
                                    </span>
                                    <button className="btn btn-primary w-full md:w-auto shadow-sm">Apply Now</button>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100">
                                <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">{job.description}</p>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {job.skills.map((skill) => (
                                        <span key={skill} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-50 text-slate-600 border border-slate-200">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobBoard;
