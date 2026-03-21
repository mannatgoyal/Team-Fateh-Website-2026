"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, Download, RefreshCcw } from "lucide-react";

export default function Photobooth({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const [stream, setStream] = useState<MediaStream | null>(null);
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Initialize Camera
    useEffect(() => {
        if (isOpen && !capturedImage) {
            startCamera();
        }

        return () => {
            stopCamera();
        };
    }, [isOpen]);

    const startCamera = async () => {
        setError("");
        setIsLoading(true);
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } },
                audio: false
            });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (err) {
            console.error("Camera error:", err);
            setError("Unable to access camera. Please check permissions.");
        } finally {
            setIsLoading(false);
        }
    };

    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const takePhoto = () => {
        if (!videoRef.current || !canvasRef.current) return;

        const video = videoRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        // Set canvas to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // 1. Draw the video frame (mirror horizontally since front camera is usually mirrored)
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Reset transform for overlays
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        // 2. F1-Style "Broadcast" Aesthetic Filter
        // Soft vignette to focus the center
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, canvas.height * 0.4,
            canvas.width / 2, canvas.height / 2, canvas.height * 0.9
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 20, 0.6)"); // Dark blue/black edge
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // High contrast / slight warm tint
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = "rgba(255, 120, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";

        // Thin elegant frame line
        ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
        ctx.lineWidth = 1;
        ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

        // 3. F1 Broadcast Style Graphic (Bottom Left)
        const drawTextOverlays = () => {
            const startX = 60;
            const startY = canvas.height - 120;

            // F1 slanted block
            ctx.fillStyle = "#E63946"; // Fateh red/primary
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(startX + 300, startY);
            ctx.lineTo(startX + 280, startY + 45);
            ctx.lineTo(startX - 20, startY + 45);
            ctx.fill();

            // Slashed accent
            ctx.fillStyle = "#ffffff";
            ctx.beginPath();
            ctx.moveTo(startX + 310, startY);
            ctx.lineTo(startX + 330, startY);
            ctx.lineTo(startX + 310, startY + 45);
            ctx.lineTo(startX + 290, startY + 45);
            ctx.fill();

            // Text inside block
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 28px 'Inter', 'Helvetica Neue', sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("TEAM FATEH", startX + 15, startY + 32);

            // Subtitle exactly below block
            ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
            ctx.font = "600 16px 'Inter', monospace, sans-serif";
            ctx.letterSpacing = "2px";
            ctx.fillText("ENGINEERING CORE // 2026", startX, startY + 70);

            // Top right corner target minimal UI
            ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
            ctx.fillRect(canvas.width - 60, 60, 20, 2);
            ctx.fillRect(canvas.width - 60, 60, 2, 20);
            
            // Subtle Grid
            ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.stroke();
        };

        const logo = new Image();
        logo.src = "/images/logoW.png";

        logo.onload = () => {
            const logoWidth = 140; // Smaller, more tasteful
            const aspectRatio = logo.naturalHeight / logo.naturalWidth;
            const logoHeight = logoWidth * aspectRatio;
            
            ctx.globalAlpha = 0.9;
            ctx.drawImage(logo, canvas.width - logoWidth - 60, canvas.height - logoHeight - 60, logoWidth, logoHeight);
            ctx.globalAlpha = 1.0;

            drawTextOverlays();

            setCapturedImage(canvas.toDataURL("image/png"));
            stopCamera();
        };

        // Fallback
        logo.onerror = () => {
            drawTextOverlays();
            setCapturedImage(canvas.toDataURL("image/png"));
            stopCamera();
        };
    };

    const retakePhoto = () => {
        setCapturedImage(null);
        startCamera();
    };

    const downloadPhoto = () => {
        if (!capturedImage) return;
        const a = document.createElement("a");
        a.href = capturedImage;
        a.download = `fateh-booth-${new Date().getTime()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-center p-4 backdrop-blur-md"
            >
                {/* Hidden canvas for drawing */}
                <canvas ref={canvasRef} className="hidden" />

                <button
                    onClick={() => { stopCamera(); onClose(); }}
                    className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-2"
                >
                    <X size={32} />
                </button>

                <div className="w-full max-w-4xl flex flex-col items-center">

                    <div className="text-center mb-6">
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-primary tracking-wider uppercase drop-shadow-lg">
                            Fateh Photobooth
                        </h2>
                        <p className="text-white/60 font-mono text-sm tracking-widest uppercase mt-2">
                            Capture your race day look
                        </p>
                    </div>

                    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden border-2 border-white/10 shadow-2xl mb-8">

                        {isLoading && !capturedImage && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-primary font-mono animate-pulse">
                                <Camera size={48} className="mb-4" />
                                <p>INITIALIZING OPTICS...</p>
                            </div>
                        )}

                        {error && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-red-500 font-mono text-center p-8">
                                <X size={48} className="mb-4" />
                                <p>{error}</p>
                            </div>
                        )}

                        {!capturedImage ? (
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                muted
                                className="w-full h-full object-cover scale-x-[-1]" // Mirror
                            />
                        ) : (
                            <img
                                src={capturedImage}
                                alt="Captured"
                                className="w-full h-full object-cover"
                            />
                        )}

                        {/* Scanner effect overlay when live */}
                        {!capturedImage && !error && stream && (
                            <div className="absolute inset-0 pointer-events-none border-[8px] border-primary/20 mix-blend-overlay">
                                <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-primary" />
                                <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-primary" />
                                <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-primary" />
                                <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-primary" />
                                {/* Scanning line */}
                                <motion.div
                                    animate={{ y: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-full h-1 bg-primary/30 shadow-[0_0_20px_rgba(255,165,31,0.5)]"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        {!capturedImage && !error && stream && (
                            <button
                                onClick={takePhoto}
                                className="flex items-center gap-3 bg-white text-black font-bold text-lg px-8 py-4 rounded-full uppercase tracking-widest hover:bg-primary transition-colors shadow-lg shadow-primary/20 hover:scale-105 active:scale-95"
                            >
                                <Camera size={24} /> Snap Photo
                            </button>
                        )}

                        {capturedImage && (
                            <>
                                <button
                                    onClick={retakePhoto}
                                    className="flex items-center gap-2 border border-white/30 text-white font-bold px-6 py-3 rounded-full uppercase tracking-widest hover:bg-white/10 transition-colors"
                                >
                                    <RefreshCcw size={18} /> Retake
                                </button>
                                <button
                                    onClick={downloadPhoto}
                                    className="flex items-center gap-2 bg-primary text-black font-bold px-8 py-3 rounded-full uppercase tracking-widest hover:bg-white transition-colors shadow-[0_0_15px_rgba(255,165,31,0.4)] hover:scale-105 active:scale-95"
                                >
                                    <Download size={18} /> Download
                                </button>
                            </>
                        )}
                    </div>

                </div>
            </motion.div>
        </AnimatePresence>
    );
}
