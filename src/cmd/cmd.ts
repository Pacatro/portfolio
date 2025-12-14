import {
  DownloadResumeCommand,
  ExitCommand,
  GotoCommand,
  HelpCommand,
  QuitCommand,
  type Command,
} from "./commands";

import content from "../../content.json";

/**
 * Command processor for the portfolio terminal interface.
 * Handles parsing and execution of colon-prefixed commands.
 */
export class Cmd {
  private commands: Record<string, Command>;

  /**
   * Initializes the command processor with available commands.
   * Maps command aliases to their corresponding command instances.
   */
  constructor() {
    this.commands = {
      ":h": new HelpCommand(),
      ":q": new QuitCommand(),
      ":e": new ExitCommand(),
      ":r": new DownloadResumeCommand(),
      ":goto": new GotoCommand(content.sections),
    };
  }

  /**
   * Parses and executes a command string.
   * @param command - The raw command string to execute
   */
  public execute(command: string): void {
    const [cmdName, cmdArgs] = this.parseCommand(command);

    const commandToExecute = cmdName
      ? this.commands[cmdName]
      : this.commands[":help"];

    commandToExecute.execute(cmdArgs || "");
  }

  /**
   * Parses a command string into name and arguments.
   * @param command - The command string to parse
   * @returns A tuple containing the command name and arguments, or null if invalid
   */
  private parseCommand(command: string): [string | null, string | null] {
    const cmd = command.toLowerCase().split(" ");
    const cmdName = cmd[0];

    return cmdName.includes(":") ? [cmdName, cmd[1]] : [null, null];
  }
}
