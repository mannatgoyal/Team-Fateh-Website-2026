import { Metadata } from "next";
import RacingLineTimeline from "@/components/visuals/RacingLineTimeline";

export const metadata: Metadata = {
    title: "About Us | Team Fateh",
    description: "The story of Team Fateh, Thapar Institute's Formula Student team since 2008.",
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 tracking-tight">
                        OUR <span className="text-primary">LEGACY</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto italic">
                        &quot;The Team Fateh Formula Racing Team represents Thapar Institute of Engineering and Technology entry into the Formula SAE collegiate design series, a competition sanctioned by the Society of Automotive Engineers. Team Fateh gets its name from the word Fateh which means &apos;Victory&apos;. Every year, we design, develop, build and race around the globe.&quot;
                    </p>
                </header>

                <div className="mb-32">
                    <RacingLineTimeline />
                </div>
            </div>
        </div>
    );
}
