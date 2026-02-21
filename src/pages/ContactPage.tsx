import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">Get in Touch</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">Have questions about joining or want to collaborate? We'd love to hear from you!</p>
                </motion.div>

                <div className="max-w-2xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="grid gap-6"
                    >
                        {/* EMAIL */}
                        <div className="glass-card p-8 rounded-2xl border-emerald-500/10 text-center flex flex-col items-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                                <Mail className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Email Us</h3>
                            <p className="text-gray-400 text-lg mb-6">0001ecotech@gmail.com</p>
                            <a href="mailto:0001ecotech@gmail.com" className="btn-primary inline-block">
                                Send an email
                            </a>
                        </div>

                        {/* LOCATION */}
                        <div className="glass-card p-8 rounded-2xl border-cyan-500/10 text-center flex flex-col items-center">
                            <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 flex items-center justify-center mb-6">
                                <MapPin className="w-7 h-7 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Location</h3>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                                Presidency University, Itgalpur, Rajanakunte, Yelahanka, North Bengaluru, Karnataka - 560064
                            </p>
                        </div>

                        {/* HOURS */}
                        <div className="glass-card p-8 rounded-2xl border-emerald-500/10 text-center flex flex-col items-center">
                            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
                                <Clock className="w-7 h-7 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">Working Hours</h3>
                            <p className="text-gray-400 text-lg">Mon–Sat: 9AM – 9PM</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
