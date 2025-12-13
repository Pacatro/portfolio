import { useState, useEffect } from "preact/hooks";
import RepoCard from "../preact/RepoCard";
import type { GitHubRepo } from "../../pages/api/projects";

function Projects() {
  const [projects, setProjects] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getUserProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }
      const projects = await response.json();
      setProjects(projects);
    } catch (err) {
      setError("Can't fetch projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-cyan-300 border-r-transparent mb-3"></div>
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="bg-red-950/30 border border-red-800/50 rounded-lg p-6 max-w-md">
          <div className="flex items-start">
            <svg
              className="h-6 w-6 text-red-400 mr-3 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h3 className="text-red-300 font-semibold mb-1">
                Error loading projects
              </h3>
              <p className="text-red-400/80 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center max-w-md">
          <svg
            className="mx-auto h-12 w-12 text-gray-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-gray-300 mb-2">
            No projects yet
          </h3>
          <p className="text-gray-500 text-sm">
            Get started by creating your first project
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {projects.map((repo: GitHubRepo) => (
        <RepoCard
          key={repo.name}
          link={repo.html_url}
          name={repo.name}
          language={repo.language}
          stars={repo.stargazers_count}
          description={repo.description}
          topics={repo.topics}
        />
      ))}
    </div>
  );
}

export default Projects;
