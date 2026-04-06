import projectA from "../content/projects/project-a"
import projectB from "../content/projects/project-b"

export const projects = [projectA, projectB, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA, projectA,projectA, projectA, projectA, projectA];

export type projectsType = {
    title: string;
    slug: string;
    date: {
        value: string;
        display: string;
    };
    type: string;
    tags: string[];
    extras: string[];
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
}