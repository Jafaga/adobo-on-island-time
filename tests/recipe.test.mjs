import test from 'node:test';
import assert from 'node:assert/strict';
import {
  recipe,
  totalMinutes,
  formatElapsed,
  stepStartMinutes,
} from '../lib/recipe.ts';

test('timeline spans the complete recipe without gaps or negative durations', () => {
  assert.ok(recipe.steps.length > 0);
  let elapsed = 0;
  for (const [index, step] of recipe.steps.entries()) {
    assert.equal(stepStartMinutes(index), elapsed);
    assert.ok(Number.isInteger(step.duration) && step.duration > 0);
    elapsed += step.duration;
  }
  assert.equal(elapsed, totalMinutes);
  assert.equal(totalMinutes, 90);
});
test('elapsed labels carry into hours and preserve leading zeroes', () => {
  assert.equal(formatElapsed(0), '00:00');
  assert.equal(formatElapsed(59), '00:59');
  assert.equal(formatElapsed(60), '01:00');
  assert.equal(formatElapsed(80), '01:20');
  assert.equal(formatElapsed(125), '02:05');
});
test('every clickable step has a unique id and complete instruction content', () => {
  assert.equal(
    new Set(recipe.steps.map((step) => step.id)).size,
    recipe.steps.length,
  );
  for (const step of recipe.steps) {
    assert.ok(
      step.instructions.length >= 2,
      `${step.id}: needs full instructions`,
    );
    assert.ok(
      step.title && step.shortTitle && step.summary && step.cue && step.tip,
    );
    assert.ok(step.needs.length > 0);
  }
});
