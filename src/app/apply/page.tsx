"use client";

import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useRef, useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import emailjs from '@emailjs/browser';

const availableRoles = [
    "Electronics Engineer",
    "High Voltage Engineer",
    "Graphic Designer",
    "Structures Engineer",
    "Composites Engineer",
    "Suspension Engineer",
    "Aerodynamics Engineer",
    "Marketing & Outreach",
    "Sponsorships Manager",
    "General / Spontaneous Application"
];

function ApplyForm() {
    const formRef = useRef<HTMLFormElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    
    const searchParams = useSearchParams();
    const roleParam = searchParams.get("role");
    const [selectedRole, setSelectedRole] = useState("General / Spontaneous Application");

    useEffect(() => {
        if (roleParam && availableRoles.includes(roleParam)) {
            setSelectedRole(roleParam);
        }
    }, [roleParam]);

    const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formRef.current) return;

        setIsSubmitting(true);
        setStatus("idle");

        const formData = new FormData(formRef.current);
        const originalMessage = formData.get("message") as string;
        formData.set("message", `[Applying for: ${selectedRole}]\n\n${originalMessage}`);

        const tempForm = document.createElement("form");
        for (const [key, value] of formData.entries()) {
            const input = document.createElement("input");
            input.type = "hidden";
            input.name = key;
            input.value = value as string;
            tempForm.appendChild(input);
        }

        const SERVICE_ID = "service_3zoetli";
        const TEMPLATE_ID = "template_02g2goc";
        const PUBLIC_KEY = "A7CfcGaLUPqm1nBwp";

        emailjs
            .sendForm(SERVICE_ID, TEMPLATE_ID, tempForm, {
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
        <form ref={formRef} onSubmit={sendEmail} className="space-y-6 relative z-10">
            {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3">
                    <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                    <p className="text-sm font-medium">Application sent successfully! We will get back to you soon.</p>
                </div>
            )}

            {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-500 shrink-0" />
                    <p className="text-sm font-medium">{errorMessage}</p>
                </div>
            )}

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Role / Department</label>
                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black appearance-none cursor-pointer"
                >
                    {availableRoles.map(role => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">First Name</label>
                    <input
                        required
                        type="text"
                        name="firstName"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                        placeholder="Enter first name"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Last Name</label>
                    <input
                        required
                        type="text"
                        name="lastName"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                        placeholder="Enter last name"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Email Address</label>
                <input
                    required
                    type="email"
                    name="user_email"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-black"
                    placeholder="your.name@student.domain.edu"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Pitch / Cover Letter</label>
                <textarea
                    required
                    rows={6}
                    name="message"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-black"
                    placeholder="Tell us about your experience, why you want to join, and link any relevant portfolios or GitHub/LinkedIn profiles..."
                ></textarea>
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary text-white font-bold py-4 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-widest"
            >
                {isSubmitting ? (
                    <>
                        Transmitting...
                        <Loader2 size={18} className="animate-spin" />
                    </>
                ) : (
                    <>
                        Submit Application
                        <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </button>
        </form>
    );
}

export default function ApplyPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-6 bg-background text-foreground transition-colors duration-1000">
            <div className="container mx-auto max-w-4xl relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-slate-200 transition-colors duration-500 uppercase">
                        JOIN THE <span className="text-primary">GRID</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Submit your application below. Let us know why you belong on Team Fateh.
                    </p>
                </motion.div>

                {/* Application Form */}
                <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-100 relative overflow-hidden transition-all duration-500">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -mr-8 -mt-8 transition-colors duration-500" />
                    <h3 className="text-2xl font-bold mb-8 text-secondary relative z-10">Your Application</h3>
                    <Suspense fallback={<div className="flex justify-center p-12 text-black"><Loader2 className="animate-spin w-8 h-8" /></div>}>
                        <ApplyForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
