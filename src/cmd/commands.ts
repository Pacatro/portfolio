/**
 * Interface for all terminal commands.
 * Defines the contract that all command classes must implement.
 */
export interface Command {
  /**
   * Executes the command with the provided argument.
   * @param arg - The argument passed to the command (may be empty string)
   */
  execute(arg: string): void;
}

/**
 * Displays a help dialog showing all available commands and their usage.
 * Triggered by the :h command alias.
 */
export class HelpCommand implements Command {
  /**
   * Opens the help dialog modal to display command information.
   */
  execute() {
    const helpDialog = document.getElementById(
      "helpDialog",
    ) as HTMLDialogElement;
    helpDialog.showModal();
  }
}

/**
 * Navigates to a specific section of the portfolio.
 * Accepts section names as arguments and scrolls to the corresponding element.
 */
export class GotoCommand implements Command {
  private sections: string[];

  /**
   * Initializes the goto command with available portfolio sections.
   * @param sections - Array of section names from the portfolio content
   */
  constructor(sections: string[]) {
    this.sections = sections.map((c) => c.toLowerCase().replace(" ", "-"));
  }

  /**
   * Scrolls to the specified portfolio section.
   * @param arg - The section name to navigate to
   */
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
 * Attempts to close the browser window/tab.
 * Note: This may not work in all browsers due to security restrictions.
 */
export class QuitCommand implements Command {
  /**
   * Attempts to close the current browser window.
   */
  execute() {
    window.close();
  }
}

/**
 * Closes the command dialog interface.
 * Returns focus to the main portfolio content.
 */
export class ExitCommand implements Command {
  /**
   * Closes the terminal command dialog.
   */
  execute() {
    const cmdDialog = document.getElementById("cmdDialog") as HTMLDialogElement;
    cmdDialog.close();
  }
}

/**
 * Downloads the resume PDF file.
 * Creates a temporary download link and triggers the download automatically.
 */
export class DownloadResumeCommand implements Command {
  /**
   * Initiates the resume PDF download.
   * Creates a temporary anchor element, triggers the download, then removes it.
   */
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
