import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, ArrowLeft, User, Check } from 'lucide-react';
import { eventsApi, type Event } from '../services/api';

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [registerForm, setRegisterForm] = useState({ name: '', email: '' });
    const [submitting, setSubmitting] = useState(false);
    const [registered, setRegistered] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                const response = await eventsApi.getById(parseInt(id));
                setEvent(response.data);
            } catch (error) {
                console.error('Error fetching event:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        setSubmitting(true);
        try {
            await eventsApi.register(parseInt(id), registerForm);
            setRegistered(true);
            setShowRegisterModal(false);
            // Refresh event data
            const response = await eventsApi.getById(parseInt(id));
            setEvent(response.data);
        } catch (error) {
            console.error('Error registering:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <Calendar className="w-16 h-16 text-gray-600 mb-4" />
                <h2 className="text-2xl font-bold text-gray-400 mb-4">Event not found</h2>
                <Link to="/events" className="text-emerald-400 hover:underline flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" /> Back to Events
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                {/* Back Button */}
                <Link to="/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-emerald-400 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Events
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-2xl border border-emerald-500/20 overflow-hidden"
                >
                    {/* Header */}
                    <div className="relative p-8 bg-gradient-to-r from-emerald-600/20 to-cyan-600/20">
                        <span className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${event.category === 'Workshop' ? 'bg-emerald-500/30 text-emerald-300' :
                                event.category === 'Hackathon' ? 'bg-purple-500/30 text-purple-300' :
                                    event.category === 'Talk' ? 'bg-cyan-500/30 text-cyan-300' :
                                        'bg-yellow-500/30 text-yellow-300'
                            }`}>
                            {event.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                        <div className="flex flex-wrap gap-6 text-gray-300">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-emerald-400" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-emerald-400" />
                                <span>{event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-emerald-400" />
                                <span>{event.attendees} registered</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {event.location && (
                            <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10">
                                <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Location</h3>
                                    <p className="text-gray-400">{event.location}</p>
                                </div>
                            </div>
                        )}

                        {event.speaker && (
                            <div className="flex items-start gap-3 mb-6 p-4 rounded-xl bg-slate-800/50 border border-emerald-500/10">
                                <User className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-white mb-1">Speaker</h3>
                                    <p className="text-gray-400">{event.speaker}</p>
                                </div>
                            </div>
                        )}

                        {event.description && (
                            <div className="mb-8">
                                <h3 className="font-semibold text-white text-lg mb-3">About this Event</h3>
                                <p className="text-gray-400 leading-relaxed">{event.description}</p>
                            </div>
                        )}

                        {/* Register Button */}
                        {registered ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex items-center justify-center gap-3 py-4 px-8 bg-emerald-500/20 rounded-xl border border-emerald-400"
                            >
                                <Check className="w-6 h-6 text-emerald-400" />
                                <span className="text-emerald-400 font-semibold text-lg">You're registered for this event!</span>
                            </motion.div>
                        ) : (
                            <button
                                onClick={() => setShowRegisterModal(true)}
                                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-xl font-bold text-slate-950 text-lg hover:shadow-lg hover:shadow-emerald-500/30 transition-all transform hover:scale-[1.02]"
                            >
                                Register for this Event
                            </button>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Register Modal */}
            {showRegisterModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setShowRegisterModal(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 w-full max-w-md"
                    >
                        <h2 className="text-2xl font-bold mb-6">Register for {event.title}</h2>
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label className="block text-gray-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    required
                                    value={registerForm.name}
                                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-400"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    required
                                    value={registerForm.email}
                                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-emerald-500/20 text-white focus:outline-none focus:border-emerald-400"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowRegisterModal(false)}
                                    className="flex-1 py-3 border border-gray-600 text-gray-300 rounded-xl hover:bg-slate-800 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 py-3 bg-emerald-500 text-slate-950 rounded-xl font-semibold hover:bg-emerald-600 transition-colors disabled:opacity-50"
                                >
                                    {submitting ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
