import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsApi, type Project } from '../services/api';

export default function ProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const statuses = ['All', 'Active', 'Planning', 'Completed'];

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectsApi.getAll();
                setProjects(response.data);
                setFilteredProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    useEffect(() => {
        let filtered = projects;
        if (searchTerm) {
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (statusFilter !== 'All') {
            filtered = filtered.filter(project => project.status === statusFilter);
        }
        setFilteredProjects(filtered);
    }, [searchTerm, statusFilter, projects]);

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">Our Projects</h1>
                    <p className="text-xl text-gray-400">Join us in building solutions for a sustainable future</p>
                </motion.div>

                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input type="text" placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-cyan-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400" />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Filter className="text-gray-400 w-5 h-5" />
                        {statuses.map((status) => (
                            <button key={status} onClick={() => setStatusFilter(status)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${statusFilter === status ? 'bg-cyan-500 text-slate-950' : 'bg-slate-800/50 text-gray-300 hover:bg-cyan-500/20 border border-cyan-500/20'}`}>{status}</button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {filteredProjects.map((project) => (
                            <motion.div key={project.id} whileHover={{ scale: 1.02 }} className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-900/40">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="text-5xl">{project.icon}</div>
                                    <span className={`px-3 py-1 rounded-full text-sm ${project.status === 'Active' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-yellow-500/20 text-yellow-300'}`}>{project.status}</span>
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-400 mb-4">{project.description}</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.skills.map((skill) => (<span key={skill} className="px-3 py-1 bg-slate-700/50 text-sm rounded-full text-gray-300">{skill}</span>))}
                                </div>
                                <Link to={`/projects/${project.id}`}>
                                    <button className="w-full py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 rounded-lg hover:bg-cyan-500/20 font-semibold flex items-center justify-center gap-2">View Details <ArrowRight className="w-4 h-4" /></button>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
