export class Project {
    name: string;
    description: string;
    link: string;
    createdAt: Date;
    stars: number;
    language?: string;

    constructor(name: string, description: string, link: string, createdAt?: Date, stars?: number, language?: string) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.description = description;
        this.link = link;
        this.createdAt = createdAt || new Date();
        this.stars = stars || 0;
        this.language = language || '';
    }
}