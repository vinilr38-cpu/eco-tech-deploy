import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { Users, ChevronRight, Calendar, Folder, ArrowRight, Leaf } from 'lucide-react';
import { Link } from 'react-router-dom';
import { statsApi, type Stats } from '../services/api';
import InteractiveButton from '../components/InteractiveButton';

export default function HomePage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' },
        },
    };

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await statsApi.get();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSeg8znOxHmRNuXoV7wjP60tBGm0SGUjhImWETkB1L7l_yHZbQ/viewform?usp=sharing&ouid=113079983235534936552";

    return (
        <>
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                        className="absolute top-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
                    />
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                        className="absolute bottom-20 left-10 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
                    />
                </div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="text-center mb-12"
                    >
                        <motion.h1
                            variants={itemVariants}
                            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-400 bg-clip-text text-transparent"
                        >
                            We Don't Just Build Technology
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto"
                        >
                            We cultivate a world where innovation and nature thrive together.
                        </motion.p>

                        <motion.div
                            variants={itemVariants}
                            className="flex gap-6 justify-center flex-wrap"
                        >
                            <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                                <InteractiveButton>
                                    Join the Club Now <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </InteractiveButton>
                            </a>
                            <Link to="/projects">
                                <InteractiveButton variant="outline">
                                    Our Projects
                                </InteractiveButton>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        className="relative h-[480px] md:h-[650px] overflow-hidden rounded-[36px]
             bg-gradient-to-b from-slate-950 via-emerald-950/30 to-slate-950
             border border-emerald-400/15
             shadow-[0_0_120px_rgba(16,185,129,0.15)]"
                    >
                        <div className="absolute inset-0">
                            <div className="absolute bottom-0 left-0 right-0 h-2/3
                    bg-[radial-gradient(ellipse_at_bottom,rgba(16,185,129,0.35),transparent_70%)]" />
                        </div>

                        <motion.div
                            className="absolute bottom-0 left-[-20%] right-[-20%] h-[220px]
               bg-[linear-gradient(90deg,rgba(16,185,129,0.15),rgba(6,182,212,0.15),rgba(16,185,129,0.15))]
               blur-2xl"
                            animate={{ x: ["-10%", "10%", "-10%"] }}
                            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
                        />

                        <motion.div
                            className="absolute bottom-12 left-[-30%] right-[-30%] h-[160px]
               bg-[linear-gradient(90deg,rgba(6,182,212,0.12),rgba(16,185,129,0.12),rgba(6,182,212,0.12))]
               blur-3xl"
                            animate={{ x: ["10%", "-10%", "10%"] }}
                            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute bottom-0 h-[2px]
                  bg-gradient-to-r from-transparent via-emerald-400 to-transparent"
                                style={{
                                    left: `${10 + i * 15}%`,
                                    width: "140px",
                                }}
                                animate={{ opacity: [0.2, 1, 0.2], y: [0, -80, 0] }}
                                transition={{
                                    duration: 5 + i,
                                    repeat: Infinity,
                                    delay: i * 0.6,
                                    ease: "easeInOut",
                                }}
                            />
                        ))}

                        <div className="absolute inset-0 flex items-center justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1.2 }}
                                className="text-center max-w-2xl px-6"
                            >
                                <h1 className="text-4xl md:text-6xl font-bold leading-tight
                     bg-gradient-to-r from-emerald-300 via-cyan-300 to-emerald-300
                     bg-clip-text text-transparent">
                                    Shaping the Future of Sustainable Technology
                                </h1>
                                <p className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed">
                                    EcoTech builds intelligent systems that balance innovation,
                                    efficiency, and environmental responsibility.
                                </p>
                                <motion.div
                                    className="mx-auto mt-8 h-[3px] w-28 rounded-full
                    bg-gradient-to-r from-emerald-400 to-cyan-400"
                                    animate={{ width: ["4rem", "7rem", "4rem"] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            {stats && !loading && (
                <section className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-6"
                        >
                            <div className="p-6 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 text-center">
                                <Calendar className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                <div className="text-3xl font-bold text-emerald-400">{stats.totalEvents}</div>
                                <div className="text-gray-400">Total Events</div>
                            </div>
                            <div className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-900/40 text-center">
                                <Folder className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                <div className="text-3xl font-bold text-cyan-400">{stats.activeProjects}</div>
                                <div className="text-gray-400">Active Projects</div>
                            </div>
                            <div className="p-6 rounded-xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40 text-center">
                                <Users className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                                <div className="text-3xl font-bold text-emerald-400">{stats.totalMembers}</div>
                                <div className="text-gray-400">Members</div>
                            </div>
                            <div className="p-6 rounded-xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-slate-900/40 text-center">
                                <Leaf className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                                <div className="text-3xl font-bold text-cyan-400">{stats.upcomingEvents}</div>
                                <div className="text-gray-400">Upcoming Events</div>
                            </div>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Upcoming Events Preview */}
            <section className="py-16 px-4 bg-gradient-to-b from-slate-950/50 to-emerald-950/30">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center mb-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">Upcoming Events</h2>
                            <p className="text-gray-400">Join us for workshops, talks, and hackathons</p>
                        </div>
                        <Link to="/events" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {loading ? (
                            <div className="col-span-full text-center py-10 text-emerald-400">Loading events...</div>
                        ) : stats && stats.upcomingEvents > 0 ? (
                            <div className="col-span-full">
                                {/* We can fetch the latest event here or just show a more specialized card */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="p-12 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-slate-900/40 text-center"
                                >
                                    <Calendar className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold mb-4">Registration Open!</h3>
                                    <p className="text-gray-300 text-lg max-w-lg mx-auto mb-6">
                                        Check out our upcoming events and be part of the change. Join us for an amazing journey into sustainable technology.
                                    </p>
                                    <Link to="/events">
                                        <InteractiveButton>
                                            View Upcoming Events <ArrowRight className="w-4 h-4" />
                                        </InteractiveButton>
                                    </Link>
                                </motion.div>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="col-span-full p-12 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-slate-900/40 text-center"
                            >
                                <Calendar className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                                <h3 className="text-2xl font-bold mb-4">Events Coming Soon</h3>
                                <p className="text-gray-400 max-w-lg mx-auto mb-6">
                                    We're planning some exciting workshops and hackathons. Stay tuned for updates on our next big event!
                                </p>
                                <Link to="/events">
                                    <InteractiveButton variant="outline">
                                        Notify Me
                                    </InteractiveButton>
                                </Link>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Active Projects Preview */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex justify-between items-center mb-8"
                    >
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-2">Active Projects</h2>
                            <p className="text-gray-400">Help us build solutions for a sustainable future</p>
                        </div>
                        <Link to="/projects" className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2">
                            View All <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="col-span-full p-12 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-slate-900/40 text-center"
                        >
                            <Folder className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold mb-4">Projects Coming Soon</h3>
                            <p className="text-gray-400 max-w-lg mx-auto mb-6">
                                Our team is currently ideating new projects to tackle environmental challenges. Check back soon to see what we're building!
                            </p>
                            <Link to="/projects">
                                <InteractiveButton variant="outline">
                                    See What's Brewing
                                </InteractiveButton>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Make an Impact?</h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of innovators working towards a sustainable future with technology
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg font-bold text-slate-950 hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                            >
                                Get Started Now
                            </motion.button>
                        </a>
                        <Link to="/contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 border-2 border-emerald-400 text-emerald-400 rounded-lg font-bold hover:bg-emerald-500/10 transition-all"
                            >
                                Contact Us
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </>
    );
}
