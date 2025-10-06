import { useState, useEffect } from "preact/hooks";
import RepoCard from "../preact/RepoCard";
import type { Project } from "../../pages/api/projects";

function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
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
      console.log(projects);
    } catch (err) {
      setError("Error al cargar los proyectos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserProjects();
  }, []);

  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>{error}</p>;
  if (projects.length === 0) return <p>There are no projects</p>;

  return (
    <div>
      {projects.map((project: Project) => (
        <RepoCard
          key={project.name}
          link={project.link}
          name={project.name}
          language={project.language}
          stars={project.stars}
          description={project.description}
        />
      ))}
    </div>
  );
}

export default Projects;
