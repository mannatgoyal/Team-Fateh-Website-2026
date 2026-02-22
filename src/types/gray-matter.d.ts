declare module "gray-matter" {
    function matter(
        str: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options?: any
    ): {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data: { [key: string]: any };
        content: string;
        isEmpty: boolean;
        excerpt?: string;
    };
    export = matter;
}
