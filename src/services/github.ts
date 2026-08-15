const GITHUB_API_VERSION = "2022-11-28";
const REQUEST_TIMEOUT_MS = 8_000;
const MAX_PROJECTS = 8;
const MIN_STARS = 0;

interface GitHubRepo {
  name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  language?: string;
  fork: boolean;
  topics: string[];
  updated_at: string;
}

type GitHubErrorKind = "rate-limit" | "timeout" | "unavailable";

interface ProjectsResult {
  projects: GitHubRepo[];
  error: GitHubErrorKind | null;
}

function selectProjects(repos: GitHubRepo[]): GitHubRepo[] {
  return repos
    .filter((repo) => !repo.fork && repo.stargazers_count > MIN_STARS)
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    )
    .slice(0, MAX_PROJECTS);
}

function classifyError(error: unknown): GitHubErrorKind {
  if (error instanceof Error && error.name === "AbortError") return "timeout";
  if (error instanceof Error && error.message === "github:403") {
    return "rate-limit";
  }
  return "unavailable";
}

export async function getGitHubProjects(
  profile: string,
  token?: string,
): Promise<ProjectsResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": GITHUB_API_VERSION,
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  try {
    const url = new URL(
      `https://api.github.com/users/${profile}/repos?sort=updated&type=public&per_page=100`,
    );
    const response = await fetch(url, { headers, signal: controller.signal });
    if (!response.ok) throw new Error(`github:${response.status}`);

    const repos = (await response.json()) as GitHubRepo[];
    return { projects: selectProjects(repos), error: null };
  } catch (error) {
    return { projects: [], error: classifyError(error) };
  } finally {
    clearTimeout(timeout);
  }
}
