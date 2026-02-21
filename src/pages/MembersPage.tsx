import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';
import { membersApi, type Member } from '../services/api';

export default function MembersPage() {
    const [members, setMembers] = useState<Member[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await membersApi.getAll();
                setMembers(response.data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Our Team</h1>
                    <p className="text-xl text-gray-400">A collective of dreamers and doers building a sustainable future</p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400"></div></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {members.map((member) => (
                            <motion.div key={member.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} whileHover={{ y: -5 }} className="p-6 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40">
                                <div className="flex items-start gap-4">
                                    {member.photo_url ? (
                                        <>
                                            <img
                                                src={member.photo_url}
                                                alt={member.name}
                                                className="w-16 h-16 rounded-full object-cover border-2 border-emerald-400/50 flex-shrink-0"
                                                onError={(e) => {
                                                    e.currentTarget.style.display = 'none';
                                                    const uniqueId = `fallback-${member.id}`;
                                                    const el = document.getElementById(uniqueId);
                                                    if (el) el.classList.remove('hidden');
                                                }}
                                            />
                                            <div id={`fallback-${member.id}`} className="hidden w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xl flex-shrink-0">{member.initials}</div>
                                        </>
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center font-bold text-slate-950 text-xl flex-shrink-0">{member.initials}</div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-lg truncate">{member.name}</h3>
                                        <p className="text-emerald-400 text-sm">{member.role}</p>
                                    </div>
                                </div>
                                {member.bio && (
                                    <div className="text-gray-400 text-sm mt-4">
                                        {Array.isArray(member.bio)
                                            ? member.bio.map((line, i) => <p key={i}>{line}</p>)
                                            : <p className="whitespace-pre-line">{member.bio}</p>
                                        }
                                    </div>
                                )}
                                {member.skills && member.skills.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-4">{member.skills.slice(0, 3).map((skill) => (<span key={skill} className="px-2 py-1 bg-slate-700/50 text-xs rounded text-gray-300">{skill}</span>))}{member.skills.length > 3 && <span className="px-2 py-1 text-xs text-gray-500">+{member.skills.length - 3}</span>}</div>
                                )}
                                <div className="flex gap-3 mt-4 pt-4 border-t border-emerald-500/10">
                                    {member.email && <a href={`mailto:${member.email}`} className="p-2 rounded-lg bg-slate-800/50 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"><Mail className="w-4 h-4" /></a>}
                                    {member.linkedin && <a href={`https://linkedin.com/in/${member.linkedin}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-slate-800/50 text-gray-400 hover:text-emerald-400 hover:bg-emerald-500/10"><Linkedin className="w-4 h-4" /></a>}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
