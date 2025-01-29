import { Project } from "./project";

const GITHUB_API: string =
  "https://api.github.com/users/Pacatro/repos?sort=recent&type=public";

const TOKEN: string = import.meta.env.GITHUB_TOKEN;

export class Api {
  static async getProjects(): Promise<Project[]> {
    if (!TOKEN || TOKEN === "YOUR TOKEN") {
      throw new Error("GitHub token is missing");
    }

    let result: Response;
    try {
      result = await fetch(GITHUB_API, {
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
    } catch (error) {
      throw new Error(`Network error: ${(error as Error).message}`);
    }

    try {
      const projectsJSON = await result.json();
      return projectsJSON
        .filter(
          (project: any) =>
            project.description &&
            project.stars !== 0 &&
            project.name !== "portfolio" &&
            !project.fork
        )
        .slice(0, 5)
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
      throw new Error(
        `Error parsing project data: ${(error as Error).message}`
      );
    }
  }
}
