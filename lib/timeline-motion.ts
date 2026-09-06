// ANIMATION MATH: usually leave this alone when changing text or photos.
// Adjust transition speed in components/adobo-journal.tsx instead.
// tests/timeline-motion.test.mjs protects these viewport coordinate calculations.
export type Frame = {
  left: number;
  top: number;
  width: number;
  height: number;
};

// Map the expanded view back onto the clicked milestone, in viewport coordinates.
export function milestoneTransform(source: Frame, target: Frame): string {
  const x = source.left + source.width / 2 - (target.left + target.width / 2);
  const y = source.top + source.height / 2 - (target.top + target.height / 2);
  const scale = Math.min(
    source.width / Math.max(target.width, 1),
    source.height / Math.max(target.height, 1),
  );
  return `translate(${x}px, ${y}px) scale(${Math.max(scale, 0.01)})`;
}
