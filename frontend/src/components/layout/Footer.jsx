import { Link } from 'react-router-dom';
import { Twitter, Youtube, Linkedin, Github, Instagram, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-[var(--color-primary-dark)] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <Link to="/" className="inline-block mb-6">
                            <span className="text-3xl font-black tracking-tighter text-white">
                                Agnt.
                            </span>
                        </Link>
                        <p className="text-slate-400 text-sm tracking-wide uppercase font-medium">
                            Talent is everywhere.<br />Opportunity is here.
                        </p>
                    </div>

                    {/* Links Columns */}
                    <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div>
                            <h3 className="text-[var(--color-secondary)] font-bold uppercase tracking-wider mb-6 text-sm">
                                Platform
                            </h3>
                            <ul className="space-y-4">
                                <li><Link to="/agents" className="text-slate-400 hover:text-white transition-colors text-sm">Find Agents</Link></li>
                                <li><Link to="/jobs" className="text-slate-400 hover:text-white transition-colors text-sm">Find Jobs</Link></li>
                                <li><Link to="/how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm">How it Works</Link></li>
                                <li><Link to="/pricing" className="text-slate-400 hover:text-white transition-colors text-sm">Pricing</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[var(--color-secondary)] font-bold uppercase tracking-wider mb-6 text-sm">
                                Company
                            </h3>
                            <ul className="space-y-4">
                                <li><Link to="/about" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</Link></li>
                                <li><Link to="/careers" className="text-slate-400 hover:text-white transition-colors text-sm">Careers</Link></li>
                                <li><Link to="/blog" className="text-slate-400 hover:text-white transition-colors text-sm">Blog</Link></li>
                                <li><Link to="/contact" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-[var(--color-secondary)] font-bold uppercase tracking-wider mb-6 text-sm">
                                Resources
                            </h3>
                            <ul className="space-y-4">
                                <li><Link to="/support" className="text-slate-400 hover:text-white transition-colors text-sm">Support</Link></li>
                                <li><Link to="/docs" className="text-slate-400 hover:text-white transition-colors text-sm">Documentation</Link></li>
                                <li><Link to="/community" className="text-slate-400 hover:text-white transition-colors text-sm">Community</Link></li>
                                <li><Link to="/terms" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Social Media Section */}
                <div className="flex flex-col items-center mb-16">
                    <h3 className="text-[var(--color-secondary)] font-bold uppercase tracking-wider mb-6 text-sm">
                        Follow Us
                    </h3>
                    <div className="flex space-x-6">
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group">
                            <Twitter className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group">
                            <Youtube className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group">
                            <Linkedin className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group">
                            <Github className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        </a>
                        <a href="#" className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-colors group">
                            <Instagram className="h-5 w-5 text-slate-400 group-hover:text-white" />
                        </a>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; 2025 Agnt. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 flex items-center">
                        Made with <Heart className="h-4 w-4 text-red-500 mx-1 fill-current" /> by <span className="text-[var(--color-secondary)] ml-1 font-medium">CodeRed Team</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
