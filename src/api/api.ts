import { Project } from "./project";
import content from "../../content.json";

const GITHUB_PROFILE: string = content.githubProfile;
const TOKEN: string = import.meta.env.GITHUB_TOKEN;
const GITHUB_API: string = `https://api.github.com/users/${GITHUB_PROFILE}/repos?sort=recent&type=public`;

export class Api {
  static async getProjects(): Promise<Project[]> {
    if (!TOKEN) throw new Error("GitHub token is missing");

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
      return projectsJSON
        .filter(
          (project: any) =>
            project.description && project.stars !== 0 && !project.fork
        )
        .slice(0, 8)
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
    } catch (error) {
      return [];
    }
  }
}
