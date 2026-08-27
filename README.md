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
   FEATURE_BLOG=false
   PUBLIC_SITE_URL="https://your-domain.example"
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

### Feature flags

The blog is experimental and disabled by default. Enable its home section,
navigation item, commands, and generated post routes with:

```bash
FEATURE_BLOG=true
```

Set the variable in `.env` for local development or in the deployment
environment. Because blog pages are prerendered, changing the flag requires a
new build/deployment.

Set `PUBLIC_SITE_URL` to the production origin, without a path. Astro uses it
for canonical URLs, Open Graph URLs, structured data, `robots.txt`, and the XML
sitemap.

The portfolio content and navigation are generated from the `sections` array in
`content.json`. A rendered section needs an `id` and a `type`. Its `id` is reused
as the anchor, navigation label, and terminal-styled section title.

```json
{
  "title": "Your Name",
  "name": "Your Full Name",
  "githubProfile": "Your GitHub Profile",
  "socialLinks": [],
  "sections": [
    {
      "id": "about-me",
      "type": "text",
      "content": "Your bio"
    }
  ]
}
```

### Add a new section type

Section renderers are discovered automatically from `src/components/sections`.
`Section.astro` uses `import.meta.glob` on `src/components/sections/*.astro` and
resolves the renderer by `type`. The filename must match the `type` in
`content.json`; no central conditional or registry needs to be updated. If the
matching file is missing, the build fails with a message pointing to the file
to create.

For example, add `{ "id": "Experience", "type": "experience" }` to the
`sections` array, then create `src/components/sections/experience.astro`:

```astro
---
import SectionFrame from "../SectionFrame.astro";
import type { SectionRendererProps } from "../../lib/portfolio";

type Props = SectionRendererProps;
const { section } = Astro.props;
---

<SectionFrame id={section.id}>
  <!-- Render this section's fields here. -->
</SectionFrame>
```

`SectionFrame` provides the shared heading, spacing, and anchor. A renderer can
omit it when it needs a completely custom layout.

### Add new commands

Commands are defined in a single registry in `src/commands.ts`. Adding an entry
automatically adds it to the command runner and the help dialog.

```typescript
// Add an entry to the `commands` array:
{
  name: ":custom",
  args: "arg",
  description: "Custom command",
  run: (argument) => console.log(argument)
}
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar Muñoz**](https://github.com/Pacatro).
