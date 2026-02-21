import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { eventsApi, type Event } from '../services/api';

export default function EventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('All');

    const categories = ['All', 'Workshop', 'Hackathon', 'Talk', 'Meeting'];

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await eventsApi.getAll();
                setEvents(response.data);
                setFilteredEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        let filtered = events;

        if (searchTerm) {
            filtered = filtered.filter(event =>
                event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                event.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (categoryFilter !== 'All') {
            filtered = filtered.filter(event => event.category === categoryFilter);
        }

        setFilteredEvents(filtered);
    }, [searchTerm, categoryFilter, events]);

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                        Upcoming Events
                    </h1>
                    <p className="text-xl text-gray-400">
                        Join us for workshops, talks, hackathons, and more
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex flex-col md:flex-row gap-4 mb-8"
                >
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-800/50 border border-emerald-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-emerald-400 transition-colors"
                        />
                    </div>
                    <div className="flex gap-2 items-center">
                        <Filter className="text-gray-400 w-5 h-5" />
                        <div className="flex gap-2 flex-wrap">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setCategoryFilter(category)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${categoryFilter === category
                                            ? 'bg-emerald-500 text-slate-950'
                                            : 'bg-slate-800/50 text-gray-300 hover:bg-emerald-500/20 border border-emerald-500/20'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Events Grid */}
                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-400"></div>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                    >
                        <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">No events found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {filteredEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5, borderColor: '#34d399' }}
                                className="p-6 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 hover:from-emerald-900/40 hover:to-slate-900/60 transition-all duration-300"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                        <span className={`inline-block px-3 py-1 rounded-full text-sm ${event.category === 'Workshop' ? 'bg-emerald-500/20 text-emerald-300' :
                                                event.category === 'Hackathon' ? 'bg-purple-500/20 text-purple-300' :
                                                    event.category === 'Talk' ? 'bg-cyan-500/20 text-cyan-300' :
                                                        'bg-yellow-500/20 text-yellow-300'
                                            }`}>
                                            {event.category}
                                        </span>
                                    </div>
                                    <Calendar className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                                </div>

                                {event.description && (
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                                )}

                                <div className="space-y-2 text-gray-400 text-sm">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.time}</span>
                                    </div>
                                    {event.location && (
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4" />
                                        <span>{event.attendees} interested</span>
                                    </div>
                                </div>

                                <Link to={`/events/${event.id}`}>
                                    <button className="mt-4 w-full py-2 bg-emerald-500/10 border border-emerald-400 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-all font-medium">
                                        View Details & Register
                                    </button>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
