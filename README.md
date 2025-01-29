# :man_technologist: Personal Portfolio

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
    ]
}
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar**](https://github.com/Pacatro).
