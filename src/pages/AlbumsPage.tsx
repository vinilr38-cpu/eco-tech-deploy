import { motion } from 'framer-motion';
import { Image, Calendar } from 'lucide-react';

export default function AlbumsPage() {
    const albums = [
        {
            id: 1,
            title: "Chip to Crop",
            date: "October 2025",
            cover: "/images/chip.jpeg",
            photos: 20
        },

    ];

    return (
        <div className="pt-24 pb-16 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                        Photo Gallery
                    </h1>
                    <p className="text-xl text-gray-400">Capturing our journey towards a sustainable future</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {albums.map((album) => (
                        <motion.div
                            key={album.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer rounded-xl overflow-hidden border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-slate-900/40"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-60" />
                                <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs font-medium text-white bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                                    <Image className="w-3 h-3" />
                                    {album.photos}
                                </div>
                            </div>

                            <div className="p-5">
                                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">
                                    {album.title}
                                </h3>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                    <Calendar className="w-4 h-4" />
                                    <span>{album.date}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
