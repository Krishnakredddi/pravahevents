import React, { useEffect, useState } from 'react';

const ConfettiAnimation: React.FC = () => {
    const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number; color: string }>>([]);

    useEffect(() => {
        const colors = ['#c9d6ff', '#89c2ff', '#005bea', '#e2e2e2', '#70c0e8', '#4a90e2'];
        const pieces = Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            delay: Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)]
        }));

        setConfetti(pieces);

        // Clean up after animation
        const timer = setTimeout(() => setConfetti([]), 4000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {confetti.map((piece) => (
                <div
                    key={piece.id}
                    className="absolute w-3 h-3 animate-confetti"
                    style={{
                        left: `${piece.left}%`,
                        backgroundColor: piece.color,
                        animationDelay: `${piece.delay}s`,
                        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                    }}
                />
            ))}
        </div>
    );
};

export default ConfettiAnimation;