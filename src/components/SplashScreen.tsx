import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface SplashScreenProps {
    onComplete: () => void;
    videoSrc?: string;
}

export default function SplashScreen({ onComplete, videoSrc }: SplashScreenProps) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Total splash duration
        const splashTimer = setTimeout(() => {
            setFadeOut(true);
        }, 4000);

        // Redirect after fade-out
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 4800);

        return () => {
            clearTimeout(splashTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] bg-black overflow-hidden flex items-center justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: fadeOut ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >

            {/* Background video */}
            {videoSrc && (
                <motion.video
                    autoPlay
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 6, ease: "easeOut" }}
                >
                    <source src={videoSrc} type="video/mp4" />
                </motion.video>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-slate-950/80 to-black/70" />

            {/* Floating eco particles */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(18)].map((_, i) => (
                    <motion.span
                        key={i}
                        className="absolute w-2 h-2 bg-emerald-400/40 rounded-full"
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0,
                        }}
                        animate={{
                            y: "-30%",
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 6 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeOut",
                        }}
                    />
                ))}
            </div>

            {/* Logo */}
            <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.6, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
            >
                {/* Glow pulse */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-3xl bg-emerald-400/40"
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />

                <img
                    src="/logo.png"
                    alt="Eco Tech Logo"
                    className="relative w-44 h-44 object-contain"
                />
            </motion.div>
        </motion.div>
    );
}
