import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter } from 'lucide-react';
// import { agents } from '../data/agents';

const AgentSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSkill, setSelectedSkill] = useState('');
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await fetch('http://localhost:5000/agents');
                const data = await res.json();
                setAgents(data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching agents:", err);
                setLoading(false);
            }
        };
        fetchAgents();
    }, []);

    const filteredAgents = agents.filter((agent) => {
        const matchesSearch = agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            agent.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSkill = selectedSkill ? agent.skills.includes(selectedSkill) : true;
        return matchesSearch && matchesSkill;
    });

    const allSkills = [...new Set(agents.flatMap(agent => agent.skills))];

    return (
        <div className="bg-[var(--color-background)] min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                    <h1 className="text-3xl font-bold text-[var(--color-primary)] font-serif">Find Top Agents</h1>
                    <div className="mt-4 md:mt-0 flex space-x-4">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                className="input-field pl-10"
                                placeholder="Search by name or role"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="relative">
                            <select
                                className="input-field"
                                value={selectedSkill}
                                onChange={(e) => setSelectedSkill(e.target.value)}
                            >
                                <option value="">All Skills</option>
                                {allSkills.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? <p className="text-center text-[var(--color-primary)]">Loading agents...</p> : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredAgents.map((agent) => (
                            <div key={agent.id} className="card overflow-hidden group">
                                <div className="p-6">
                                    <div className="flex items-center">
                                        <img className="h-16 w-16 rounded-full object-cover ring-2 ring-[var(--color-secondary)]/20" src={agent.image} alt={agent.name} />
                                        <div className="ml-4">
                                            <h2 className="text-xl font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">{agent.name}</h2>
                                            <p className="text-sm text-slate-500">{agent.role}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-slate-600 line-clamp-3 leading-relaxed">{agent.bio}</p>
                                    </div>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {agent.skills.slice(0, 3).map((skill) => (
                                            <span key={skill} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--color-background)] text-[var(--color-primary)] border border-[var(--color-secondary)]/20">
                                                {skill}
                                            </span>
                                        ))}
                                        {agent.skills.length > 3 && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                                +{agent.skills.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-6 flex items-center justify-between">
                                        <div className="flex items-center text-sm text-slate-500">
                                            <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-slate-400" />
                                            {agent.location}
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-slate-900">
                                            <Star className="flex-shrink-0 mr-1.5 h-4 w-4 text-[var(--color-accent)] fill-current" />
                                            {agent.rating} ({agent.reviews})
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-[var(--color-background)]/50 px-6 py-4 flex items-center justify-between border-t border-slate-100">
                                    <span className="text-lg font-bold text-[var(--color-primary)]">${agent.hourlyRate}/hr</span>
                                    <Link to={`/agent/${agent.id}`} className="text-[var(--color-secondary)] hover:text-[var(--color-primary)] font-medium text-sm transition-colors">
                                        View Profile &rarr;
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AgentSearch;
