import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

export default function EventsPage() {
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

                {/* Coming Soon Message */}
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
                    <div className="mt-8">
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="inline-block px-6 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-sm font-medium"
                        >
                            Coming Soon
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
