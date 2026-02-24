import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft, MapPin, Clock, MessageSquare, ExternalLink } from 'lucide-react';
import { eventsApi, type Event } from '../services/api';
import InteractiveButton from '../components/InteractiveButton';

export default function EventDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            if (!id) return;
            try {
                setLoading(true);
                const response = await eventsApi.getById(parseInt(id));
                setEvent(response.data);
            } catch (err) {
                console.error('Error fetching event details:', err);
                setError('Event not found or failed to load.');
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    if (loading) {
        return (
            <div className="pt-24 pb-16 px-4 min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400"></div>
            </div>
        );
    }

    if (error || !event) {
        return (
            <div className="pt-24 pb-16 px-4 min-h-screen text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Error</h1>
                <p className="text-gray-400 mb-8">{error || 'Event not found'}</p>
                <Link to="/events">
                    <InteractiveButton>Back to Events</InteractiveButton>
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
                    className="bg-gradient-to-br from-emerald-900/20 to-slate-900/60 rounded-3xl border border-emerald-500/20 overflow-hidden"
                >
                    <div className="p-8 md:p-12">
                        <div className="flex flex-wrap gap-3 mb-6">
                            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                {event.category}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white leading-tight">
                            {event.title}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                                <Calendar className="w-6 h-6 text-emerald-400" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Date</p>
                                    <p className="text-white font-medium">
                                        {new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                                <Clock className="w-6 h-6 text-emerald-400" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Time</p>
                                    <p className="text-white font-medium">{event.time}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/40 border border-slate-700/50">
                                <MapPin className="w-6 h-6 text-emerald-400" />
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider">Venue</p>
                                    <p className="text-white font-medium">{event.location}</p>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-invert max-w-none mb-12">
                            <h2 className="text-2xl font-bold text-white mb-4">About Event</h2>
                            <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                                {event.longDescription || event.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-emerald-500/10">
                            {event.registrationLink && (
                                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <InteractiveButton className="w-full py-4 text-lg">
                                        Register Now <ExternalLink className="w-5 h-5 ml-2" />
                                    </InteractiveButton>
                                </a>
                            )}
                            {event.whatsappLink && (
                                <a href={event.whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1">
                                    <InteractiveButton variant="outline" className="w-full py-4 text-lg">
                                        Join WhatsApp Group <MessageSquare className="w-5 h-5 ml-2" />
                                    </InteractiveButton>
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
