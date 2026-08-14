export interface CommandContext {
  close: () => void;
  help: () => void;
  sections: string[];
}

interface Command {
  name: string;
  args?: string;
  description: string;
  run: (argument: string, context: CommandContext) => void;
}

export const commands: Command[] = [
  {
    name: ":h",
    description: "Show the available commands",
    run: (_, { help }) => help(),
  },
  { name: ":q", description: "Quit", run: () => window.close() },
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
      if (sections.includes(id)) document.getElementById(id)?.scrollIntoView();
    },
  },
];

export function runCommand(input: string, context: CommandContext): void {
  const [name = "", ...args] = input.trim().toLowerCase().split(/\s+/);
  const command = commands.find((item) => item.name === name);
  if (command) command.run(args.join(" "), context);
  else context.help();
}
