# Make this journal your own

The source includes searchable `EDIT SECTION`, `EDIT STYLE`, and `EDIT STEP` comments. These are code comments: they help you navigate the repository and do not appear on the website.

## Where to change things

| What you want to change                                         | File                           | What to search for                    |
| --------------------------------------------------------------- | ------------------------------ | ------------------------------------- |
| Logo, site name, navigation links                               | `components/adobo-journal.tsx` | `EDIT SECTION 01`                     |
| Timeline heading and helper text                                | `components/adobo-journal.tsx` | `EDIT SECTION 02`                     |
| Each step's name, instructions, ingredients, and personal notes | `lib/recipe.ts`                | `EDIT STEP 01` through `EDIT STEP 06` |
| Photos for all six steps, photo crops, and credits              | `lib/site-media.ts`            | `EDIT STEP PHOTOS`                    |
| Your headshot and the header PNG                                | `lib/site-media.ts`            | `EDIT IMAGES HERE`                    |
| Large food photograph and introduction                          | `components/adobo-journal.tsx` | `EDIT SECTION 03`                     |
| Shopping list and batch labels                                  | `lib/recipe.ts`                | `EDIT RECIPE OVERVIEW`                |
| Your story and signature                                        | `components/adobo-journal.tsx` | `EDIT SECTION 05`                     |
| Software skills and GitHub link                                 | `components/adobo-journal.tsx` | `EDIT SECTION 06`                     |
| Photo attribution and prep references                           | `components/adobo-journal.tsx` | `EDIT SECTION 07`                     |
| Footer text                                                     | `components/adobo-journal.tsx` | `EDIT SECTION 08`                     |
| The expanded step view                                          | `components/adobo-journal.tsx` | `EDIT SECTION 09`                     |
| Colors and fonts                                                | `app/globals.css`              | `EDIT STYLE 01`                       |
| Timeline spacing, circles, and hover styles                     | `app/globals.css`              | `EDIT STYLE 10`                       |
| Expanded view size and columns                                  | `app/globals.css`              | `EDIT STYLE 11`                       |
| Portrait crop, logo size, and photo appearance                  | `app/globals.css`              | `EDIT STYLE 12`                       |
| Browser tab title and search description                        | `app/layout.tsx`               | `EDIT BROWSER TITLE`                  |
| Zoom speed                                                      | `components/adobo-journal.tsx` | `ZOOM IN` / `ZOOM OUT`                |

## Change a cooking step

Open `lib/recipe.ts` and find the step by its `EDIT STEP` comment.

- `shortTitle` appears beside the timeline circle; `title` appears in the expanded view.
- `marker` appears on the timeline axis; `timing` explains the timing inside the step.
- Each string in `instructions` becomes one numbered direction.
- `needs` supplies the ingredient/equipment labels.
- `cue` describes what to look for; `tip` is your personal kitchen note.

Keep the `id` the same when renaming a step. The photo map and completion state use that stable key. Changing a heading does not require changing an ID.

## Replace a photograph

1. Put the new photograph in `public/photos/`, with a simple name such as `my-ginger.jpg`.
2. In `lib/site-media.ts`, find that step and change `src` to `/photos/my-ginger.jpg`.
3. Update `alt` to describe what is actually in the image.
4. Adjust `objectPosition` if the circular crop misses the subject. `50% 50%` means centered; a smaller second percentage shows more of the top.
5. Update the source, author, and license information. For your own photographs, use your name and mark them as your own; remove the reference-photo label only when the photos actually show your cooking.

The same entry supplies both the timeline circle and expanded step photo. The finished-dish photo is also used in the food introduction.

Your portrait and logo have separate entries in the same file. Portrait zoom is controlled by `.story-portrait img` in `app/globals.css`; lower `scale` to show more of the original photo. The source photo remains unchanged in composition; the webpage crops it for display.

The supplied adobo PNG contains Pngtree watermarks. They are preserved. If you obtain a different logo file, replace the file or update `siteMedia.brand.src`.

## Change the style

Start with the color variables in `:root` near the top of `app/globals.css`. Many rules later in the file are phone/tablet overrides inside `@media` blocks. If a change works on desktop but not on your phone, check the last matching selector.

Keep the `prefers-reduced-motion` rules and keyboard focus styles. They let more people use the timeline comfortably.

## Preview and check your changes

```sh
npm ci
npm run dev
```

Open the Local URL printed in your terminal. Save a file to see the local preview update.

```sh
npm run check
npm run build
```

The checks catch invalid code, missing photo mappings/files, and changes to the recipe or zoom behavior. Commit and push your changes when ready. GitHub Actions checks each push; it does **not** automatically publish the Sites website. Publishing the updated private site is a separate step.

## Files you can usually leave alone

`components/ui/` and `hooks/use-mobile.ts` are the supplied component library. `lib/timeline-motion.ts` is tested geometry for the zoom effect. `package-lock.json` is generated by npm and does not support comments. `.openai/hosting.json` connects this checkout to the existing hosted site; keep its project ID intact.

If you add or remove a milestone, update the photo map, the six-step labels/layout, and the recipe-order test together. For ordinary wording and photo changes, those structural edits are unnecessary.
