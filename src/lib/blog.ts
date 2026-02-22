import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

export interface doPost {
    slug: string;
    frontmatter: {
        title: string;
        date: string;
        author: string;
        excerpt: string;
        tags?: string[];
    };
    content: string;
}

export function getAllPosts(): doPost[] {
    if (!fs.existsSync(contentDirectory)) return [];

    const files = fs.readdirSync(contentDirectory);
    const posts = files.map((filename) => {
        const slug = filename.replace(".md", "");
        const markdownWithMeta = fs.readFileSync(
            path.join(contentDirectory, filename),
            "utf-8"
        );
        const { data: frontmatter, content } = matter(markdownWithMeta);
        return {
            slug,
            frontmatter: frontmatter as doPost["frontmatter"],
            content,
        };
    });

    return posts.sort((a, b) => {
        return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
    });
}

export function getPostBySlug(slug: string): doPost | null {
    const decodedSlug = decodeURIComponent(slug);
    const fullPath = path.join(contentDirectory, `${decodedSlug}.md`);
    if (!fs.existsSync(fullPath)) return null;

    const markdownWithMeta = fs.readFileSync(fullPath, "utf-8");
    const { data: frontmatter, content } = matter(markdownWithMeta);

    return {
        slug,
        frontmatter: frontmatter as doPost["frontmatter"],
        content,
    };
}
