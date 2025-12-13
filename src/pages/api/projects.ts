import type { APIRoute } from "astro";
import content from "../../../content.json";

const GITHUB_PROFILE = content.githubProfile;
const TOKEN = import.meta.env.GITHUB_TOKEN;
const GITHUB_API = `https://api.github.com/users/${GITHUB_PROFILE}/repos?sort=created&type=public`;
const MAX_PROJECTS = 8;
const EXCLUDED_REPOS = new Set(["dotfiles", "portfolio"]);

export interface GitHubRepo {
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
  fork: boolean;
  topics: string[];
  created_at: string;
}

const getRepos = (repos: GitHubRepo[]): GitHubRepo[] => {
  return repos.filter((repo) =>
    repo.description &&
    repo.stargazers_count > 0 &&
    !repo.fork &&
    !EXCLUDED_REPOS.has(repo.name)
  )
    .slice(0, MAX_PROJECTS)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
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
    const projects = getRepos(repos);

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
