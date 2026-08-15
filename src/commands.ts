export interface CommandContext {
  close: () => void;
  help: () => void;
  sections: string[];
}

export interface CommandResult {
  message?: string;
  tone?: "neutral" | "error";
}

interface Command {
  name: string;
  args?: string;
  description: string;
  run: (argument: string, context: CommandContext) => CommandResult | void;
}

export const commands: Command[] = [
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
    run: () => {
      const link = document.createElement("a");
      link.href = "/docs/resume_Paco.pdf";
      link.download = "resume_Paco.pdf";
      link.click();
    },
  },
  {
    name: ":goto",
    args: "section",
    description: "Go to a section of the portfolio",
    run: (argument, { sections }) => {
      const id = argument.toLowerCase().replaceAll(" ", "-");
      if (!argument) {
        return {
          message: "Add a section name, for example :goto projects.",
          tone: "error",
        };
      }
      const sectionId = sections.find((section) => section.toLowerCase() === id);
      if (!sectionId) {
        return {
          message: `Unknown section “${argument}”. Try: ${sections.join(", ")}.`,
          tone: "error",
        };
      }
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView();
      } else {
        window.location.href = `/#${sectionId}`;
      }
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
    tone: "error",
  };
}
