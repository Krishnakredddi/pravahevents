import React, { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import RsvpForm from '@/components/RsvpForm';

import hero1 from '@/assets/dussehra-hero.jpg';
import hero2 from '@/assets/durga_puja.jpg';
import hero3 from '@/assets/bathukamma.jpg';
import hero4 from '@/assets/garba.jpg';
import hero5 from '@/assets/dandiya.jpg';
import hero6 from '@/assets/sponsors.jpg';

const SLIDE_MS = 2500;                    // 1/2 second per image
const HERO_IMAGES = [hero1, hero2, hero3, hero4, hero5, hero6];

const Index: React.FC = () => {
    const [isRsvpOpen, setIsRsvpOpen] = useState(false);
    const [idx, setIdx] = useState(0);

    // Stable list for the slideshow
    const heroImages = useMemo(() => HERO_IMAGES, []);

    // Preload + rotate + respect reduced motion
    useEffect(() => {
        heroImages.forEach(src => { const img = new Image(); img.src = src; });

        const m = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (m.matches || heroImages.length <= 1) return;

        let timer = window.setInterval(() => {
            setIdx(i => (i + 1) % heroImages.length);
        }, SLIDE_MS);

        const onVis = () => {
            clearInterval(timer);
            if (!document.hidden) {
                timer = window.setInterval(() => {
                    setIdx(i => (i + 1) % heroImages.length);
                }, SLIDE_MS);
            }
        };
        document.addEventListener('visibilitychange', onVis);

        return () => {
            clearInterval(timer);
            document.removeEventListener('visibilitychange', onVis);
        };
    }, [heroImages]);

    return (
        <main className="min-h-screen bg-gradient-hero relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-overlay opacity-50" />

            {/* Hero Section */}
            <section className="relative">
                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image: cross-fade slideshow */}
                        <div className="relative animate-scale-in">
                            <div className="relative overflow-hidden rounded-3xl shadow-elegant h-[400px] lg:h-[500px]">
                                {heroImages.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`Dussehra Utsav hero ${i + 1}`}
                                        className={[
                                            'absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out',
                                            i === idx ? 'opacity-100' : 'opacity-0'
                                        ].join(' ')}
                                        style={{ willChange: 'opacity' }}
                                    />
                                ))}
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    Dussehra Utsav 2025
                                   {/* <span className="block text-transparent bg-gradient-primary bg-clip-text">
                    Celebration
                  </span>*/}
                                </h1>
                                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                                    Blessings, blossoms, and beats—one festive evening.
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Join us for a joyful Dussehra (Vijayadashami) celebration! We’ll begin with a traditional Pooja, gather around vibrant Bathukamma flower stacks,
                                    and end the night with high-energy Dandiya/Garba. Bring your family and friends for an evening of blessings, blossoms, and dance.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground">
                                    <div className="flex items-center gap-2 bg-glass backdrop-blur-glass rounded-full px-4 py-2 border border-glass">
                                        <span className="font-medium">📅</span>
                                        <span className="font-medium">September 26th, 2025</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-glass backdrop-blur-glass rounded-full px-4 py-2 border border-glass">
                                        <span className="font-medium">⏰</span>
                                        <span className="font-medium">5:30pm onwards</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-glass backdrop-blur-glass rounded-full px-4 py-2 border border-glass">
                                        <span className="font-medium">📍</span>
                                        <span className="font-medium">Heydenshore Pavilion</span>
                                    </div>
                                </div>

                                <Button
                                    variant="hero"
                                    size="lg"
                                    onClick={() => setIsRsvpOpen(true)}
                                    className="text-lg px-12 py-6 h-auto animate-float"
                                >
                                    RSVP Now ✨
                                </Button>
                                {/* Capacity note */}
                                <div
                                    className="mt-3 text-sm rounded-xl px-4 py-2 border
             bg-amber-50/90 border-amber-200 text-amber-800 flex items-start gap-2"
                                    role="note"
                                >
                                    <span aria-hidden>⚠️</span>
                                    <span className="text-muted-foreground">
    Capacity limited to <b>200</b> guests. Registration is <b>first-come, first-served</b>.
    Your RSVP should include <i>all guests in your party including children</i>.
  </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-float" />
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary-light/40 rounded-full blur-lg animate-float" style={{ animationDelay: '2s' }} />
            </section>


            {/* Event Highlights */}
            <section className="py-16 lg:py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            <span className="text-transparent bg-gradient-primary bg-clip-text">Events Highlights</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A day filled with blessings, joy, and beautiful moments to celebrate our upcoming arrival
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🪔 🔔</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Pooja</h3>
                            <p className="text-muted-foreground">
                                A collective prayer with mantras and aarti, seeking blessings for family and community.
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🌼 💐</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Bathukamma</h3>
                            <p className="text-muted-foreground">
                                Women and families gather around tiered flower stacks—symbolizing life and nature—singing folk songs in a circle. All are welcome to participate and learn.
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🍪 🍮</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Snacks & Refreshments</h3>
                            <p className="text-muted-foreground">
                                Mouth-watering snacks with traditional favorites and special treats for everyone
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">💃 🕺</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Dandiya/Garba</h3>
                            <p className="text-muted-foreground">
                                Joyful circle dances celebrating the goddess. We’ll teach simple steps; jump in at your own pace!
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* RSVP Form Modal */}
            <RsvpForm isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />

        </main>
    );
};

export default Index;

