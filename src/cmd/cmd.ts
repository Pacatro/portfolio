import content from "../../content.json";

export class Cmd {
  dialog: HTMLDialogElement;
  helpDialog: HTMLDialogElement;

  constructor(dialog: HTMLDialogElement) {
    this.dialog = dialog;
    this.helpDialog = document.getElementById(
      "helpDialog"
    ) as HTMLDialogElement;
  }

  execute(command: string) {
    const cmd = command.toLowerCase().split(" ");

    const cmdName = cmd[0];

    if (!cmdName || !cmdName.includes(":")) return;

    const cmdArgs = cmd[1];

    switch (cmdName) {
      case ":help":
        this.help();
        break;
      case ":goto":
        this.goto(cmdArgs);
        break;
      case ":visit":
        this.visit(cmdArgs);
        break;
      default:
        this.help();
        break;
    }
  }

  private help() {
    this.helpDialog.showModal();
  }

  /**
   * Go to a section of the portfolio
   * @param arg The argument passed to the command
   */
  private goto(arg: string) {
    if (arg.includes(":")) return;

    const section = arg.toLowerCase().replace(" ", "-");

    const contents = content.contents.map((c) =>
      c.toLowerCase().replace(" ", "-")
    );

    if (!contents.includes(section)) return;

    const targetElement = document.getElementById(section);

    if (!targetElement) return;

    targetElement.scrollIntoView();
  }

  /**
   * Visit a project
   * @param project The project to visit
   */
  private visit(project: string) {
    if (project.includes(":")) return;

    const profile = content.githubProfile;
    const url = `https://github.com/${profile}/${project}`;

    window.open(url, "_blank");
  }
}
