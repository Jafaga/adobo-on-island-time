# Import this journal into Vercel

Prepared destination: **Justine Afaga’s projects** (`justine-afagas-projects`).
Repository: **Jafaga/adobo-on-island-time**, branch **main**.
Suggested project name: **adobo-on-island-time**.

## Build settings

`vercel.json` supplies these settings automatically:

- Framework preset: Other
- Install command: `npm ci`
- Build command: `npm run build:vercel`
- Output directory: `dist/client`
- Root directory: repository root

No application environment variables are required. The Vercel build exports the page and its interactive React bundle to static files. Timeline zoom, navigation, and completion tracking continue to run in the browser.

In Vercel, import the GitHub repository into the workspace above and choose the project name. The Vercel GitHub integration must have access to this private repository. Importing does not make the GitHub repository public, but the production website can be publicly accessible, including the personal photos it contains. Confirm the intended audience before deployment.

After import, GitHub pushes to `main` trigger Vercel production builds. Review the first deployment and its access settings in the Vercel dashboard.

## Local verification

```sh
npm run check
npm run build:vercel
```

The existing Sites workflow still uses `npm run build`. The two build commands use different Vite modes; rebuild for the target you intend to publish. Do not package the Vercel export as a Sites Worker deployment.
