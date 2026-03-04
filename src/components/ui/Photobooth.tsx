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

        // 2. High-Contrast Cinematic Filter
        ctx.fillStyle = "rgba(0, 5, 10, 0.4)"; // Deep cinematic dark tint
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Dynamic Vignette Radial Gradient
        const gradient = ctx.createRadialGradient(
            canvas.width / 2, canvas.height / 2, canvas.height * 0.2,
            canvas.width / 2, canvas.height / 2, canvas.height * 0.9
        );
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(1, "rgba(255, 165, 31, 0.35)"); // Primary color heavy edge tint
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 3. Tech/Racing Grid Pattern Overlay
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineWidth = 1;
        const gridSize = 60;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // 4. Bold Frame Border (like a racing ticket or polaroid)
        const framePadding = 20;
        ctx.strokeStyle = "rgba(255, 165, 31, 0.8)"; // Primary orange
        ctx.lineWidth = 8;
        ctx.strokeRect(framePadding, framePadding, canvas.width - (framePadding * 2), canvas.height - (framePadding * 2));

        // Inner white accent border
        ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
        ctx.lineWidth = 2;
        ctx.strokeRect(framePadding + 8, framePadding + 8, canvas.width - ((framePadding + 8) * 2), canvas.height - ((framePadding + 8) * 2));

        // 5. Draw Branding Overlays
        const logo = new Image();
        logo.src = "/images/logoW.png";

        const drawTextOverlays = () => {
            // Draw Text Top Left with heavy, premium styling
            const textPaddingY = framePadding + 60;
            const textPaddingX = framePadding + 40;

            ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
            ctx.shadowBlur = 15;
            ctx.fillStyle = "#FFA51F"; // Primary color
            ctx.font = "italic 900 48px 'Impact', 'Arial Black', sans-serif";
            ctx.textAlign = "left";
            ctx.fillText("TEAM FATEH RACING", textPaddingX, textPaddingY);

            ctx.fillStyle = "#FFFFFF";
            ctx.font = "bold 24px monospace";
            ctx.shadowBlur = 10;
            ctx.fillText("THAPAR INSTITUTE // PATIALA // EST. 2008", textPaddingX, textPaddingY + 40);

            // Decorative elements
            ctx.fillStyle = "rgba(255, 165, 31, 0.8)";
            ctx.fillRect(textPaddingX, textPaddingY + 60, Math.floor(canvas.width * 0.15), 4);

            // Timecode / Data (simulated telemetry)
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            ctx.font = "16px monospace";
            const dateStr = new Date().toISOString().replace('T', ' ').substring(0, 19) + "Z";
            ctx.fillText(`SYS.REC: ${dateStr}`, textPaddingX, textPaddingY + 90);
            ctx.fillText(`LOC: 30.3564° N, 76.3647° E`, textPaddingX, textPaddingY + 115);
        };

        logo.onload = () => {
            const logoWidth = 240; // Slightly larger logo
            const aspectRatio = logo.naturalHeight / logo.naturalWidth;
            const logoHeight = logoWidth * aspectRatio;
            const padding = framePadding + 30;

            ctx.shadowColor = "rgba(0,0,0,0.8)";
            ctx.shadowBlur = 20;
            ctx.drawImage(logo, canvas.width - logoWidth - padding, canvas.height - logoHeight - padding, logoWidth, logoHeight);

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
