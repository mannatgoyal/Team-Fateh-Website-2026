"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Instagram, MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useRef, useState } from "react";
import emailjs from '@emailjs/browser';

export default function ContactPage() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formRef.current) return;

        setIsSubmitting(true);
        setStatus("idle");

        const SERVICE_ID = "service_3zoetli";
        const TEMPLATE_ID = "template_02g2goc";
        const PUBLIC_KEY = "A7CfcGaLUPqm1nBwp";

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
                publicKey: PUBLIC_KEY,
            })
            .then(
                () => {
                    setStatus("success");
                    formRef.current?.reset();
                    setIsSubmitting(false);
                },
                (error) => {
                    console.error('FAILED...', error.text);
                    setStatus("error");
                    setErrorMessage(error.text || "Something went wrong. Please try again later.");
                    setIsSubmitting(false);
                },
            );
    };

    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground transition-colors duration-1000">
            <div className="container mx-auto max-w-6xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-200 transition-colors duration-500">
                        GET IN <span className="text-primary">TOUCH</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Whether you want to partner with us, join the team, or just talk racing—we&apos;re listening.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {/* Contact Info & Socials */}
                    <div className="space-y-12">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-colors duration-500">
                            <h3 className="text-2xl font-bold mb-6 text-secondary flex items-center gap-2">
                                <MapPin className="text-primary" /> HQ Location
                            </h3>
                            <p className="text-slate-600 leading-relaxed">
                                Thapar Institute of Engineering & Technology<br />
                                Bhadson Rd, Patiala,<br />
                                Punjab 147004, India
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <a href="mailto:team.fateh@thapar.edu" className="group p-6 bg-white rounded-xl border border-slate-100 hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-3 text-center">
                                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <Mail size={24} />
                                </div>
                                <span className="font-bold text-secondary">Email Us</span>
                                <span className="text-sm text-slate-500">team.fateh@thapar.edu</span>
                            </a>

                            <a href="https://linkedin.com/company/team-fateh" target="_blank" className="group p-6 bg-white rounded-xl border border-slate-100 hover:border-blue-600/50 transition-colors flex flex-col items-center justify-center gap-3 text-center">
                                <div className="w-12 h-12 bg-blue-50 text-[#0077b5] rounded-full flex items-center justify-center group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                                    <Linkedin size={24} />
                                </div>
                                <span className="font-bold text-secondary">LinkedIn</span>
                                <span className="text-sm text-slate-500">Professional Updates</span>
                            </a>

                            <a href="https://instagram.com/fateh_fsae" target="_blank" className="group p-6 bg-white rounded-xl border border-slate-100 hover:border-pink-500/50 transition-colors flex flex-col items-center justify-center gap-3 text-center sm:col-span-2">
                                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-full flex items-center justify-center group-hover:bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 group-hover:text-white transition-all">
                                    <Instagram size={24} />
                                </div>
                                <span className="font-bold text-secondary">Instagram</span>
                                <span className="text-sm text-slate-500">Behind the Scenes & Race Days</span>
                            </a>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden transition-all duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-colors duration-500" />

                        <h3 className="text-2xl font-bold mb-8 text-secondary relative z-10">Send a Message</h3>

                        <form ref={formRef} onSubmit={sendEmail} className="space-y-6 relative z-10">
                            {status === "success" && (
                                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                                    <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                    <p className="text-sm font-medium">Message sent successfully! We will get back to you soon.</p>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                                    <AlertCircle size={20} className="text-red-500 shrink-0" />
                                    <p className="text-sm font-medium">{errorMessage}</p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">First Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="firstName"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                                        placeholder="Aero"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="lastName"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                                        placeholder="Dynamics"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email</label>
                                <input
                                    required
                                    type="email"
                                    name="user_email"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                                    placeholder="aero@downforce.com"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    name="message"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-black"
                                    placeholder="Let's build a fast car..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
