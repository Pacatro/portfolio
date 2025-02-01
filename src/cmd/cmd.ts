import {
  GotoCommand,
  HelpCommand,
  ExitCommand,
  type Command,
} from "./commands";

import content from "../../content.json";

export class Cmd {
  private commands: Record<string, Command>;

  constructor(
    private cmdDialog: HTMLDialogElement,
    private helpDialog: HTMLDialogElement
  ) {
    this.commands = {
      ":help": new HelpCommand(this.helpDialog),
      ":h": new HelpCommand(this.helpDialog),
      ":goto": new GotoCommand(content.sections),
      ":q": new ExitCommand(),
    };
  }

  public execute(command: string): void {
    const [cmdName, cmdArgs] = this.parseCommand(command);

    const commandToExecute = cmdName
      ? this.commands[cmdName]
      : this.commands[":help"];

    commandToExecute.execute(cmdArgs || "");
  }

  private parseCommand(command: string): [string | null, string | null] {
    const cmd = command.toLowerCase().split(" ");
    const cmdName = cmd[0];

    return cmdName.includes(":") ? [cmdName, cmd[1]] : [null, null];
  }
}
