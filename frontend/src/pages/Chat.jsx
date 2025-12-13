import { useState } from 'react';
import { Send, MoreVertical, Phone, Video } from 'lucide-react';

const Chat = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'Hi, I am interested in your job posting.', sender: 'agent', time: '10:00 AM' },
        { id: 2, text: 'Great! Can you share your portfolio?', sender: 'employer', time: '10:05 AM' },
        { id: 3, text: 'Sure, here is the link...', sender: 'agent', time: '10:06 AM' },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSend = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;
        setMessages([...messages, { id: Date.now(), text: newMessage, sender: 'employer', time: 'Now' }]);
        setNewMessage('');
    };

    return (
        <div className="flex h-[calc(100vh-5rem)] bg-[var(--color-background)]">
            {/* Sidebar */}
            <div className="w-80 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-[var(--color-primary)] font-serif">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3].map((chat) => (
                        <div key={chat} className="p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                            <div className="flex items-center">
                                <div className="h-10 w-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                                    JS
                                </div>
                                <div className="ml-3 flex-1">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="text-sm font-semibold text-[var(--color-primary)]">John Smith</h3>
                                        <span className="text-xs text-slate-400">10:06 AM</span>
                                    </div>
                                    <p className="text-sm text-slate-500 truncate">Sure, here is the link...</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50">
                {/* Chat Header */}
                <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center shadow-sm">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold">
                            JS
                        </div>
                        <div className="ml-3">
                            <h3 className="text-lg font-semibold text-[var(--color-primary)]">John Smith</h3>
                            <span className="text-xs text-[var(--color-secondary)] flex items-center">
                                <span className="h-2 w-2 rounded-full bg-green-500 mr-1"></span>
                                Online
                            </span>
                        </div>
                    </div>
                    <div className="flex space-x-2 text-slate-400">
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Phone className="h-5 w-5" /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Video className="h-5 w-5" /></button>
                        <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><MoreVertical className="h-5 w-5" /></button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'employer' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-md px-4 py-2 rounded-2xl shadow-sm ${msg.sender === 'employer'
                                        ? 'bg-[var(--color-primary)] text-white rounded-br-none'
                                        : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
                                    }`}
                            >
                                <p>{msg.text}</p>
                                <p className={`text-xs mt-1 text-right ${msg.sender === 'employer' ? 'text-[var(--color-secondary)]/80' : 'text-slate-400'}`}>
                                    {msg.time}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200">
                    <form onSubmit={handleSend} className="flex space-x-4">
                        <input
                            type="text"
                            className="flex-1 input-field rounded-full"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="p-3 bg-[var(--color-primary)] text-white rounded-full hover:bg-[var(--color-primary-light)] transition-colors shadow-md"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Chat;
