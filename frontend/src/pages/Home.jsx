import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Briefcase } from 'lucide-react';

const Home = () => {
    return (
        <div className="bg-[var(--color-background)]">
            {/* Hero Section */}
            <div className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
                        <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-20 xl:col-span-6">
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
                        </div>
                        {/* Hero Image Placeholder */}
                        <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
                            <div className="aspect-[4/3] w-full bg-[var(--color-secondary)]/20 rounded-2xl ring-1 ring-[var(--color-secondary)]/30 shadow-xl flex items-center justify-center overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/10"></div>
                                <span className="text-[var(--color-primary)] font-medium relative z-10">Hero Image / Illustration</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-[var(--color-secondary)] uppercase tracking-wide">Deploy faster</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-primary)] sm:text-4xl font-serif">
                            Everything you need to hire the best
                        </p>
                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            We rigorously screen our agents to ensure you only work with the best. Save time and money by hiring pre-vetted talent.
                        </p>
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
                            ].map((feature) => (
                                <div key={feature.name} className="relative pl-16">
                                    <dt className="text-base font-semibold leading-7 text-[var(--color-primary)]">
                                        <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-secondary)]/20">
                                            <feature.icon className="h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
                                        </div>
                                        {feature.name}
                                    </dt>
                                    <dd className="mt-2 text-base leading-7 text-slate-600">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
