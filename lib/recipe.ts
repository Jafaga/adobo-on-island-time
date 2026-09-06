export type RecipeStep = {
  id: string;
  title: string;
  shortTitle: string;
  duration: number;
  phase: string;
  summary: string;
  instructions: string[];
  cue: string;
  tip: string;
  needs: string[];
};
// Replace this starter content with Justine's own recipe when supplied.
export const recipe = {
  title: 'Chicken adobo',
  status: 'starter' as const,
  servings: 4,
  ingredients: [
    ['2 lb', 'Bone-in chicken', 'Thighs, drumsticks, or a mix'],
    ['¼ cup', 'Soy sauce', 'Regular or reduced sodium'],
    ['6 tbsp', 'Cane or white vinegar', 'The signature tang'],
    ['6 cloves', 'Garlic', 'Peeled and lightly crushed'],
    ['2', 'Bay leaves', 'Dried is perfect'],
    ['1 tsp', 'Whole black peppercorns', 'For a warm, peppery bite'],
    ['1 cup', 'Water', 'Plus a splash if needed'],
    ['2 tbsp', 'Neutral oil', 'For browning the chicken'],
    ['1 tsp', 'Sugar · optional', 'Taste the sauce first'],
    ['To serve', 'Hot steamed rice', 'For all that good sauce'],
  ],
  steps: [
    {
      id: 'gather',
      title: 'Good things start with garlic.',
      shortTitle: 'Gather & prep',
      duration: 10,
      phase: 'THE BEGINNING',
      summary: 'A few pantry staples. A whole lot of flavor.',
      instructions: [
        'Measure your ingredients and lightly crush the garlic cloves. Set out a wide, heavy pan with a lid, tongs, and a food thermometer.',
        'Pat the chicken dry with paper towels. Keep raw chicken and its utensils separate from ready-to-eat food, and wash your hands afterward.',
      ],
      cue: 'Everything measured, garlic fragrant, and your pan ready to go.',
      tip: 'A wide pan gives the chicken room to brown and lets the sauce reduce evenly.',
      needs: [
        '2 lb bone-in chicken',
        '6 cloves garlic',
        'All measured ingredients',
      ],
    },
    {
      id: 'marinate',
      title: 'Let the flavor settle in.',
      shortTitle: 'Let it marinate',
      duration: 30,
      phase: 'A LITTLE PATIENCE',
      summary: 'Soy sauce, crushed garlic, and a little patience.',
      instructions: [
        'Combine the chicken, soy sauce, and crushed garlic in a bowl or food-safe container. Turn every piece to coat it.',
        'Cover and refrigerate for 30 minutes. Keep it in the refrigerator the entire time.',
      ],
      cue: 'Each piece is coated in the soy-and-garlic mixture.',
      tip: 'This is a good moment to get your rice started. Save the marinade for the pan later; it must be boiled before serving.',
      needs: ['¼ cup soy sauce', 'Prepped chicken and garlic'],
    },
    {
      id: 'sear',
      title: 'Find that golden moment.',
      shortTitle: 'Build some color',
      duration: 10,
      phase: 'TURN UP THE HEAT',
      summary: 'A hot pan. That first sizzle. Golden edges.',
      instructions: [
        'Lift the chicken out of the marinade and let the excess drip off. Reserve the marinade and garlic separately.',
        'Heat the oil over medium-high heat. Place chicken skin-side down and brown both sides, about 4–5 minutes per side. Work in batches if the pan is crowded.',
      ],
      cue: 'Golden patches on the chicken and a steady sizzle. The inside is still raw at this stage.',
      tip: 'Give the chicken a moment before turning. When a crust forms, it releases from the pan more easily.',
      needs: ['2 tbsp neutral oil', 'Marinated chicken'],
    },
    {
      id: 'braise',
      title: 'Here comes the adobo.',
      shortTitle: 'Bring it together',
      duration: 5,
      phase: 'THE GOOD STUFF',
      summary: 'Vinegar meets soy. The kitchen wakes up.',
      instructions: [
        'Return all chicken to the pan. Carefully add the reserved marinade and garlic, vinegar, water, bay leaves, and peppercorns.',
        'Bring the liquid to a full boil. Boil for a few minutes so the marinade that touched raw chicken is thoroughly heated.',
      ],
      cue: 'The sauce is bubbling across the pan, with a bright vinegar-and-garlic aroma.',
      tip: 'Pour the liquid in carefully; a hot pan can spit. Gently loosen the browned bits from the bottom for extra flavor.',
      needs: [
        '6 tbsp vinegar',
        '1 cup water',
        '2 bay leaves',
        '1 tsp peppercorns',
        'Reserved marinade and garlic',
      ],
    },
    {
      id: 'simmer',
      title: 'Slow down. Let it simmer.',
      shortTitle: 'Low & slow',
      duration: 25,
      phase: 'ISLAND TIME',
      summary: 'Gentle bubbles. Tender chicken. No rush.',
      instructions: [
        'Cover and lower the heat to a gentle simmer. Cook for about 25 minutes, turning the chicken once so every piece spends time in the sauce.',
        'Check each piece with a food thermometer in the thickest part, away from the bone. Chicken must reach 165°F / 74°C. Keep cooking if needed; the temperature matters more than the clock.',
      ],
      cue: 'Small, steady bubbles and tender meat. A thermometer confirms 165°F / 74°C in every piece.',
      tip: 'If the sauce gets low before the chicken is cooked, add a splash of water and keep simmering.',
      needs: ['A lid', 'Food thermometer', 'A little patience'],
    },
    {
      id: 'serve',
      title: 'Rice ready? Let’s eat.',
      shortTitle: 'Reduce & serve',
      duration: 10,
      phase: 'KAIN TAYO',
      summary: 'Glossy sauce. Warm rice. Your favorite plate.',
      instructions: [
        'Uncover and simmer for about 5–10 minutes until the sauce is glossy and lightly coats the chicken. If the chicken is already very tender, set it aside while reducing the sauce, then return it to the pan.',
        'Taste the cooked sauce. Add the optional sugar if you prefer a little sweetness, or a splash of water if the sauce is too concentrated. Remove the bay leaves.',
        'Spoon the chicken and plenty of sauce over hot rice. Watch for whole peppercorns as you eat. Kain tayo — let’s eat!',
      ],
      cue: 'A deep brown, lightly glossy sauce with a savory, tangy balance you enjoy.',
      tip: 'The best sauce is the one you like. Taste, make small adjustments, and write down what you changed.',
      needs: [
        'Hot steamed rice',
        '1 tsp sugar, optional',
        'Your favorite plate',
      ],
    },
  ] satisfies RecipeStep[],
};
export function stepStartMinutes(index: number): number {
  return recipe.steps
    .slice(0, index)
    .reduce((total, step) => total + step.duration, 0);
}
export function formatElapsed(minutes: number): string {
  return `${Math.floor(minutes / 60)
    .toString()
    .padStart(2, '0')}:${(minutes % 60).toString().padStart(2, '0')}`;
}
export const totalMinutes = recipe.steps.reduce(
  (total, step) => total + step.duration,
  0,
);
