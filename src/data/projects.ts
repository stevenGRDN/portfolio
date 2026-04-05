import projectA from "../content/projects/project-a"

export const projects = [projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA,projectA, projectA, projectA, projectA];

export type projectsType = {
    title: string;
    slug: string;
    date: string;
    tags: string[];
    cover: string;
    layout: string;
    content: ({
        type: string;
        text: string;
        src?: undefined;
    } | {
        type: string;
        src: string;
        text?: undefined;
    })[];
} | undefined