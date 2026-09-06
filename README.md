# Adobo on Island Time

A personal cooking journal about chicken adobo, Filipino roots, and growing up in Hawaiʻi. Built for fun, with the care of a software project.

**[Private website preview](https://adobo-on-island-time.afagajustine.chatgpt.site)** · [Repository](https://github.com/Jafaga/adobo-on-island-time)

![Illustrative chicken adobo](public/chicken-adobo.jpg)

## The experience

Six clickable cooking milestones follow Justine’s own drumstick adobo method: prep the chicken, prep a little ginger, add two shoyus, turn every five minutes, finish with oyster sauce, and serve. The desktop timeline alternates above and below a central line, inspired by a project schedule. Tablets retain the horizontal axis with scrolling; phones use a vertical timeline. The timeline is the first screen, with circular milestones instead of cards. Hover brings a milestone forward. Clicking it expands from its actual screen position into a spacious cooking view, with ingredients, instructions, sensory cues, and a kitchen note. Closing reverses the animation into the originating milestone.

- Previous/next navigation, per-session completion state, and explicit undo.
- Keyboard access (Tab, arrow keys, Home/End, Enter), focus restoration, escape-to-close, a skip link, and descriptive step labels.
- CSS hover motion and Web Animations API zoom transitions, with a pure, tested geometry calculation. Reduced-motion preferences bypass spatial animation.
- An ingredient list, personal introduction, and a short explanation of the build.

## Recipe content

The recipe and family story were supplied by Justine. Her signature combination is **Aloha Original Shoyu (regular sodium)** plus **Silver Swan Special Soy Sauce**, with a little ginger, ground black pepper, very little water, and oyster sauce added when the liquid is nearly reduced.

Quantities, a shoyu ratio, a fixed serving count, and total cooking time were not supplied. The interface therefore uses cooking cues rather than invented elapsed timestamps. The five-minute turning interval is preserved as the only specified numeric timing. Ingredient amounts remain qualitative and depend on the batch.

The chicken-washing and salt-rubbing routine is retained as a personal memory with her mom, separate from the practical no-rinse prep directions and a clearly labeled USDA safety note. Crosswise drumstick halves are preserved, with a butcher-cut suggestion for cutting through bone. Every piece must reach 165°F / 74°C before serving.

Edit `lib/recipe.ts` to update ingredients, milestone markers, timing labels, instructions, cues, and kitchen notes. The current UI is composed for six milestones. If adding steps, also update the icon list, step-count labels, and timeline layout.

The food image remains an AI-created illustration from the earlier design; its caption explicitly says it is not a photo of this exact recipe. Replace `public/chicken-adobo.jpg` with a kitchen photograph and update its alt text and disclosure when one is available.

## Run locally

Node.js 22.13 or newer is required.

```sh
npm ci
npm run dev
```

Open the Local URL printed in the terminal. The development server stays local; deployment is a separate operation.

```sh
npm run check   # lint, TypeScript, recipe invariants
npm run build   # production Cloudflare Worker + client assets
```

CI runs the same checks on pushes to `main` and on pull requests.

## Engineering notes

React 19 and TypeScript power the interface. Vinext runs the App Router application on Vite, and the Sites plugin packages it for Cloudflare Workers. The expanded cooking view uses the installed shadcn/Base UI Dialog primitive for modal semantics and focus management. A measured transform maps the expanded view to the clicked circle, so it grows from that position and returns there on close. Recipe data, cooking cues, and zoom geometry live separately from presentation.

There is no database, analytics, account system inside the app, or third-party API dependency. Completion state stays in React memory for the current page session and resets on reload. The private preview's access is enforced by the hosting platform.

- `app/page.tsx` — route entry point
- `components/adobo-journal.tsx` — journal and interactive step panels
- `lib/recipe.ts` — typed personal recipe, cooking cues, and the five-minute turning interval
- `lib/timeline-motion.ts` — pure geometry for the zoom transition
- `app/globals.css` — responsive layout, palette, typography, and motion
- `tests/recipe.test.mjs` — personal recipe order, timing provenance, ingredient integrity, and separation of the family memory from safer prep
- `tests/timeline-motion.test.mjs` — zoom coordinates across screen sizes and degenerate frames
- `.github/workflows/ci.yml` — repeatable automated checks

The generated component catalog in `components/ui` and its `use-mobile` hook are retained unchanged. Lint excludes that vendored starter catalog because it includes upstream lint violations; TypeScript still checks it. Application code remains under the strict starter lint rules.

## Recipe and image credits

Recipe and personal story: Justine Afaga. The former example recipe and its third-party recipe references have been removed.

Practical prep guidance follows [USDA on washing food](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/washing-food-does-it-promote-food). Temperature checks follow [USDA food thermometer guidance](https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers).

The food illustration was generated for the initial design. It predates the personal recipe and may depict ingredients not used in it. The reference timeline screenshots guided the layout and are not redistributed here.

## Validation

Automated checks cover static analysis, type safety, recipe-data integrity, and the production build. A local HTTP request verifies the route renders. Full browser interaction and visual testing has not yet been performed.
