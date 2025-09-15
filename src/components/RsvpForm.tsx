import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CheckCircle, Clock, MapPin, Calendar, Plus } from 'lucide-react';
import ConfettiAnimation from './ConfettiAnimation';

interface RsvpFormProps {
    isOpen: boolean;
    onClose: () => void;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    guests: string;
    notes: string;
}

const WEB_APP_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL as string; // required

const RsvpForm: React.FC<RsvpFormProps> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        guests: '1',
        notes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleInputChange = (field: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Allow +, spaces, dashes, parentheses; 7-20 chars
        const phoneRegex = /^[+]?[\d\s\-().]{7,20}$/;

        return !!formData.name.trim()
            && emailRegex.test(formData.email)
            && phoneRegex.test(formData.phone);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        // Map "5+" to 5; otherwise numeric
        const guestCount =
            formData.guests === '5+' ? 5 : Math.max(1, Number(formData.guests || 1));

        const payload = {
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            guestCount,
            notes: formData.notes?.trim() || '',
            eventSlug: 'Dussera Utsav 2025',
            ua: typeof navigator !== 'undefined' ? navigator.userAgent : ''
        };

        try {
            setIsSubmitting(true);

            // IMPORTANT:
            // Use FormData and NO custom headers to avoid a CORS preflight.
            // Use mode: 'no-cors' — the request will be delivered to Apps Script,
            // but the response is opaque (we don’t read it). We optimistically show success.
            const fd = new FormData();
            fd.append('payload', JSON.stringify(payload));

            await fetch(WEB_APP_URL, {
                method: 'POST',
                body: fd,        // FormData with JSON string in "payload"
                mode: 'no-cors'  // no preflight, opaque response
            });

            setIsSubmitted(true);
        } catch (err) {
            console.error('RSVP submission error:', err);
            // If you want: show a fallback error UI here.
            // For this simple workflow, consider re-trying or asking the guest to contact you.
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', email: '', phone: '', guests: '1', notes: '' });
        setIsSubmitted(false);
        onClose();
    };

    const addToCalendar = (type: 'google' | 'outlook') => {
        // Toronto (EDT) Sep 28, 2025 11:30–16:00 => 15:30–20:00 UTC
        const startDate = '20250926T153000Z';
        const endDate = '20250926T200000Z';
        const title = 'Dussehra Utsav 2025';
        const details = 'Baby shower celebration—welcoming our little one with love and joy';
        const location = 'Heydenshore Bnaquet Hall, 589 Water St, Whitby, ON';

        if (type === 'google') {
            const googleUrl =
                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}` +
                `&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
            window.open(googleUrl, '_blank');
        } else {
            const outlookUrl =
                `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodeURIComponent(title)}` +
                `&startdt=${startDate}&enddt=${endDate}&body=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
            window.open(outlookUrl, '_blank');
        }
    };

    if (isSubmitted) {
        return (
            <>
                <ConfettiAnimation />
                <Dialog open={isOpen} onOpenChange={resetForm}>
                    <DialogContent className="max-w-lg bg-gradient-card backdrop-blur-glass border border-glass">
                        <div className="text-center py-8 animate-scale-in">
                            <CheckCircle className="mx-auto mb-6 h-20 w-20 text-primary animate-float" />
                            <h2 className="text-3xl font-bold mb-3 text-primary">Thank You! 🎉</h2>
                            <p className="text-lg text-muted-foreground mb-8 font-medium">
                                Thanks for RSVPing! We can’t wait to celebrate with you and share this magical moment together.
                            </p>

                            <Card className="shadow-glass bg-gradient-card backdrop-blur-glass border border-glass mb-6">
                                <CardHeader className="pb-4">
                                    <CardTitle className="text-xl text-primary">Event Details</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-4 p-3 bg-primary-light/20 rounded-xl">
                                        <Calendar className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div className="text-left">
                                            <p className="font-bold text-primary">Friday, September 26, 2025</p>
                                            <p className="text-sm text-muted-foreground">Mark your calendar! 📅</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 bg-accent-light/20 rounded-xl">
                                        <Clock className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div className="text-left">
                                            <p className="font-bold text-primary">05:30 PM – 11:00 PM</p>
                                            <p className="text-sm text-muted-foreground">Celebration begins! ⏰</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-3 bg-primary-light/20 rounded-xl">
                                        <MapPin className="h-6 w-6 text-primary flex-shrink-0" />
                                        <div className="text-left">
                                            <p className="font-bold text-primary">Heydenshore Banquet Hall</p>
                                            <p className="text-sm text-muted-foreground">589 Water St, Whitby, ON 📍</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <div className="space-y-3">
                                <p className="text-sm font-medium text-muted-foreground mb-3">Add to your calendar:</p>
                                <div className="flex gap-3 justify-center">
                                    <Button
                                        onClick={() => addToCalendar('google')}
                                        variant="outline"
                                        size="sm"
                                        className="bg-glass backdrop-blur-glass border-glass hover:shadow-soft transition-spring"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Google Calendar
                                    </Button>
                                    <Button
                                        onClick={() => addToCalendar('outlook')}
                                        variant="outline"
                                        size="sm"
                                        className="bg-glass backdrop-blur-glass border-glass hover:shadow-soft transition-spring"
                                    >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Outlook
                                    </Button>
                                </div>
                            </div>

                            <Button
                                onClick={resetForm}
                                className="mt-8 bg-gradient-primary hover:shadow-glow transition-spring px-8 py-3"
                                size="lg"
                            >
                                Perfect, Got It! ✨
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </>
        );
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-lg bg-gradient-card backdrop-blur-glass border border-glass animate-scale-in">
                <DialogHeader className="text-center pb-4">
                    <DialogTitle className="text-3xl font-bold text-primary">
                        Join the Celebration!
                    </DialogTitle>
                    <p className="text-muted-foreground mt-2">
                        We’d love to have you celebrate our little prince with us
                    </p>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-semibold text-primary">Full Name *</Label>
                        <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                            className="bg-glass backdrop-blur-glass border-glass transition-spring focus:shadow-soft focus:scale-105"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold text-primary">Email Address *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="bg-glass backdrop-blur-glass border-glass transition-spring focus:shadow-soft focus:scale-105"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-semibold text-primary">Phone Number *</Label>
                        <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+1 416 555 1234"
                            required
                            className="bg-glass backdrop-blur-glass border-glass transition-spring focus:shadow-soft focus:scale-105"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="guests" className="text-sm font-semibold text-primary">Number of Guests</Label>
                        <Select value={formData.guests} onValueChange={(value) => handleInputChange('guests', value)}>
                            <SelectTrigger className="bg-glass backdrop-blur-glass border-glass transition-spring focus:shadow-soft">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-card backdrop-blur-glass border-glass">
                                <SelectItem value="1">Just me (1 person)</SelectItem>
                                <SelectItem value="2">Me + 1 (2 people)</SelectItem>
                                <SelectItem value="3">Me + 2 (3 people)</SelectItem>
                                <SelectItem value="4">Me + 3 (4 people)</SelectItem>
                                <SelectItem value="5+">Family group (5+ people)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="notes" className="text-sm font-semibold text-primary">Special Notes (Optional)</Label>
                        <Textarea
                            id="notes"
                            value={formData.notes}
                            onChange={(e) => handleInputChange('notes', e.target.value)}
                            placeholder="Any special requirements, dietary restrictions, or messages..."
                            className="bg-glass backdrop-blur-glass border-glass transition-spring focus:shadow-soft resize-none"
                            rows={3}
                        />
                    </div>

                    <Button
                        type="submit"
                        disabled={!validateForm() || isSubmitting || !WEB_APP_URL}
                        className="w-full bg-gradient-primary hover:shadow-glow transition-spring disabled:opacity-50 disabled:cursor-not-allowed py-6 text-lg font-semibold"
                    >
                        {isSubmitting ? 'Submitting…' : 'Confirm My Attendance ✨'}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                        * Required fields - We'll send you event updates via email/SMS
                    </p>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default RsvpForm;
