import test from 'node:test';
import assert from 'node:assert/strict';
import { milestoneTransform } from '../lib/timeline-motion.ts';

test('zoom begins at the clicked milestone relative to the expanded view', () => {
  const source = { left: 140, top: 220, width: 100, height: 100 };
  const panel = { left: 100, top: 50, width: 1000, height: 800 };
  assert.equal(
    milestoneTransform(source, panel),
    'translate(-410px, -180px) scale(0.1)',
  );
});
test('zoom coordinates account for viewport movement on smaller screens', () => {
  const source = { left: 30, top: 440, width: 70, height: 70 };
  const panel = { left: 10, top: 10, width: 350, height: 740 };
  assert.equal(
    milestoneTransform(source, panel),
    `translate(-120px, 95px) scale(${70 / 740})`,
  );
});
test('degenerate geometry never creates an infinite animation transform', () => {
  const value = milestoneTransform(
    { left: 0, top: 0, width: 0, height: 0 },
    { left: 0, top: 0, width: 0, height: 0 },
  );
  assert.equal(value, 'translate(0px, 0px) scale(0.01)');
});
