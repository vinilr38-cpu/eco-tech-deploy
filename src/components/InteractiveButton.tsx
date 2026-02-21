import * as React from 'react';
import { motion } from 'framer-motion';

interface InteractiveButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    variant?: 'primary' | 'outline';
}

export default function InteractiveButton({ children, onClick, className = '', variant = 'primary' }: InteractiveButtonProps) {
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        setPosition({ x: x * 0.3, y: y * 0.3 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const baseStyles = variant === 'primary' ? 'btn-primary' : 'btn-outline';

    return (
        <motion.button
            ref={buttonRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: 'spring', damping: 15, stiffness: 150 }}
            className={`${baseStyles} ${className} relative overflow-hidden group`}
        >
            <span className="relative z-10 flex items-center gap-2">
                {children}
            </span>

            {/* Hover Shine Effect */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full duration-1000 transition-transform"
            />
        </motion.button>
    );
}
