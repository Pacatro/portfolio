# Personal Portfolio

This is my personal portfolio built with [Astro](https://astro.build/).

## Build

1. Clone the repository

    ```bash
    git clone https://github.com/Pacatro/portfolio.git
    ```

2. Rename the `content.example.json` file to `content.json`

    ```bash
    mv content.example.json content.json
    ```

3. Add your github token to the `.env.example` file and rename it to `.env`

    ```bash
    mv env.example .env
    ```

4. Install dependencies

    ```bash
    npm install
    ```

5. Start the development server

    ```bash
    npm run dev
    ```

6. Open the project in your browser at `http://localhost:3000`

## Customize

You can customize the portfolio by editing the `content.json` file.

```json
{
    "username": "Your Name or Username",
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

Once you've made the changes, don't forget to rename the `content.example.json` file to `content.json`.

```bash
mv content.example.json content.json
```

## 🔑 License

[MIT](LICENSE) - Created by [**Paco Algar**](https://github.com/Pacatro).
