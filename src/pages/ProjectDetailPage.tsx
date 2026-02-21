import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Folder, ArrowLeft } from 'lucide-react';

export default function ProjectDetailPage() {
    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <Link to="/projects" className="inline-flex items-center gap-2 text-gray-400 hover:text-cyan-400 mb-8">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Projects
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-cyan-900/30 to-slate-900/50 rounded-2xl border border-cyan-500/20 overflow-hidden p-12 text-center"
                >
                    <div className="w-20 h-20 bg-cyan-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Folder className="w-10 h-10 text-cyan-400" />
                    </div>
                    <h1 className="text-3xl font-bold mb-4 text-white">Project Details Coming Soon</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                        We're working hard on new projects and solutions.
                        Stay tuned for detailed project information, milestones, and ways to contribute!
                    </p>
                    <Link to="/projects">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-3 bg-cyan-500 text-slate-950 rounded-xl font-bold hover:bg-cyan-600 transition-colors"
                        >
                            View All Projects
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </div>
    );
}
