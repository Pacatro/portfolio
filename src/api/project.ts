export class Project {
  name: string;
  description: string;
  link: string;
  stars: number;
  language?: string;

  constructor(
    name: string,
    description: string,
    link: string,
    stars?: number,
    language?: string
  ) {
    this.name = name;
    this.description = description;
    this.link = link;
    this.stars = stars || 0;
    this.language = language || "";
  }
}
