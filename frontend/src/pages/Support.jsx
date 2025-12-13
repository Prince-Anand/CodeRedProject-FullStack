import { useState } from 'react';
import { HelpCircle, FileText, MessageCircle, Send } from 'lucide-react';

const Support = () => {
    const [ticket, setTicket] = useState({ subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Ticket submitted! We will get back to you shortly.');
        setTicket({ subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[var(--color-background)] py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-[var(--color-primary)] font-serif sm:text-4xl">How can we help you?</h1>
                    <p className="mt-4 text-lg text-slate-600">
                        Browse our documentation, read FAQs, or contact our support team.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="card p-6 text-center hover:-translate-y-1 transition-transform duration-200">
                        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-secondary)]/20 text-[var(--color-secondary)] mb-4">
                            <FileText className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Documentation</h3>
                        <p className="text-slate-500 mb-4">Detailed guides and API references.</p>
                        <button className="text-[var(--color-secondary)] font-medium hover:text-[var(--color-primary)]">Browse Docs &rarr;</button>
                    </div>
                    <div className="card p-6 text-center hover:-translate-y-1 transition-transform duration-200">
                        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] mb-4">
                            <HelpCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">FAQs</h3>
                        <p className="text-slate-500 mb-4">Answers to common questions.</p>
                        <button className="text-[var(--color-secondary)] font-medium hover:text-[var(--color-primary)]">View FAQs &rarr;</button>
                    </div>
                    <div className="card p-6 text-center hover:-translate-y-1 transition-transform duration-200">
                        <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
                            <MessageCircle className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-2">Live Chat</h3>
                        <p className="text-slate-500 mb-4">Chat with our support team.</p>
                        <button className="text-[var(--color-secondary)] font-medium hover:text-[var(--color-primary)]">Start Chat &rarr;</button>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    <div className="bg-[var(--color-primary)] px-6 py-4">
                        <h2 className="text-xl font-bold text-white">Submit a Ticket</h2>
                        <p className="text-primary-100 text-sm">We typically respond within 24 hours.</p>
                    </div>
                    <div className="p-6 md:p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-slate-700">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    className="mt-1 input-field"
                                    placeholder="Brief description of the issue"
                                    value={ticket.subject}
                                    onChange={(e) => setTicket({ ...ticket, subject: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    rows={4}
                                    className="mt-1 input-field"
                                    placeholder="Describe your issue in detail..."
                                    value={ticket.message}
                                    onChange={(e) => setTicket({ ...ticket, message: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="btn btn-primary flex items-center shadow-md">
                                    <Send className="h-4 w-4 mr-2" />
                                    Submit Ticket
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Support;
