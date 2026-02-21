import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';

export default function EventDetailPage() {
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
                    className="bg-gradient-to-br from-emerald-900/30 to-slate-900/50 rounded-2xl border border-emerald-500/20 overflow-hidden p-12 text-center"
                >
                    <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Calendar className="w-10 h-10 text-emerald-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-white">Event Details Coming Soon</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        We're still finalizing the details for our upcoming events.
                        Once finalized, you'll be able to see all the information and register here!
                    </p>
                    <Link to="/events">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-emerald-500 text-slate-950 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                        >
                            View All Events
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
