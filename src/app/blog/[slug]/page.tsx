import { getPostBySlug, getAllPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getPostBySlug(slug);

    if (!post) {
        return <div className="min-h-screen flex items-center justify-center text-white">Post not found</div>;
    }

    return (
        <article className="min-h-screen bg-background pb-20">
            {/* Header */}
            <header className="pt-32 pb-16 px-6 container mx-auto max-w-4xl">
                <div className="flex items-center gap-4 text-sm font-mono text-primary mb-6">
                    <span>{post.frontmatter.date}</span>
                    <span>{`//`}</span>
                    <span className="uppercase">{post.frontmatter.author}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold mb-8 leading-tight">
                    {post.frontmatter.title}
                </h1>
                <div className="flex gap-2 mb-12">
                    {post.frontmatter.tags?.map(tag => (
                        <span key={tag} className="text-xs font-mono border border-white/20 px-3 py-1 rounded-full text-muted-foreground uppercase">
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="h-[1px] w-full bg-white/20"></div>
            </header>

            {/* Content */}
            <div className="container mx-auto px-6 max-w-3xl prose prose-invert prose-headings:font-display prose-p:font-sans prose-pre:bg-secondary prose-pre:border prose-pre:border-white/10">
                <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                >
                    {post.content}
                </ReactMarkdown>
            </div>
        </article>
    );
}
