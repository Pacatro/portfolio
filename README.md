# Personal Portfolio

This is my personal portfolio built with [Astro](https://astro.build/).

## 🚀 Getting Started

> [!NOTE]
> This project uses [pnpm](https://pnpm.io/) as the package manager,
if you use other you may need to make use the corresponding commands.

1. Clone the repository

    ```bash
    git clone https://github.com/Pacatro/portfolio.git
    ```

2. Add your github token to the `.env.example` file and rename it to `.env`

    ```bash
    mv env.example .env
    ```

3. Install dependencies

    ```bash
    pnpm install
    ```

4. Start the development server

    ```bash
    pnpm dev
    ```

5. Open the project in your browser at `http://localhost:4321`

## 🖥️ CMD Mode

This project has a command mode that allows you to execute some predefined commands.

You have three ways to open the command mode:

- Press the `:` key
- Click the terminal button in the header, next to the name

### Available commands

| Command | Description |
| --- | --- |
| `:h` | Show a help dialog with the available commands |
| `:q` | Quit the website |
| `:e` | Close the command mode |
| `:goto <section>` | Go to a section of the portfolio |

## 🛠️ Customize

You can customize the portfolio by editing the `content.json` file.

```json
{
    "name": "Your Name or Username",
    "githubProfile": "Your GitHub Profile",
    "bio": "Your Bio",
    "email": "Your Email (optional)",
    "socials": [
        {
            "name": "Social media name",
            "url": "social media url",
            "icon": "path/to/icon.svg" // OPTIONAL
        }
    ],
    "sections": [
        "About me",
        "Projects",
        "Contact"
    ],
    "commands": [
        {
            "name": ":h",
            "args": "",
            "description": "Show the available commands"
        },
        {
            "name": ":q",
            "args": "",
            "description": "Quit"
        },
        {
            "name": ":e",
            "args": "",
            "description": "Exit cmd"
        },
        {
            "name": ":goto",
            "args": "section",
            "description": "Go to a section of the portfolio"
        }
    ]
}
```

### Add new commands

To add a new command, you need to add it to the `commands` array
in the `content.json` file.

```json
{
    
    "commands": [
        {
            "name": ":h",
            "args": "",
            "description": "Show the available commands"
        },
        {
            "name": ":custom",
            "args": "arg",
            "description": "Custom command"
        }
    ]
}
```

Then you have to implement the functionality in the `src/cmd/commands.ts` creating
a new class that implements the `Command` interface.

```typescript
export class CustomCommand implements Command {
  execute(arg: string): void {
    console.log("Custom command");
  }
}
```

And finally, you need to add the new command to the `Cmd` class in the
`src/cmd/cmd.ts` file.

```typescript
private commands: Record<string, Command>;

constructor() {
  this.commands = {
    ":h": new HelpCommand(),
    ":custom": new CustomCommand(),
  };
}
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar**](https://github.com/Pacatro).
