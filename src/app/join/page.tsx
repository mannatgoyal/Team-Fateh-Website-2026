"use client";

import { motion } from "framer-motion";
import { ArrowRight, Cpu, Wind, Cog, Megaphone, Layers, Activity, Globe, Briefcase } from "lucide-react";
import Link from "next/link";

const positions = [
    {
        title: "Electronics Engineer",
        department: "Electronics",
        icon: <Wind size={32} />,
        type: "Technical",
        description: "Develop and test vehicle electronic systems."
    },
    {
        title: "High Voltage Engineer",
        department: "Powertrain",
        icon: <Cpu size={32} />,
        type: "Technical",
        description: "Manage battery and powertrain systems."
    },
    {
        title: "Graphic Designer",
        department: "Management",
        icon: <Megaphone size={32} />,
        type: "Non-Technical",
        description: "Create visual content and team branding."
    },
    {
        title: "Structures Engineer",
        department: "Structures",
        icon: <Cog size={32} />,
        type: "Technical",
        description: "Design and analyze the vehicle chassis structure."
    },
    {
        title: "Composites Engineer",
        department: "Composites",
        icon: <Layers size={32} />,
        type: "Technical",
        description: "Build lightweight carbon fiber parts."
    },
    {
        title: "Suspension Engineer",
        department: "Suspension",
        icon: <Activity size={32} />,
        type: "Technical",
        description: "Optimize vehicle dynamics and handling."
    },
    {
        title: "Aerodynamics Engineer",
        department: "Aerodynamics",
        icon: <Wind size={32} />,
        type: "Technical",
        description: "Design aero packages for overall performance."
    },
    {
        title: "Marketing & Outreach",
        department: "Management",
        icon: <Globe size={32} />,
        type: "Non-Technical",
        description: "Drive team marketing, events, and community outreach."
    },
    {
        title: "Sponsorships Manager",
        department: "Management",
        icon: <Briefcase size={32} />,
        type: "Non-Technical",
        description: "Secure and manage corporate partnerships and team funding."
    }
];

export default function JoinPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-5xl md:text-8xl font-display font-bold mb-6 text-slate-200"
                    >
                        BUILD THE <span className="text-primary">FUTURE</span>
                    </motion.h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        We are looking for obsessed problem-solvers. Whether you code, weld, design, or sell—there is a place for you on the grid.
                    </p>
                </div>

                {/* Roles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {positions.map((role, index) => (
                        <motion.div
                            key={role.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-primary">
                                {role.icon}
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${role.type === 'Technical' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                                    {role.type}
                                </span>
                                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">{role.department}</span>
                            </div>

                            <h3 className="text-2xl font-bold text-secondary mb-3 group-hover:text-primary transition-colors">{role.title}</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                {role.description}
                            </p>

                            <Link href={`/apply?role=${encodeURIComponent(role.title)}`} className="inline-flex items-center gap-2 font-bold text-secondary group-hover:gap-4 transition-all">
                                Apply Now <ArrowRight size={18} className="text-primary" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* General Application CTA */}
                <div className="mt-20 bg-secondary rounded-3xl p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/10" />
                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-4">Don&apos;t see your role?</h2>
                        <p className="text-slate-300 mb-8 max-w-xl mx-auto">
                            We are always looking for talent. If you think you have what it takes, send us your portfolio/CV directly.
                        </p>
                        <Link href="/apply?role=General%20%2F%20Spontaneous%20Application" className="px-8 py-4 bg-white text-secondary font-bold rounded-lg hover:bg-primary hover:text-white transition-colors">
                            Apply Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
