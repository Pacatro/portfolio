export interface Command {
  /**
   * Executes the command
   * @param arg The argument passed to the command
   */
  execute(arg: string): void;
}

/**
 * Show a help dialog with the available commands
 */
export class HelpCommand implements Command {
  helpDialog: HTMLDialogElement;

  constructor(helpDialog: HTMLDialogElement) {
    this.helpDialog = helpDialog;
  }

  execute() {
    this.helpDialog.showModal();
  }
}

/**
 * Go to a section of the portfolio
 */
export class GotoCommand implements Command {
  private sections: string[];

  constructor(sections: string[]) {
    this.sections = sections.map((c) => c.toLowerCase().replace(" ", "-"));
  }

  execute(arg: string): void {
    if (arg.includes(":")) return;

    const section = arg.toLowerCase().replace(" ", "-");

    if (!this.sections.includes(section)) return;

    const targetElement = document.getElementById(section);

    if (!targetElement) return;

    targetElement.scrollIntoView();
  }
}

/**
 * Visit a project
 */
export class VisitCommand implements Command {
  private profile: string;

  constructor(profile: string) {
    this.profile = profile;
  }

  execute(project: string): void {
    if (project.includes(":")) return;

    // TODO: Add support for other APIs like GitLab, Bitbucket, etc
    const url = `https://github.com/${this.profile}/${project}`;

    window.open(url, "_blank");
  }
}
