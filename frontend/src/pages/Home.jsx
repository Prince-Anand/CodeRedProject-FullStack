import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Briefcase, Code, PenTool, Calculator } from 'lucide-react';
import FadeIn from '../components/common/FadeIn';
import heroIllustration from '../assets/hero-illustration.jpg';

const Home = () => {
    return (
        <div className="bg-[var(--color-background)]">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-12 lg:pt-24 lg:pb-20">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
                        <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-20 xl:col-span-6">
                            <FadeIn delay={100}>
                                <h1 className="text-4xl font-bold tracking-tight text-[var(--color-primary)] sm:text-6xl font-serif">
                                    Hire the Top 3% of <span className="text-[var(--color-secondary)]">Freelance Agents</span>
                                </h1>
                                <p className="mt-6 text-lg text-slate-600 leading-relaxed">
                                    Agnt. is an exclusive network of the top freelance agents, software developers, and finance experts. Top companies hire Agnt. freelancers for their most important projects.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                                    <Link
                                        to="/register"
                                        className="btn btn-primary text-lg px-8 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                    >
                                        Hire Top Talent
                                    </Link>
                                    <Link
                                        to="/register?role=agent"
                                        className="btn btn-outline text-lg px-8 py-3"
                                    >
                                        Apply as an Agent
                                    </Link>
                                </div>
                            </FadeIn>
                        </div>
                        {/* Hero Image */}
                        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
                            <FadeIn delay={300}>
                                <div className="aspect-[4/3] w-full rounded-2xl flex items-center justify-center relative">
                                    <img
                                        src={heroIllustration}
                                        alt="Team collaboration illustration"
                                        className="w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>

            {/* Trusted By Section */}
            <div className="py-12 border-y border-[var(--color-secondary)]/20 bg-[var(--color-secondary)]/5">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <FadeIn delay={200}>
                        <p className="text-center text-3xl font-bold font-serif text-[var(--color-primary-dark)] mb-8">
                            Trusted by leading brands and startups.
                        </p>
                        <div className="flex justify-center items-center gap-x-12 gap-y-8 flex-wrap grayscale opacity-60">
                            {/* Simulated Logos with Text */}
                            <span className="text-2xl font-bold font-sans text-slate-700 flex items-center gap-1"><span className="text-3xl">airbnb</span></span>
                            <span className="text-2xl font-bold font-serif text-slate-700">shopify</span>
                            <span className="text-2xl font-bold font-mono text-slate-700">duolingo</span>
                            <span className="text-2xl font-bold font-serif italic text-slate-700">Udemy</span>
                            <span className="text-2xl font-bold font-sans tracking-tighter text-slate-700">stripe</span>
                            <span className="text-2xl font-bold font-mono tracking-widest text-slate-700 flex items-center gap-1"><div className="w-4 h-4 rounded-full bg-slate-700"></div>twilio</span>
                        </div>
                    </FadeIn>
                </div>
            </div>

            {/* Browse Talent by Category Section */}
            <div className="py-24 bg-[var(--color-background)]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="max-w-2xl">
                        <FadeIn>
                            <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary-dark)] sm:text-4xl font-serif">
                                Browse Talent by Category.
                            </h2>
                        </FadeIn>
                    </div>
                    <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        {/* Developers Card */}
                        <FadeIn delay={100} className="h-full">
                            <div className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--color-secondary)]/20 relative group h-full">
                                <div>
                                    <div className="h-12 w-12 rounded-xl bg-[var(--color-secondary)]/20 flex items-center justify-center mb-6">
                                        <Code className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)]">Developers</h3>
                                    <p className="mt-2 text-slate-600">Python, React, Node.js, AWS, Go</p>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button className="h-10 w-10 rounded-full bg-[var(--color-primary-dark)] flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Designers Card */}
                        <FadeIn delay={200} className="h-full">
                            <div className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--color-secondary)]/20 relative group h-full">
                                <div>
                                    <div className="h-12 w-12 rounded-xl bg-[var(--color-secondary)]/20 flex items-center justify-center mb-6">
                                        <PenTool className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)]">Designers</h3>
                                    <p className="mt-2 text-slate-600">UI/UX, Product Design, Branding, Figma</p>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button className="h-10 w-10 rounded-full bg-[var(--color-primary-dark)] flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Finance Experts Card */}
                        <FadeIn delay={300} className="h-full">
                            <div className="flex flex-col justify-between p-8 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-[var(--color-secondary)]/20 relative group h-full">
                                <div>
                                    <div className="h-12 w-12 rounded-xl bg-[var(--color-secondary)]/20 flex items-center justify-center mb-6">
                                        <Calculator className="h-6 w-6 text-[var(--color-primary-dark)]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[var(--color-primary-dark)]">Finance Experts</h3>
                                    <p className="mt-2 text-slate-600">CFOs, Financial Modeling, Fundraising, Accounting</p>
                                </div>
                                <div className="mt-8 flex justify-end">
                                    <button className="h-10 w-10 rounded-full bg-[var(--color-primary-dark)] flex items-center justify-center text-white transform transition-transform group-hover:scale-110">
                                        <ArrowRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <FadeIn>
                            <h2 className="text-base font-semibold leading-7 text-[var(--color-secondary)] uppercase tracking-wide">Deploy faster</h2>
                            <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-primary)] sm:text-4xl font-serif">
                                Everything you need to hire the best
                            </p>
                            <p className="mt-6 text-lg leading-8 text-slate-600">
                                We rigorously screen our agents to ensure you only work with the best. Save time and money by hiring pre-vetted talent.
                            </p>
                        </FadeIn>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                            {[
                                {
                                    name: 'Rigorous Screening',
                                    description: 'Every applicant undergoes a strict screening process to verify their skills and experience.',
                                    icon: CheckCircle,
                                },
                                {
                                    name: 'Top Quality',
                                    description: 'We only accept the top 3% of applicants, ensuring you get world-class talent.',
                                    icon: Star,
                                },
                                {
                                    name: 'Fast Matching',
                                    description: 'Get matched with the perfect agent for your needs within 24 hours.',
                                    icon: ArrowRight,
                                },
                                {
                                    name: 'No Risk',
                                    description: 'Start with a trial period. If you are not satisfied, you do not pay.',
                                    icon: Briefcase,
                                },
                            ].map((feature, index) => (
                                <FadeIn key={feature.name} delay={index * 100}>
                                    <div className="relative pl-16">
                                        <dt className="text-base font-semibold leading-7 text-[var(--color-primary)]">
                                            <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-secondary)]/20">
                                                <feature.icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                                            </div>
                                            {feature.name}
                                        </dt>
                                        <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                                    </div>
                                </FadeIn>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-24 bg-[var(--color-background)]">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <FadeIn>
                        <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary-dark)] sm:text-4xl font-serif text-center mb-16">
                            What Our Clients Say.
                        </h2>
                    </FadeIn>
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Testimonial 1 */}
                        <FadeIn delay={100}>
                            <div className="bg-[#90a955]/30 p-8 rounded-2xl shadow-sm border border-[var(--color-secondary)]/20 h-full">
                                <p className="text-lg leading-relaxed font-medium mb-6 text-[var(--color-primary-dark)]">
                                    "Agnt. found us the perfect lead developer in 48 hours. Their vetting is real."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary-dark)]/10 flex items-center justify-center text-xl font-bold text-[var(--color-primary-dark)]">S</div>
                                    <div>
                                        <p className="font-bold text-[var(--color-primary-dark)]">Sarah J.</p>
                                        <p className="text-sm opacity-90 text-[var(--color-primary-dark)]">CTO at TechFlow</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Testimonial 2 */}
                        <FadeIn delay={200}>
                            <div className="bg-[#90a955]/30 p-8 rounded-2xl shadow-sm border border-[var(--color-secondary)]/20 h-full">
                                <p className="text-lg leading-relaxed font-medium mb-6 text-[var(--color-primary-dark)]">
                                    "We hired a full design team for our rebrand. The quality and speed were unmatched."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary-dark)]/10 flex items-center justify-center text-xl font-bold text-[var(--color-primary-dark)]">M</div>
                                    <div>
                                        <p className="font-bold text-[var(--color-primary-dark)]">Michael B.</p>
                                        <p className="text-sm opacity-90 text-[var(--color-primary-dark)]">CEO at Bloom</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Testimonial 3 */}
                        <FadeIn delay={300}>
                            <div className="bg-[#90a955]/30 p-8 rounded-2xl shadow-sm border border-[var(--color-secondary)]/20 h-full">
                                <p className="text-lg leading-relaxed font-medium mb-6 text-[var(--color-primary-dark)]">
                                    "Their finance experts helped us secure our Series A. Invaluable partners."
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="h-12 w-12 rounded-full bg-[var(--color-primary-dark)]/10 flex items-center justify-center text-xl font-bold text-[var(--color-primary-dark)]">E</div>
                                    <div>
                                        <p className="font-bold text-[var(--color-primary-dark)]">Emily R.</p>
                                        <p className="text-sm opacity-90 text-[var(--color-primary-dark)]">Founder at Apex</p>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 px-6 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <FadeIn delay={200}>
                        <div className="bg-[#90a955] rounded-3xl p-8 sm:p-16 text-center relative overflow-hidden shadow-xl">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-bold tracking-tight text-[var(--color-primary-dark)] sm:text-4xl font-serif mb-6">
                                    Ready to build your dream team?
                                </h2>
                                <p className="text-lg text-[var(--color-primary-dark)] mb-10 font-medium">
                                    Get matched with pre-vetted experts today.
                                </p>
                                <Link
                                    to="/register"
                                    className="inline-flex items-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Hire Top Talent <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
};

export default Home;
