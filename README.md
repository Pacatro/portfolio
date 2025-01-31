# Personal Portfolio

This is my personal portfolio built with [Astro](https://astro.build/).

## 🚀 Getting Started

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
    npm install
    ```

4. Start the development server

    ```bash
    npm run dev
    ```

5. Open the project in your browser at `http://localhost:3000`

## 🛠️ Customize

You can customize the portfolio by editing the `content.json` file.

```json
{
    "name": "Your Name or Username",
    "githubProfile": "Your GitHub Profile",
    "bio": "Your Bio",
    "email": "Your Email",
    "contacts": [
        {
            "name": "Social media name",
            "url": "social media url",
            "icon": "path/to/icon.svg" // OPTIONAL
        }
    ],
    "contents": [
        "About me",
        "Projects",
        "Contact"
    ],
    "commands": [
        {
            "name": ":help",
            "args": "",
            "description": "Show a help dialog with the available commands"
        },
        {
            "name": ":goto",
            "args": "<section>",
            "description": "Go to a section of the portfolio"
        },
        {
            "name": ":visit",
            "args": "<project>",
            "description": "Visit a project"
        }
    ]
}
```

### Add new commands

To add a new command, you need to add it to the `commands` array in the `content.json` file.

Then you have to implement the functionality in the `src/cmd/commands.ts` creating a new class that implements the `Command` interface.

```typescript
export class CustomCommand implements Command {
  execute(arg: string): void {
    console.log("Custom command executed with arg:", arg);
  }
}
```

And finally, you need to add the new command to the `Cmd` class in the `src/cmd/cmd.ts` file.

```typescript
private commands: Record<string, Command>;

constructor(
    private cmdDialog: HTMLDialogElement,
    private helpDialog: HTMLDialogElement
) {
    this.commands = {
        ":help": new HelpCommand(this.helpDialog),
        ":custom": new CustomCommand(),
    };
}
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar**](https://github.com/Pacatro).
