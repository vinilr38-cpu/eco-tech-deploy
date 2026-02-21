import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, Check, Circle } from 'lucide-react';
import { projectsApi, type Project } from '../services/api';

export default function ProjectDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [loading, setLoading] = useState(true);
    const [showJoinModal, setShowJoinModal] = useState(false);
    const [joinForm, setJoinForm] = useState({ name: '', email: '', skills: '' });
    const [submitting, setSubmitting] = useState(false);
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;
            try {
                const response = await projectsApi.getById(parseInt(id));
                setProject(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProject();
    }, [id]);

    const handleJoin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;
        setSubmitting(true);
        try {
            await projectsApi.join(parseInt(id), joinForm);
            setJoined(true);
            setShowJoinModal(false);
            const response = await projectsApi.getById(parseInt(id));
            setProject(response.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400"></div></div>;
    if (!project) return <div className="min-h-screen flex flex-col items-center justify-center"><h2 className="text-2xl font-bold text-gray-400 mb-4">Project not found</h2><Link to="/projects" className="text-cyan-400"><ArrowLeft className="w-4 h-4 inline" /> Back</Link></div>;

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8"><ArrowLeft className="w-4 h-4" />Back to Projects</Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-cyan-900/30 to-slate-900/50 rounded-2xl border border-cyan-500/20 overflow-hidden">
                    <div className="p-8 bg-gradient-to-r from-cyan-600/20 to-emerald-600/20">
                        <div className="text-6xl mb-4">{project.icon}</div>
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${project.status === 'Active' ? 'bg-emerald-500/30 text-emerald-300' : 'bg-yellow-500/30 text-yellow-300'}`}>{project.status}</span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
                        <p className="text-gray-300 text-lg">{project.description}</p>
                    </div>

                    <div className="p-8">
                        {project.longDescription && <div className="mb-8"><h3 className="font-semibold text-white text-lg mb-3">About</h3><p className="text-gray-400 leading-relaxed">{project.longDescription}</p></div>}

                        <div className="mb-8"><h3 className="font-semibold text-white text-lg mb-3">Skills Needed</h3><div className="flex flex-wrap gap-2">{project.skills.map((skill) => (<span key={skill} className="px-4 py-2 bg-slate-700/50 rounded-full text-gray-300 border border-slate-600">{skill}</span>))}</div></div>

                        {project.milestones && <div className="mb-8"><h3 className="font-semibold text-white text-lg mb-3">Milestones</h3><div className="space-y-3">{project.milestones.map((m, i) => (<div key={i} className="flex items-center gap-3">{m.completed ? <Check className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-gray-500" />}<span className={m.completed ? 'text-gray-300' : 'text-gray-500'}>{m.title}</span></div>))}</div></div>}

                        <div className="p-4 rounded-xl bg-slate-800/50 border border-cyan-500/10 mb-6 flex items-center justify-between"><div className="flex items-center gap-2"><Users className="w-5 h-5 text-cyan-400" /><span className="text-gray-300">{project.membersNeeded} spots available</span></div>{project.lead && <span className="text-gray-400">Led by <span className="text-emerald-400">{project.lead}</span></span>}</div>

                        {joined ? (
                            <div className="flex items-center justify-center gap-3 py-4 px-8 bg-cyan-500/20 rounded-xl border border-cyan-400"><Check className="w-6 h-6 text-cyan-400" /><span className="text-cyan-400 font-semibold text-lg">You've joined this project!</span></div>
                        ) : (
                            <button onClick={() => setShowJoinModal(true)} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-xl font-bold text-slate-950 text-lg hover:shadow-lg hover:shadow-cyan-500/30 transition-all">Join This Project</button>
                        )}
                    </div>
                </motion.div>
            </div>

            {showJoinModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowJoinModal(false)}>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} onClick={(e) => e.stopPropagation()} className="bg-slate-900 border border-cyan-500/30 rounded-2xl p-8 w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-6">Join {project.title}</h2>
                        <form onSubmit={handleJoin} className="space-y-4">
                            <div><label className="block text-gray-400 mb-2">Your Name</label><input type="text" required value={joinForm.name} onChange={(e) => setJoinForm({ ...joinForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-400" /></div>
                            <div><label className="block text-gray-400 mb-2">Email</label><input type="email" required value={joinForm.email} onChange={(e) => setJoinForm({ ...joinForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-400" /></div>
                            <div><label className="block text-gray-400 mb-2">Your Skills</label><input type="text" required value={joinForm.skills} onChange={(e) => setJoinForm({ ...joinForm, skills: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-cyan-500/20 text-white focus:outline-none focus:border-cyan-400" placeholder="e.g., React, Python" /></div>
                            <div className="flex gap-3 pt-4">
                                <button type="button" onClick={() => setShowJoinModal(false)} className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-slate-800">Cancel</button>
                                <button type="submit" disabled={submitting} className="flex-1 py-3 bg-cyan-500 text-slate-950 rounded-xl font-semibold hover:bg-cyan-600 disabled:opacity-50">{submitting ? 'Joining...' : 'Join'}</button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
