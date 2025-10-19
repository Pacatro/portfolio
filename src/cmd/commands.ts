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
  execute() {
    const helpDialog = document.getElementById(
      "helpDialog"
    ) as HTMLDialogElement;
    helpDialog.showModal();
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
 * Quit the website
 */
export class QuitCommand implements Command {
  execute() {
    window.close();
  }
}

/**
 * Close cmd dialog
 */
export class ExitCommand implements Command {
  execute() {
    const cmdDialog = document.getElementById("cmdDialog") as HTMLDialogElement;
    cmdDialog.close();
  }
}

/**
 * Download the resume
 */
export class DownloadResumeCommand implements Command {
  execute() {
    const url = "/docs/resume_Paco.pdf";
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume_Paco.pdf";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}
