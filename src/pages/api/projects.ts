import type { APIRoute } from "astro";
import content from "../../../content.json";

const GITHUB_PROFILE: string = content.githubProfile;
const TOKEN: string = import.meta.env.GITHUB_TOKEN;
const GITHUB_API: string = `https://api.github.com/users/${GITHUB_PROFILE}/repos?sort=created&type=public`;
const MAX_PROJECTS: number = 8;

export class Project {
  name: string;
  description: string;
  link: string;
  stars: number;
  language?: string;

  constructor(
    name: string,
    description: string,
    link: string,
    stars?: number,
    language?: string
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.stars = stars || 0;
    this.language = language || "";
  }
}

export const GET: APIRoute = async () => {
  if (!TOKEN) {
    return new Response(JSON.stringify({ error: "GitHub token is missing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    let result = await fetch(GITHUB_API, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${TOKEN}`,
      },
    });

    if (!result.ok) {
      throw new Error(
        `Failed to fetch projects: ${result.status} ${result.statusText}`
      );
    }

    const projectsJSON = await result.json();
    const filteredProjects = projectsJSON
      .filter(
        (project: any) =>
          project.description &&
          project.stargazers_count !== 0 &&
          !project.fork &&
          project.name !== "dotfiles" &&
          project.name !== "portfolio"
      )
      .slice(0, MAX_PROJECTS)
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .map(
        (project: any) =>
          new Project(
            project.name,
            project.description,
            project.html_url,
            project.stargazers_count,
            project.language
          )
      );

    return new Response(JSON.stringify(filteredProjects), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch projects" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
