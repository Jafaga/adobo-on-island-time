import test from 'node:test';
import assert from 'node:assert/strict';
import { recipe } from '../lib/recipe.ts';

test('the six milestones follow Justine’s supplied process', () => {
  assert.equal(recipe.status, 'personal');
  assert.deepEqual(
    recipe.steps.map((step) => step.id),
    [
      'drumsticks',
      'ginger',
      'two-shoyu',
      'five-minute-turns',
      'oyster-finish',
      'serve',
    ],
  );
  assert.equal(
    new Set(recipe.steps.map((step) => step.id)).size,
    recipe.steps.length,
  );
  for (const step of recipe.steps) {
    assert.ok(step.instructions.length >= 2);
    assert.ok(
      step.marker && step.timing && step.cue && step.tip && step.needs.length,
    );
  }
});
test('only the supplied turning interval is numeric; total times are not invented', () => {
  assert.equal(
    recipe.steps.find((step) => step.id === 'five-minute-turns')
      .intervalMinutes,
    5,
  );
  assert.equal(
    recipe.steps.filter((step) => step.intervalMinutes !== undefined).length,
    1,
  );
  assert.ok(recipe.steps.every((step) => !('duration' in step)));
  assert.ok(!('servings' in recipe));
});
test('personal ingredients replace all filler seasoning and marinade ingredients', () => {
  const ingredients = recipe.ingredients.map(([, name]) => name).join(' ');
  assert.match(ingredients, /Aloha Original Shoyu/);
  assert.match(ingredients, /Silver Swan Special Soy Sauce/);
  assert.match(ingredients, /Oyster sauce/);
  assert.match(ingredients, /ginger/i);
  assert.doesNotMatch(
    ingredients,
    /vinegar|garlic|bay leaves|sugar|neutral oil/i,
  );
});
test('the family memory is preserved separately from sourced safer-prep guidance', () => {
  const prep = recipe.steps[0];
  assert.match(prep.tip, /mom/);
  assert.match(prep.tip, /massaging the chicken/);
  assert.match(prep.safety.text, /salt does not disinfect/);
  assert.match(prep.safety.url, /^https:\/\/www\.fsis\.usda\.gov\//);
  assert.match(recipe.steps.at(-1).instructions.join(' '), /165°F \/ 74°C/);
});
