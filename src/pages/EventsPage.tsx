import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsApi, type Event } from '../services/api';
import InteractiveButton from '../components/InteractiveButton';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await eventsApi.getAll();
                setEvents(response.data);
            } catch (err) {
                console.error('Error fetching events:', err);
                setError('Failed to load events. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                        Upcoming Events
                    </h1>
                    <p className="text-xl text-gray-400">
                        Join us for workshops, talks, hackathons, and more
                    </p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400"></div>
                    </div>
                ) : error ? (
                    <div className="text-center py-20 text-red-400 font-medium">{error}</div>
                ) : events.length === 0 ? (
                    /* Coming Soon Message if no events */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-center py-20 px-6 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-slate-900/40 backdrop-blur-sm"
                    >
                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Calendar className="w-10 h-10 text-emerald-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-white">Events Coming Soon</h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            We're currently planning some exciting events. Stay tuned for updates on workshops,
                            hackathons, and community meetups!
                        </p>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map((event) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5 }}
                                className="group p-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-slate-900/40 backdrop-blur-sm flex flex-col h-full"
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                        {event.category}
                                    </div>
                                    <div className="text-gray-500 text-sm">
                                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-emerald-400 transition-colors">
                                    {event.title}
                                </h3>
                                <p className="text-gray-400 mb-6 flex-grow line-clamp-3">
                                    {event.description}
                                </p>
                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <Clock className="w-4 h-4 text-emerald-400" />
                                        {event.time}
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-400 text-sm">
                                        <MapPin className="w-4 h-4 text-emerald-400" />
                                        {event.location}
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-emerald-500/10 mt-auto flex flex-col gap-4">
                                    <Link to={`/events/${event.id}`}>
                                        <InteractiveButton className="w-full">
                                            View Details <ArrowRight className="w-4 h-4" />
                                        </InteractiveButton>
                                    </Link>
                                    {event.registrationLink && (
                                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                                            <InteractiveButton variant="outline" className="w-full">
                                                Register Now
                                            </InteractiveButton>
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
