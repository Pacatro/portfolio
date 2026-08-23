import type { SocialLink } from "./lib/portfolio";
import { getSocialHref, isEmailLink } from "./lib/social-links";

interface CommandContext {
  close: () => void;
  download: (path: string, filename: string) => void;
  help: () => void;
  goToSection: (sectionId: string) => void;
  sections: string[];
  socialItems: SocialLink[];
}

interface CommandResult {
  message: string;
  html?: boolean;
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
    name: ":cv",
    description: "Download my cv",
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
      const sectionId = sections.find(
        (section) => section.toLowerCase() === id,
      );
      if (!sectionId) {
        return {
          message: `Unknown section “${argument}”. Try: ${sections.join(", ")}.`,
        };
      }
      goToSection(sectionId);
    },
  },
  {
    name: ":links",
    description: "Display all social media links",
    run: (_, { socialItems }) => {
      if (socialItems.length === 0) {
        return { message: "No social links configured." };
      }
      const html = socialItems
        .map((link) => {
          const { url, icon } = link;
          const isEmail = isEmailLink(link);
          const href = getSocialHref(link);
          return `<a href="${href}" target="${isEmail ? "" : "_blank"}" rel="${isEmail ? "" : "noopener noreferrer"}" class="flex items-center gap-2 font-semibold text-[#8bd5ca] transition-colors hover:text-[#cad3f5]">${icon ? `<img src="${icon}" alt="" class="h-4 w-4 opacity-70" />` : ""}${url}</a>`;
        })
        .join("");
      return {
        message: `<div class="flex flex-wrap items-center gap-x-5 gap-y-2">${html}</div>`,
        html: true,
      };
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
