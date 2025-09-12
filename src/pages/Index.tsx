import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import RsvpForm from '@/components/RsvpForm';
import heroImage from '@/assets/baby-shower-evite-hero.png';

const Index = () => {
    const [isRsvpOpen, setIsRsvpOpen] = useState(false);

    return (
        <main className="min-h-screen bg-gradient-hero relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-overlay opacity-50"></div>

            {/* Hero Section */}
            <section className="relative">
                <div className="container mx-auto px-4 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Content */}
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="space-y-4">
                                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                                    Baby Shower
                                    <span className="block text-transparent bg-gradient-primary bg-clip-text">
                    Celebration
                  </span>
                                </h1>
                                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-medium">
                                    Welcoming our little prince with love and joy
                                </p>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    Join us for a magical celebration as we prepare to welcome our bundle of joy.
                                    Let's share this beautiful moment together with blessings, games, and wonderful memories.
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
                                        <span className="font-medium">11:30 AM onwards</span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-glass backdrop-blur-glass rounded-full px-4 py-2 border border-glass">
                                        <span className="font-medium">📍</span>
                                        <span className="font-medium">Ajax Community Centre</span>
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
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative animate-scale-in">
                            <div className="relative overflow-hidden rounded-3xl shadow-elegant">
                                <img
                                    src={heroImage}
                                    alt="Beautiful baby shower celebration with blue theme, baby carriage, and elegant decorations"
                                    className="w-full h-[400px] lg:h-[500px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                            </div>

                            {/* Floating Glass Card */}
                            <div className="absolute -bottom-6 -left-6 bg-glass backdrop-blur-glass rounded-2xl p-6 shadow-glass border border-glass">
                                <div className="flex items-center gap-3">
                                    <div className="w-4 h-4 rounded-full bg-gradient-primary animate-pulse"></div>
                                    <span className="font-semibold text-sm">Blessing our little prince 👶</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Decorative Elements */}
                <div className="absolute top-20 right-20 w-32 h-32 bg-primary-glow/20 rounded-full blur-xl animate-float"></div>
                <div className="absolute bottom-20 left-20 w-24 h-24 bg-accent/30 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 left-10 w-16 h-16 bg-primary-light/40 rounded-full blur-lg animate-float" style={{animationDelay: '2s'}}></div>
            </section>

            {/* Event Highlights */}
            <section className="py-16 lg:py-24 relative">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 animate-fade-in-up">
                        <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                            What to <span className="text-transparent bg-gradient-primary bg-clip-text">Expect</span>
                        </h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            A day filled with blessings, joy, and beautiful moments to celebrate our upcoming arrival
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🙏</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Bangle Ceremony</h3>
                            <p className="text-muted-foreground">
                                Traditional blessings and prayers for the baby's well-being and prosperity
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🎮</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Blessings & Photos</h3>
                            <p className="text-muted-foreground">
                                Guests capture memories with themed backdrops.
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🍽️</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Delicious Feast</h3>
                            <p className="text-muted-foreground">
                                Mouth-watering lunch with traditional favorites and special treats for everyone
                            </p>
                        </div>

                        <div className="group text-center space-y-4 p-6 bg-gradient-card backdrop-blur-glass rounded-3xl border border-glass shadow-soft hover:shadow-elegant transition-spring hover:scale-105">
                            <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mx-auto shadow-glow group-hover:shadow-glass transition-spring">
                                <span className="text-3xl">🎭</span>
                            </div>
                            <h3 className="text-xl font-bold text-primary">Special Performances</h3>
                            <p className="text-muted-foreground">
                                Live music, cultural performances, and entertainment to make the day memorable
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
