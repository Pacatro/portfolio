import type { APIRoute } from "astro";
import content from "../../../content.json";

// Constantes
const GITHUB_PROFILE: string = content.githubProfile;
const TOKEN: string = import.meta.env.GITHUB_TOKEN;
const GITHUB_API: string = `https://api.github.com/users/${GITHUB_PROFILE}/repos?sort=created&type=public`;
const MAX_PROJECTS: number = 8;
const EXCLUDED_REPOS = new Set(["dotfiles", "portfolio"]);

// Interfaz para tipar los proyectos de GitHub
interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

// Clase Project con tipado estricto
export class Project {
  constructor(
    public name: string,
    public description: string | null,
    public link: string,
    public stars: number = 0,
    public language: string = "",
  ) { }
}

// Función para filtrar repositorios según criterios
const filterRepos = (repos: GitHubRepo[]): GitHubRepo[] => {
  return repos.filter((repo) =>
    repo.description &&
    repo.stargazers_count > 0 &&
    !repo.fork &&
    !EXCLUDED_REPOS.has(repo.name)
  );
};

const mapToProjects = (repos: GitHubRepo[]): Project[] => {
  return repos
    .slice(0, MAX_PROJECTS)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .map((repo) =>
      new Project(
        repo.name,
        repo.description,
        repo.html_url,
        repo.stargazers_count,
        repo.language ?? "",
      )
    );
};

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const response = await fetch(GITHUB_API, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      Authorization: `token ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
};

export const prerender = false;

export const GET: APIRoute = async () => {
  if (!TOKEN) {
    return new Response(
      JSON.stringify({ error: "GitHub token is missing" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const repos = await fetchGitHubRepos();
    const filteredRepos = filterRepos(repos);
    const projects = mapToProjects(filteredRepos);

    return new Response(
      JSON.stringify(projects),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: `Failed to fetch projects: ${message}` }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
