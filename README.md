# Personal Portfolio

This is my personal portfolio built with [Astro](https://astro.build/).

## 🚀 Getting Started

> [!NOTE]
> This project uses [pnpm](https://pnpm.io/) as the package manager,
> if you use other you may need to make use the corresponding commands.

1. Clone the repository

   ```bash
   git clone https://github.com/Pacatro/portfolio.git
   ```

2. Add your github token to the `.env.example` file and rename it to `.env`

   ```bash
   GITHUB_TOKEN="<YOUR_GITHUB_TOKEN>"
   ```

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

5. Open the project in your browser at [`http://localhost:4321`](http://localhost:4321)

## 🖥️ CMD Mode

This project has a command mode that allows you to execute some predefined commands.

You have two ways to open the command mode:

- Press the `:` key
- Click the terminal button in the header, next to the name

### Available commands

| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `:h`              | Show a help dialog with the available commands |
| `:q`              | Quit the website                               |
| `:e`              | Close the command mode                         |
| `:r`              | Download resume                                |
| `:goto <section>` | Go to a section of the portfolio               |

## 🛠️ Customize

The portfolio content and navigation are generated from the `sections` array in
`content.json`. A section only needs an `id`, navigation `label`, terminal `path`,
displayed `command`, and a `type` (`text`, `projects`, or `socials`).

```json
{
  "title": "Your Name",
  "name": "Your Full Name",
  "githubProfile": "Your GitHub Profile",
  "sections": [
    {
      "id": "about-me",
      "label": "About",
      "path": "about-me",
      "command": "whoami",
      "type": "text",
      "content": "Your bio"
    }
  ]
}
```

### Add new commands

Commands are defined in a single registry in `src/commands.ts`. Adding an entry
automatically adds it to the command runner and the help dialog.

```typescript
commands.push({
  name: ":custom",
  args: "arg",
  description: "Custom command",
  run: (argument) => console.log(argument),
});
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar Muñoz**](https://github.com/Pacatro).
