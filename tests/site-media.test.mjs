import test from 'node:test';
import assert from 'node:assert/strict';
import { statSync } from 'node:fs';
import { recipe } from '../lib/recipe.ts';
import { siteMedia, stepPhotos } from '../lib/site-media.ts';

// Catch broken images before deploying after a photo swap or recipe edit.
test('every recipe step has a local photo with usable description and attribution', () => {
  assert.deepEqual(
    Object.keys(stepPhotos).sort(),
    recipe.steps.map(({ id }) => id).sort(),
  );
  for (const photo of Object.values(stepPhotos)) {
    assert.ok(photo.alt && photo.subject && photo.author && photo.license);
    assert.equal(typeof photo.reference, 'boolean');
    if (photo.reference && !photo.supplied) {
      assert.ok(URL.canParse(photo.sourceUrl));
      assert.ok(URL.canParse(photo.licenseUrl));
    }
  }
});

test('all configured photos and personal images exist in public', () => {
  for (const media of [
    ...Object.values(siteMedia),
    ...Object.values(stepPhotos).flatMap((photo) =>
      photo.companion ? [photo, photo.companion] : [photo],
    ),
  ]) {
    assert.match(media.src, /^\/(?!\/)[a-zA-Z0-9/_-]+\.(jpg|png|webp)$/);
    const path = new URL(`../public${media.src}`, import.meta.url);
    assert.ok(
      statSync(path).size > 0,
      `${media.src} must exist and not be empty`,
    );
  }
});
