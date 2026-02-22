import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Terminal, Calendar, User, ArrowUpRight } from "lucide-react";

export default function BlogIndex() {
    const posts = getAllPosts();

    return (
        <div className="min-h-screen bg-background pb-20 pt-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <header className="mb-20 border-b border-white/10 pb-8">
                    <div className="flex items-center gap-3 text-primary font-mono text-sm uppercase tracking-widest mb-4">
                        <Terminal size={14} />
                        <span>Engineering Logs // Class 1 Restricted</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-display font-bold mb-6">
                        TECHNICAL <span className="text-primary">BRIEFS</span>
                    </h1>
                    <p className="font-mono text-muted-foreground max-w-2xl text-lg leading-relaxed">
                        Deep-dives into our engineering challenges. From Aerodynamics simulations to custom BMS architecture and High-Voltage systems.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} className="group block relative">
                            <article className="h-full flex flex-col">
                                {/* Technical Decorator */}
                                <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-primary/20 group-hover:bg-primary transition-colors duration-500" />

                                <div className="mb-6 flex justify-between items-start opacity-60 group-hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2 font-mono text-xs uppercase text-primary">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                        LOG_ID: {post.frontmatter.date.replace(/-/g, "")}
                                    </div>
                                    <ArrowUpRight size={20} className="text-white group-hover:text-primary transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                                </div>

                                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white group-hover:text-primary transition-colors leading-tight">
                                    {post.frontmatter.title}
                                </h2>

                                <p className="text-muted-foreground flex-grow mb-6 line-clamp-3 leading-relaxed">
                                    {post.frontmatter.excerpt}
                                </p>

                                <div className="flex items-center gap-6 mt-auto border-t border-white/5 pt-4">
                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
                                        <Calendar size={12} /> {post.frontmatter.date}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-500 uppercase">
                                        <User size={12} /> {post.frontmatter.author}
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {post.frontmatter.tags?.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded bg-secondary/30 text-primary/80 uppercase tracking-wider group-hover:border-primary/30 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
