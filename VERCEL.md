# Vercel deployment

[Live cooking journal](https://adobo-on-island-time.vercel.app) · [Project dashboard](https://vercel.com/justine-afagas-projects/adobo-on-island-time)

The project **adobo-on-island-time** is linked to **Jafaga/adobo-on-island-time** in **Justine Afaga’s projects**. Pushes to `main` trigger production deployments through Vercel’s GitHub integration.

## Build settings

The repository’s `vercel.json` supplies the settings:

| Setting          | Value                  |
| ---------------- | ---------------------- |
| Framework        | Other                  |
| Install command  | `npm ci`               |
| Build command    | `npm run build:vercel` |
| Output directory | `dist/client`          |
| Root directory   | Repository root        |

No application environment variables are required. Vinext exports HTML, CSS, images, and an interactive React bundle. Timeline animations and completion tracking run in the browser.

## Check changes locally

```sh
npm run check
npm run build:vercel
```

GitHub Actions also validates the code and both deployment builds. Vercel shows the build status and deployment history in the project dashboard.

The original Sites deployment uses `npm run build`. Both commands write into `dist/`, so run the correct build immediately before packaging for that platform. Use the Sites packaging helper only after a Sites build.
