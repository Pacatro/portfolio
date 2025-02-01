import {
  ExitCommand,
  GotoCommand,
  HelpCommand,
  QuitCommand,
  type Command,
} from "./commands";

import content from "../../content.json";

export class Cmd {
  private commands: Record<string, Command>;

  constructor() {
    this.commands = {
      ":h": new HelpCommand(),
      ":q": new QuitCommand(),
      ":e": new ExitCommand(),
      ":goto": new GotoCommand(content.sections),
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
