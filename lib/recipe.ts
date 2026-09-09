// EDIT RECIPE HERE — one object per timeline milestone, in cooking order.
// id: stable key used by the photo map and completion state; keep it unchanged when renaming a title.
// shortTitle + marker: labels beside the timeline circle. title + summary: expanded view heading.
// timing: descriptive timing label; intervalMinutes: only a real stated recurring interval.
// instructions: the numbered directions. needs: ingredient/equipment chips.
// cue: what to look for. tip: your personal kitchen note. safety: optional sourced prep note.
// Ingredient list and overall batch labels are at the bottom of this file.

export type RecipeStep = {
  id: string;
  title: string;
  shortTitle: string;
  marker: string;
  timing: string;
  intervalMinutes?: number;
  phase: string;
  summary: string;
  instructions: string[];
  cue: string;
  tip: string;
  needs: string[];
  safety?: { text: string; url: string };
};

// Justine's own method. Amounts and total cooking time were not specified:
// show process cues, and preserve only the stated five-minute turning interval.
const steps: RecipeStep[] = [
  // EDIT STEP 01 — drumsticks
  {
    id: 'drumsticks',
    title: 'First, the drumsticks.',
    shortTitle: 'Prep the chicken',
    marker: 'START HERE',
    timing: 'Take your time with prep',
    phase: 'THE CHICKEN MASSAGE',
    summary: 'As many drumsticks as you want. And a little joke with Mom.',
    instructions: [
      'Start with as many chicken drumsticks as your pot can comfortably hold. For safer prep, skip rinsing or salt-scrubbing raw chicken and pat it dry with paper towels instead.',
      'I like each drumstick split crosswise into a top and a bottom portion. That gives you two pieces from one drumstick! Ask a butcher to make this cut through the bone; you can also leave the drumsticks whole.',
      'Keep raw chicken and its juices away from other ingredients. Wash your hands, utensils, and prep surface after handling it.',
    ],
    cue: 'Your drumsticks are portioned, your prep area is clean, and your pot has room for the whole batch.',
    tip: 'In my usual prep routine, I wash the chicken and rub it with salt—even in between the skin—then rinse it again. I joke with my mom that we’re “massaging the chicken.” That’s the little moment I wanted to share here.',
    needs: ['Chicken drumsticks', 'Paper towels', 'A roomy pot for your batch'],
    safety: {
      text: 'A safer version for readers: washing raw chicken can spread bacteria around the kitchen, and salt does not disinfect it. The story preserves my routine; the directions above use no-rinse prep. Cook every piece to 165°F / 74°C.',
      url: 'https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/washing-food-does-it-promote-food',
    },
  },
  // EDIT STEP 02 — ginger
  {
    id: 'ginger',
    title: 'Just a little ginger. :)',
    shortTitle: 'Prep the ginger',
    marker: 'UP NEXT',
    timing: 'A little prep before the pot',
    phase: 'A LITTLE FLAVOR',
    summary: 'Not too much. The ginger is here for flavor.',
    instructions: [
      'Wash the ginger under running water, rubbing away any visible dirt. Use a clean board and knife, separate from your raw-chicken prep.',
      'Cut a small amount of ginger into slices and set it aside. You don’t need too much—this is just for flavoring. :)',
    ],
    cue: 'A small amount of clean, sliced ginger, ready to go in with the shoyu.',
    tip: 'I keep the ginger light. It adds flavor without taking over the whole pot.',
    needs: ['A little fresh ginger', 'A clean knife and cutting board'],
  },
  // EDIT STEP 03 — two-shoyu
  {
    id: 'two-shoyu',
    title: 'Two shoyus. One good pot.',
    shortTitle: 'Add both shoyus',
    marker: 'HIGH → MED',
    timing: 'High heat, then medium',
    phase: 'MY TWO-SHOYU COMBINATION',
    summary: 'Aloha Original and Silver Swan Special, together.',
    instructions: [
      'Put the chicken in a rondeau or saucepan big enough to hold everything. Add Aloha Original Shoyu—the regular-sodium one—and Silver Swan Special Soy Sauce.',
      'Add ground black pepper, your sliced ginger, and very little water. I cook this by feel, so the amounts depend on my batch; there isn’t a fixed ratio here.',
      'Start over high heat to bring the liquid to a simmer, then cover and turn the heat down to medium. Adjust it as needed to keep a gentle simmer so the shoyu doesn’t burn or cook away too quickly.',
    ],
    cue: 'Both shoyus, ginger, and pepper are in the pot, with a little liquid and gentle bubbling under the lid.',
    tip: 'These two shoyus together give my chicken adobo such a good flavor, in my opinion. This combination is the part I really like.',
    needs: [
      'Prepped drumsticks',
      'Aloha Original Shoyu (regular sodium)',
      'Silver Swan Special Soy Sauce',
      'Ground black pepper',
      'Sliced ginger',
      'Very little water',
      'A rondeau or saucepan with a lid',
    ],
  },
  // EDIT STEP 04 — five-minute-turns
  {
    id: 'five-minute-turns',
    title: 'Five minutes. Flip. Repeat.',
    shortTitle: 'Give it a turn',
    marker: 'EVERY 5 MIN',
    timing: 'Turn at 5-minute intervals',
    intervalMinutes: 5,
    phase: 'GIVE EVERY SIDE SOME LOVE',
    summary: 'Turn the chicken so each side cooks in the shoyu.',
    instructions: [
      'About every 5 minutes, carefully lift the lid and turn the chicken onto its other side. Cover again and keep cooking.',
      'Repeat those checks and turns so all sides spend time in the shoyu. Keep the heat gentle, and add a small splash of water if the pan is getting dry before the chicken is cooked.',
      'The five-minute interval is a reminder to turn, not a total cooking time. Check every piece in its thickest part, away from bone, with a food thermometer; it must reach 165°F / 74°C before serving.',
    ],
    cue: 'The chicken is getting coated on all sides, and the shoyu and water are gradually reducing.',
    tip: 'I like checking in every five minutes. It gives each side its turn to cook and take on that shoyu flavor.',
    needs: ['Tongs', 'The pot lid', 'A food thermometer'],
  },
  // EDIT STEP 05 — oyster-finish
  {
    id: 'oyster-finish',
    title: 'The final ingredient.',
    shortTitle: 'Oyster sauce finish',
    marker: 'SAUCE LOW',
    timing: 'When the liquid is nearly reduced',
    phase: 'THE FINISHING TOUCH',
    summary: 'When the shoyu and water are almost gone: oyster sauce.',
    instructions: [
      'Watch for the shoyu and water to almost evaporate. Add the oyster sauce while there is still a little moisture, before the pan runs dry.',
      'Gently turn the chicken to coat it with the sauce, keeping the heat low enough to avoid scorching. There’s no fixed amount of oyster sauce in my method—adjust it for your batch.',
      'If any piece is still below 165°F / 74°C, add a little water as needed and continue cooking before serving.',
    ],
    cue: 'The sauce is concentrated and coating the chicken, with enough moisture to keep it from burning.',
    tip: 'Oyster sauce goes in at the end. That’s my final ingredient. :)',
    needs: ['Oyster sauce', 'Your nearly reduced pot of chicken'],
  },
  // EDIT STEP 06 — serve
  {
    id: 'serve',
    title: 'Done. Ready to serve. :)',
    shortTitle: 'Mangantayo!',
    marker: 'READY',
    timing: 'When every piece is cooked through',
    phase: 'HOPE YOU ENJOY',
    summary: 'My chicken adobo, ready for the table.',
    instructions: [
      'Confirm every piece of chicken has reached 165°F / 74°C, then turn off the heat. Taste the sauce only once the chicken and sauce are fully cooked.',
      'Serve warm, with rice if you like. Done—ready to serve! Hope you enjoy. :)',
    ],
    cue: 'Fully cooked drumsticks, coated in your two-shoyu and oyster sauce, ready to eat.',
    tip: 'This is my way of making chicken adobo. Thanks for coming into my kitchen—hope you enjoy!',
    needs: ['Your finished chicken adobo', 'Plates', 'Rice, if you like'],
  },
];

// EDIT RECIPE OVERVIEW — title, batch/timing labels, and the shopping list.
// Each ingredient is [amount label, ingredient name, helpful note].
export const recipe = {
  title: 'Justine’s two-shoyu chicken adobo',
  status: 'personal' as const,
  servingsLabel: 'Your batch, your choice',
  timingLabel: 'Turn every 5 minutes',
  ingredients: [
    [
      '1',
      'Chicken drumsticks',
      'Washed properly',
    ],
    ['5', 'Fresh ginger', 'Washed and sliced; just for flavor'],
    ['2', 'Aloha Original Shoyu', 'The regular-sodium version'],
    [
      '6',
      'Silver Swan Special Soy Sauce',
      'Together with the Aloha shoyu',
    ],
    ['3', 'Ground black pepper', 'Added with the shoyu and ginger'],
    ['7', 'Water', 'A small splash, with more only if needed'],
    ['4', 'Oyster sauce', 'Added when the liquid is nearly reduced and chicken is almost cooked through'],
    ['8', 'Rice for serving', 'If you like'],
  ],
  steps,
};
