interface CommandContext {
  close: () => void;
  download: (path: string, filename: string) => void;
  help: () => void;
  goToSection: (sectionId: string) => void;
  sections: string[];
}

interface CommandResult {
  message: string;
}

interface Command {
  name: string;
  args?: string;
  description: string;
  run: (argument: string, context: CommandContext) => CommandResult | void;
}

export const commands: readonly Command[] = [
  {
    name: ":h",
    description: "Show the available commands",
    run: (_, { help }) => help(),
  },
  {
    name: ":q",
    description: "Close the command palette",
    run: (_, { close }) => close(),
  },
  { name: ":e", description: "Exit cmd", run: (_, { close }) => close() },
  {
    name: ":r",
    description: "Download resume",
    run: (_, { download }) =>
      download("/docs/resume_Paco.pdf", "resume_Paco.pdf"),
  },
  {
    name: ":goto",
    args: "section",
    description: "Go to a section of the portfolio",
    run: (argument, { goToSection, sections }) => {
      const id = argument.toLowerCase().replaceAll(" ", "-");
      if (!argument) {
        return {
          message: "Add a section name, for example :goto projects.",
        };
      }
      const sectionId = sections.find((section) => section.toLowerCase() === id);
      if (!sectionId) {
        return {
          message: `Unknown section “${argument}”. Try: ${sections.join(", ")}.`,
        };
      }
      goToSection(sectionId);
    },
  },
];

export function runCommand(
  input: string,
  context: CommandContext,
): CommandResult | void {
  const [name = "", ...args] = input.trim().toLowerCase().split(/\s+/);
  const command = commands.find((item) => item.name === name);
  if (command) return command.run(args.join(" "), context);
  return {
    message: `Unknown command “${name}”. Enter :h to see available commands.`,
  };
}
