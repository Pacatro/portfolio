export class Project {
    name: string;
    description: string;
    link: string;
    createdAt: Date;

    constructor(name: string, description: string, link: string, createdAt?: Date) {
        this.name = name.charAt(0).toUpperCase() + name.slice(1);
        this.description = description;
        this.link = link;
        this.createdAt = createdAt || new Date();
    }
}