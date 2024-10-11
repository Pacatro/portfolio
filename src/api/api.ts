import { Project } from "../models/project";

export class Api {
    static async getProjects(): Promise<Project[]> {
        const token = import.meta.env.GITHUB_TOKEN;
        
        if (!token) {
            throw new Error('GitHub token is missing');
        }
    
        let result: Response;
        try {
            result = await fetch('https://api.github.com/users/Pacatro/repos?sort=recent', {
                method: 'GET',
                headers: {
                    'Accept': 'application/vnd.github.v3+json',
                    'Authorization': `token ${token}`
                }
            });
    
            if (!result.ok) {
                throw new Error(`Failed to fetch projects: ${result.status} ${result.statusText}`);
            }
        } catch (error) {
            throw new Error(`Network error: ${(error as Error).message}`);
        }
    
        try {
            const projectsJSON: any[] = await result.json();
            return projectsJSON
                .filter((project: any) => project.description)
                .slice(0, 5)
                .map((project: any) => new Project(project.name, project.description, project.html_url, new Date(project.updated_at)));
        } catch (error) {
            throw new Error(`Error parsing project data: ${(error as Error).message}`);
        }
    }    
}
