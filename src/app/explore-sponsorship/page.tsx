"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download, Eye, Users, Cpu, FileText, CheckCircle2, XCircle, Instagram, Linkedin } from "lucide-react";
import SponsorDecisionEngine from "@/components/ui/SponsorDecisionEngine";

export default function ExploreSponsorshipPage() {
    // Shared animation variants
    const fadeUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden pt-[114px]">
            
            {/* 1. Hero Section */}
            <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image / Overlay */}
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/Gallery/action_1.jpg" // Using an existing gallery image as a placeholder for the cinematic car shot
                        alt="Team Fateh Race Car"
                        fill
                        className="object-cover opacity-40 mix-blend-luminosity"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
                </div>

                <div className="container relative z-10 px-6 max-w-6xl mx-auto pt-20">
                    <motion.div 
                        initial="hidden" 
                        animate="visible" 
                        variants={staggerContainer}
                        className="max-w-4xl"
                    >
                        <motion.p variants={fadeUp} className="text-primary font-mono text-sm uppercase tracking-widest mb-6 border-l-2 border-primary pl-4">
                            Engineering Excellence that Defines the Indian Motorsport Future
                        </motion.p>
                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tight mb-8 uppercase">
                            Powering the Future<br />of Electric <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-300">Performance</span>
                        </motion.h1>
                        <motion.p variants={fadeUp} className="text-xl md:text-2xl text-slate-300 max-w-2xl mb-12 font-light">
                            Partner with Team Fateh EV — where engineering, motorsport, and innovation converge.
                        </motion.p>
                        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                            <Link href="/contact-sponsor" className="bg-primary hover:bg-primary-hover text-black font-bold uppercase tracking-wider px-8 py-4 rounded-sm flex items-center justify-center gap-2 transition-colors">
                                Partner With Us <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Sticky Navigation */}
            <div className="sticky top-[80px] z-50 bg-background/80 backdrop-blur-md border-y border-white/10 hidden md:block">
                <div className="container mx-auto max-w-6xl px-6 flex items-center justify-between py-4 text-xs font-mono uppercase tracking-widest text-slate-400">
                    <div className="flex gap-8">
                        <a href="#impact" className="hover:text-primary transition-colors">Impact</a>
                        <a href="#types" className="hover:text-primary transition-colors">Types of Support</a>
                        <a href="#achievements" className="hover:text-primary transition-colors">Achievements</a>
                        <a href="#tiers" className="hover:text-primary transition-colors">Tiers</a>
                    </div>
                    <Link href="/contact-sponsor" className="text-white hover:text-primary transition-colors flex items-center gap-1 font-bold">Partner With Us <ArrowRight size={14}/></Link>
                </div>
            </div>

            {/* 1.5 Interactive Decision Engine */}
            <section className="py-24 px-6 bg-background relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative z-20">
                    <SponsorDecisionEngine />
                </div>
            </section>

            {/* 2. Partner Impact */}
            <section id="impact" className="relative z-20 mt-12 px-6">
                <div className="container mx-auto max-w-6xl">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={staggerContainer}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {/* Card 1 */}
                        <motion.div variants={fadeUp} className="bg-slate-50 text-slate-900 p-8 shadow-xl border-t-4 border-[#0600EF]">
                            <div className="bg-[#0600EF]/10 w-12 h-12 flex items-center justify-center rounded-sm mb-6 text-[#0600EF]">
                                <Eye size={24} />
                            </div>
                            <h3 className="font-display font-bold text-xl uppercase mb-4">Brand Visibility</h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-sans">
                                Be seen by thousands of competitive engineering students at national motorsport events. Enhance your brand's engagement in the high-performance technology sector.
                            </p>
                        </motion.div>
                        
                        {/* Card 2 */}
                        <motion.div variants={fadeUp} className="bg-slate-50 text-slate-900 p-8 shadow-xl border-t-4 border-[#0600EF]">
                            <div className="bg-[#0600EF]/10 w-12 h-12 flex items-center justify-center rounded-sm mb-6 text-[#0600EF]">
                                <Users size={24} />
                            </div>
                            <h3 className="font-display font-bold text-xl uppercase mb-4">Talent Pipeline</h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-sans">
                                Direct access to the next generation of top-tier mechanical and electrical engineering talent pool nationwide for your company's recruitment.
                            </p>
                        </motion.div>

                        {/* Card 3 */}
                        <motion.div variants={fadeUp} className="bg-slate-50 text-slate-900 p-8 shadow-xl border-t-4 border-[#0600EF]">
                            <div className="bg-[#0600EF]/10 w-12 h-12 flex items-center justify-center rounded-sm mb-6 text-[#0600EF]">
                                <Cpu size={24} />
                            </div>
                            <h3 className="font-display font-bold text-xl uppercase mb-4">Technology Collaboration</h3>
                            <p className="text-sm leading-relaxed text-slate-600 font-sans">
                                A testbed for cutting edge products and components. Validate your technology at the absolute limits of motorsport electric performance.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* 2.5 Types of Sponsorship */}
            <section id="types" className="py-24 px-6 bg-[#0a0a0a] border-y border-white/5 mt-24">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-2">How You Can Partner</h2>
                        <p className="text-slate-400 font-mono text-sm uppercase">Tailored Collaborations for Mutual Success</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 p-8 border border-white/10 hover:border-primary transition-colors group">
                            <h3 className="font-display font-bold text-xl uppercase mb-4 text-white group-hover:text-primary transition-colors">Financial<br/>Support</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-sans">Direct monetary funding to support tournament registration fees, logistics, and critical manufacturing operations.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/5 p-8 border border-white/10 hover:border-primary transition-colors group">
                            <h3 className="font-display font-bold text-xl uppercase mb-4 text-white group-hover:text-primary transition-colors">In-Kind /<br/>Manufacturing</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-sans">Provision of physical components, materials, or precision machining services vital for the race car's assembly.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="bg-white/5 p-8 border border-white/10 hover:border-primary transition-colors group">
                            <h3 className="font-display font-bold text-xl uppercase mb-4 text-white group-hover:text-primary transition-colors">Technical<br/>Collaboration</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-sans">Software licenses, testing facilities, and engineering mentorship to enhance our computational and physical testing.</p>
                        </motion.div>
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="bg-white/5 p-8 border border-white/10 hover:border-primary transition-colors group">
                            <h3 className="font-display font-bold text-xl uppercase mb-4 text-white group-hover:text-primary transition-colors">Hybrid<br/>Partnership</h3>
                            <p className="text-sm text-slate-400 leading-relaxed font-sans">A custom mix of financial backing and technical or manufacturing support, creating comprehensive brand integration.</p>
                        </motion.div>
                    </div>
                </div>
            </section>            {/* 3. Metrics & Achievements Gallery */}
            <section id="achievements" className="py-32 px-6 bg-background">
                <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row gap-16 lg:gap-8 justify-between">
                    
                    {/* Left: Legacy */}
                    <div className="lg:w-1/2">
                        <motion.h2 
                            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-display font-bold uppercase leading-tight mb-12"
                        >
                            A Legacy Of<br />Technical<br />Excellence
                        </motion.h2>

                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="mb-8 border-l-4 border-[#0600EF] pl-6">
                            <div className="text-7xl md:text-8xl font-display font-bold text-[#0600EF] tracking-tighter leading-none mb-4">15+</div>
                            <div className="text-sm font-mono uppercase tracking-widest text-slate-400">Years of Engineering Legacy</div>
                        </motion.div>

                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-slate-300 leading-relaxed max-w-md">
                            For over a decade and a half, Team Fateh has been at the forefront of student motorsport—relentlessly pushing the limits of electric vehicle performance and sustainable engineering.
                        </motion.p>
                    </div>

                    {/* Right: Beige Box Alumni */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="lg:w-5/12 bg-[#F6F3DF] p-12 text-black flex flex-col justify-center relative shadow-2xl"
                    >
                        {/* Decorative dots pattern */}
                        <div className="absolute top-4 right-4 grid grid-cols-4 gap-1 opacity-20">
                            {[...Array(16)].map((_, i) => <div key={i} className="w-1 h-1 rounded-full bg-red-500" />)}
                        </div>

                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-8 border-b border-black/10 pb-4">Alumni Placed In</h4>
                        
                        <div className="grid grid-cols-2 gap-y-12 gap-x-8 font-display font-bold text-xl md:text-2xl uppercase tracking-wider text-slate-800">
                            <span>BOSCH</span>
                            <span>AON</span>
                            <span>MAHINDRA</span>
                            <span>TESLA</span>
                            <span>GABRIEL</span>
                            <span>ARM</span>
                            <span>AIR INDIA</span>
                        </div>
                    </motion.div>
                </div>

                {/* Achievements Image Grid - Integration of Uploaded Media */}
                <div className="container mx-auto max-w-6xl mt-24">
                    <p className="text-slate-400 font-mono text-sm uppercase mb-8 border-l-2 border-primary pl-4">Moments of Glory</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 relative h-80 rounded-sm overflow-hidden group">
                            <Image src="/images/Sponsorship/sponsor_fixed_1.jpg" alt="Team Fateh Track" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-sm uppercase tracking-widest text-primary font-bold drop-shadow-md">International Participation</span>
                            </div>
                        </div>
                        <div className="relative h-80 rounded-sm overflow-hidden group">
                            <Image src="/images/Sponsorship/sponsor_fixed_2.png" alt="Team Flag" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 object-top" />
                        </div>
                        <div className="relative h-80 rounded-sm overflow-hidden group">
                            <Image src="/images/Sponsorship/sponsor_fixed_3.jpg" alt="Trophy" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-sm uppercase tracking-widest text-primary font-bold drop-shadow-md">Podium Finish Ceremonies</span>
                            </div>
                        </div>
                        <div className="relative h-80 rounded-sm overflow-hidden group">
                            <Image src="/images/Sponsorship/sponsor_fixed_4.jpg" alt="Formula Bharat" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-sm uppercase tracking-widest text-primary font-bold drop-shadow-md">National Event Presence</span>
                            </div>
                        </div>
                        <div className="relative h-80 rounded-sm overflow-hidden group bg-slate-100">
                            <Image src="/images/Sponsorship/sponsor_fixed_5.jpg" alt="Invest India" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 object-top" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <span className="font-mono text-sm uppercase tracking-widest text-primary font-bold drop-shadow-md">Invest India Expo Showcase</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Cinematic Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden my-24 border-y border-white/10">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/Gallery/action_1.jpg" 
                        alt="Team Fateh Car On Track"
                        fill
                        className="object-cover opacity-30 mix-blend-luminosity grayscale"
                    />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
                
                <div className="container relative z-10 px-6 max-w-5xl mx-auto text-center">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl lg:text-7xl font-display font-bold uppercase tracking-tighter text-white drop-shadow-2xl"
                    >
                        We build more than race cars.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-white">We build engineers.</span>
                    </motion.h2>
                </div>
            </section>

            {/* 5. Team Section & 6. Core Innovation */}
            <section className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    
                    {/* Engineers. Builders. Racers. */}
                    <div className="flex flex-col md:flex-row gap-12 mb-32 items-center">
                        <div className="md:w-1/3">
                            <motion.h2 
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-5xl md:text-6xl font-display font-bold uppercase leading-none tracking-tighter"
                            >
                                A Story of<br />Obsession &<br />Victory.
                            </motion.h2>
                        </div>
                        <div className="md:w-2/3">
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-xl text-slate-300 font-light leading-relaxed max-w-2xl"
                            >
                                Behind every carbon fiber wing and high-voltage schematic is a team of obsessive student engineers. Through sleepless nights in the workshop and meticulous design iterations, our team represents a crucible of practical engineering excellence that defines the Indian motorsport narrative.
                            </motion.p>
                            
                            <div className="flex gap-6 mt-12">
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-48 w-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-500">
                                    <Image src="/images/Gallery/testing_1.jpg" alt="Team working" fill className="object-cover object-top" />
                                </motion.div>
                                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-48 w-full rounded-sm overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 hidden sm:block bg-slate-100">
                                    <Image src="/images/Gallery/design_1.jpg" alt="Engineering plans" fill className="object-cover" />
                                </motion.div>
                            </div>
                        </div>
                    </div>

                    {/* Core Innovation Matrix */}
                    <div className="mb-24">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-12 border-b border-white/10 pb-4">Core Innovation</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-l border-white/5 pl-6">
                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Powertrain</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    High efficiency dual motor configurations with custom designed planetary gear reduction stages for maximum track performance.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Battery Systems</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Self-developed cooling systems and 600V accumulator packs designed for high discharge ratios and operational boundary.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Data Acq</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Real-time telemetry streaming over CAN across a diverse physical matrix, utilizing predictive analytics for race strategy optimization.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Suspension</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Active damper control for optimal contact patch management.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Aerodynamics</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    CFD-optimized multi-element wing packages producing incredible downforce with high-efficiency drag ratios.
                                </p>
                            </motion.div>

                            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-4 group-hover:text-primary transition-colors">Composites</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    Ultra-lightweight prepreg carbon fiber consisting of various parts ensuring driver safety and immense torsional rigidity.
                                </p>
                            </motion.div>                        </div>
                    </div>

                </div>
            </section>

            {/* 7. Partnership Integration */}
            <section className="py-24 px-6 bg-[#111111]">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight mb-2">Partnership Integration</h2>
                    <p className="text-slate-400 font-mono text-sm uppercase mb-16">Representation of Brand on Car and Merch</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative h-[400px] bg-secondary/20 rounded-sm overflow-hidden flex items-center justify-center group flex-col">
                            {/* Represents Car Decal */}
                            <Image src="/images/Sponsorship/car_decal.png" alt="Car Decal" fill className="object-contain p-8 opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                            <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-slate-500 drop-shadow-md z-10 w-full text-left">Livery</span>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="relative h-[400px] bg-secondary/20 rounded-sm overflow-hidden flex items-center justify-center group flex-col">
                            {/* Represents Team Apparel */}
                            <Image src="/images/Sponsorship/team_apparel.png" alt="Team Apparel" fill className="object-contain p-8 opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105" />
                            <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-slate-500 drop-shadow-md z-10 w-full text-left">Official Jersey</span>
                        </motion.div>
                        
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="relative h-[400px] bg-secondary/20 rounded-sm overflow-hidden flex items-center justify-center group flex-col">
                            {/* Represents Digital Reach */}
                            <Image src="/images/Sponsorship/homepage.png" alt="Digital Reach" fill className="object-cover opacity-60 group-hover:opacity-100 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-center justify-center pointer-events-none group-hover:opacity-0 transition-opacity duration-500">
                                <span className="font-display font-bold text-2xl text-center uppercase text-white drop-shadow-md">Digital<br/>Reach</span>
                            </div>
                            <span className="absolute bottom-6 left-6 font-mono text-xs uppercase tracking-widest text-slate-500 drop-shadow-md z-10 w-full text-left">Website Homepage</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 7.5 Social Media Impact Experience */}
            <section className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden border-y border-white/5 text-white">
                {/* Ambient Glows */}
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="container mx-auto max-w-6xl relative z-10">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                        <div>
                            <motion.h2 
                                initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                                className="text-4xl md:text-6xl font-display font-bold uppercase tracking-tight mb-4 leading-none"
                            >
                                Digital<br/>Footprint
                            </motion.h2>
                            <p className="text-slate-400 font-mono text-sm uppercase border-l-2 border-primary pl-4">Unmatched Engagement Across Platforms</p>
                        </div>
                        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-slate-300 max-w-md text-sm leading-relaxed">
                            A sponsorship goes beyond the track. By partnering with us, your brand integrates into a thriving digital ecosystem of passionate engineering students, motorsport fans, and industry leaders.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Instagram Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            className="relative rounded-2xl overflow-hidden group bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/10 hover:border-pink-500/40 transition-all duration-500 shadow-2xl"
                        >
                            {/* Visual Header / Mockup Feed */}
                            <div className="h-64 flex gap-2 p-4 overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/10 via-transparent to-neutral-950 z-10"></div>
                                <motion.div animate={{ y: [0, -200] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex flex-col gap-2 w-1/3">
                                    <div className="h-32 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Gallery/action_1.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-40 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Gallery/testing_1.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-32 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Gallery/design_1.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                </motion.div>
                                <motion.div animate={{ y: [-150, 0] }} transition={{ repeat: Infinity, duration: 25, ease: "linear" }} className="flex flex-col gap-2 w-1/3 mt-8">
                                    <div className="h-40 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Sponsorship/sponsor_fixed_1.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-32 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Sponsorship/sponsor_fixed_2.png" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-40 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Sponsorship/sponsor_fixed_3.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                </motion.div>
                                <motion.div animate={{ y: [0, -250] }} transition={{ repeat: Infinity, duration: 22, ease: "linear" }} className="flex flex-col gap-2 w-1/3">
                                    <div className="h-32 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Sponsorship/sponsor_fixed_4.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-40 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Sponsorship/sponsor_fixed_5.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                    <div className="h-32 bg-slate-800 rounded relative overflow-hidden"><Image src="/images/Gallery/action_1.jpg" alt="Ig post" fill className="object-cover opacity-80" /></div>
                                </motion.div>
                            </div>

                            <div className="p-8 relative z-20 -mt-12">
                                <div className="flex justify-between items-end mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 rounded-2xl p-1 shadow-xl">
                                        <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center">
                                            <Instagram size={32} className="text-pink-500" />
                                        </div>
                                    </div>
                                    <a href="https://www.instagram.com/fateh_fsae" target="_blank" className="bg-white hover:bg-neutral-200 text-black text-xs font-bold font-mono uppercase px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                                        Follow <ArrowRight size={14} />
                                    </a>
                                </div>

                                <h3 className="text-2xl font-display font-bold uppercase tracking-tight mb-2">@fateh_fsae</h3>
                                <p className="text-slate-400 text-sm mb-6">A daily diary of our engineering journey, testing days, and podium finishes. Reaching the feeds of youth and enthusiasts worldwide.</p>

                                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6">
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold font-display text-white">Dedicated</div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Fanbase</div>
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold font-display text-white">Massive</div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Organic Reach</div>
                                    </div>
                                    <div>
                                        <div className="text-xl md:text-2xl font-bold font-display text-white">Gen Z</div>
                                        <div className="text-[10px] font-mono text-slate-500 uppercase mt-1">Core Demo</div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* LinkedIn Card */}
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                            className="relative rounded-2xl overflow-hidden group bg-gradient-to-br from-[#0077b5]/10 to-neutral-950 border border-white/10 hover:border-[#0077b5]/40 transition-all duration-500 shadow-2xl flex flex-col"
                        >
                            <div className="p-8 flex-1">
                                <div className="flex justify-between items-start mb-12">
                                    <div className="w-16 h-16 bg-[#0077b5] rounded-xl flex items-center justify-center shadow-xl">
                                        <Linkedin size={32} className="text-white" />
                                    </div>
                                    <a href="https://www.linkedin.com/company/13174539/admin/dashboard/" target="_blank" className="bg-[#0077b5] hover:bg-[#0077b5]/80 text-white text-xs font-bold font-mono uppercase px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                                        Connect <ArrowRight size={14} />
                                    </a>
                                </div>

                                <h3 className="text-3xl font-display font-bold uppercase tracking-tight mb-2">Team Fateh</h3>
                                <p className="text-[#0077b5] font-mono text-sm mb-6 uppercase tracking-widest">B2B & Professional Network</p>
                                
                                <p className="text-slate-300 text-sm mb-12 leading-relaxed">
                                    Our LinkedIn is a powerhouse of professional networking. We connect directly with top-tier companies, alumni leaders, and industry veterans. We highlight technical feats, design reports, and high-impact partnerships across the B2B sector.
                                </p>

                                <div className="grid grid-cols-2 gap-6 bg-black/30 p-6 rounded-xl border border-white/5">
                                    <div>
                                        <div className="text-2xl md:text-3xl font-bold font-display text-white">Extensive</div>
                                        <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Industry Network</div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="text-2xl md:text-3xl font-bold font-display text-green-400">High</div>
                                            <ArrowRight className="-rotate-45 text-green-400" size={20} />
                                        </div>
                                        <div className="text-[10px] font-mono text-slate-400 uppercase mt-1">Corporate Engagement</div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Decorative bottom bar mimicking a UI */}
                            <div className="bg-white/5 h-16 border-t border-white/10 px-8 flex items-center gap-4 text-slate-500 text-xs font-mono">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Connected with 50+ Top Automotive Brands
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 8. Sponsors Banner */}
            <section className="py-12 px-6 bg-[#F6F3DF]">
                <div className="container mx-auto max-w-6xl text-center">
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-8">Trusted by Industry Leaders</p>
                    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 font-display font-bold text-xl md:text-2xl text-slate-800">
                        <span>AUTODESK</span>
                        <span>ANSYS</span>
                        <span>ALTAIR</span>
                        <span>MATHWORKS</span>
                        <span>IPG</span>
                    </div>
                </div>
            </section>

            {/* 9. Partnership Tiers */}
            <section id="tiers" className="py-24 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-4">Partnership Tiers</h2>
                        <p className="text-slate-400 font-mono text-sm uppercase">Become our partner and help engineer the future of mobility</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-24">
                        {[
                            { name: "Title" },
                            { name: "Co-Title" },
                            { name: "Platinum" },
                            { name: "Gold" },
                            { name: "Silver" }
                        ].map((tier, i) => (
                            <motion.div 
                                key={tier.name}
                                initial={{ opacity: 0, y: 20 }} 
                                whileInView={{ opacity: 1, y: 0 }} 
                                viewport={{ once: true }} 
                                transition={{ delay: i * 0.1 }}
                                className="bg-white text-black p-6 flex flex-col justify-between h-32 border border-slate-200 shadow-xl"
                            >
                                <span className="text-[10px] font-mono tracking-widest uppercase text-slate-500">Tier 0{i+1}</span>
                                <div>
                                    <h3 className="font-display font-bold text-xl uppercase tracking-tight">{tier.name}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Matrix Table */}
                    <div className="overflow-x-auto mb-24">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/10 text-sm font-mono uppercase tracking-widest text-slate-400">
                                    <th className="py-4 px-4 font-normal">Category</th>
                                    <th className="py-4 px-4 font-normal text-center">Social Media</th>
                                    <th className="py-4 px-4 font-normal text-center">Website</th>
                                    <th className="py-4 px-4 font-normal text-center">Car</th>
                                    <th className="py-4 px-4 font-normal text-center">Tshirt</th>
                                    <th className="py-4 px-4 font-normal text-center">Event Banner</th>
                                </tr>
                            </thead>
                            <tbody className="font-sans text-sm">
                                {[
                                    { t: "Title", m: [true, true, true, true, true] },
                                    { t: "Co-Title", m: [true, true, true, true, true] },
                                    { t: "Platinum", m: [true, true, true, true, true] },
                                    { t: "Gold", m: [true, true, true, true, false] },
                                    { t: "Silver", m: [true, true, false, false, false] },
                                ].map((row, idx) => (
                                    <tr key={row.t} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 px-4 font-bold text-white">{row.t}</td>
                                        {row.m.map((val, i) => (
                                            <td key={i} className="py-4 px-4 text-center">
                                                {val ? <CheckCircle2 className="mx-auto text-green-500 w-5 h-5" /> : <XCircle className="mx-auto text-red-500/50 w-5 h-5" />}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Why Sponsor feature box */}
                    <div className="bg-[#1a1a1a] border border-white/10 p-8 md:p-12 flex flex-col md:flex-row gap-12 items-center">
                        <div className="md:w-1/3">
                            <h3 className="text-4xl md:text-5xl font-display font-bold uppercase text-primary leading-none tracking-tighter">Why<br/>Sponsor<br/>Team<br/>Fateh?</h3>
                        </div>
                        <div className="md:w-2/3 space-y-4">
                            <p className="flex items-start gap-3 text-slate-300">
                                <span className="text-primary mt-1">•</span>
                                <span><strong className="text-white">Brand Visibility:</strong> Exposure at national and international motorsport events, reaching thousands.</span>
                            </p>
                            <p className="flex items-start gap-3 text-slate-300">
                                <span className="text-primary mt-1">•</span>
                                <span><strong className="text-white">Talent Acquisition:</strong> Direct access to top engineering students for competitive recruitment.</span>
                            </p>
                            <p className="flex items-start gap-3 text-slate-300">
                                <span className="text-primary mt-1">•</span>
                                <span><strong className="text-white">Technology Collaboration:</strong> Opportunities to test, deploy, and integrate new innovations.</span>
                            </p>
                            <p className="flex items-start gap-3 text-slate-300">
                                <span className="text-primary mt-1">•</span>
                                <span><strong className="text-white">Networking & Media:</strong> Extensive coverage through active social media, press releases, and industry events.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
