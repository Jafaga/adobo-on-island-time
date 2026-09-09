'use client';

// PAGE EDITING MAP: search for EDIT SECTION below to jump to each visible area.
// Recipe text lives in lib/recipe.ts; photo paths/credits live in lib/site-media.ts.
// Colors, sizes, responsive layouts, and photo crops live in app/globals.css.
import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChefHat,
  Clock3,
  Code2,
  Heart,
  Sun,
  Users,
  X,
} from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { milestoneTransform, type Frame } from '@/lib/timeline-motion';
import { recipe } from '@/lib/recipe';
import { siteMedia, stepPhotos, type StepPhoto } from '@/lib/site-media';

// SHARED PHOTO VIEW: companion adds the second shoyu bottle in both views.
function StepImages({
  photo,
  decorative = false,
}: {
  photo: StepPhoto;
  decorative?: boolean;
}) {
  const images = photo.companion ? [photo, photo.companion] : [photo];
  return (
    <span
      className={`step-photos ${photo.companion ? 'step-photos-pair' : ''}`}
    >
      {images.map((item) => (
        <Image
          key={item.src}
          unoptimized
          src={item.src}
          alt={decorative ? '' : item.alt}
          width={220}
          height={220}
          style={{
            objectPosition: item.objectPosition,
            objectFit: item.fit ?? 'cover',
          }}
        />
      ))}
    </span>
  );
}

export default function AdoboJournal() {
  // INTERACTION STATE: null shows the timeline; a number opens that recipe step.
  // Completed steps are session-only and reset when the page reloads.
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sourceFrame = useRef<Frame | null>(null);
  const openingAnimation = useRef<Animation | null>(null);
  const closing = useRef(false);
  const milestoneButtons = useRef<(HTMLButtonElement | null)[]>([]);
  // ZOOM IN: duration is in milliseconds. Keep the reduced-motion guard.
  const bindPanel = useCallback((node: HTMLDivElement | null) => {
    panelRef.current = node;
    if (!node) {
      openingAnimation.current?.cancel();
      return;
    }
    if (
      !sourceFrame.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !node.animate
    )
      return;
    const target = node.getBoundingClientRect();
    openingAnimation.current = node.animate(
      [
        {
          transform: milestoneTransform(sourceFrame.current, target),
          opacity: 0.2,
          borderRadius: '120px',
        },
        {
          transform: 'translate(0, 0) scale(1)',
          opacity: 1,
          borderRadius: '24px',
        },
      ],
      { duration: 650, easing: 'cubic-bezier(.19,1,.22,1)' },
    );
  }, []);
  // ZOOM OUT: return to the circle that opened the view, even after Next/Previous.
  function closeStep() {
    if (closing.current) return;
    const node = panelRef.current;
    if (
      !node ||
      !sourceFrame.current ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !node.animate
    ) {
      setActiveStep(null);
      return;
    }
    closing.current = true;
    const currentTransform = getComputedStyle(node).transform;
    openingAnimation.current?.cancel();
    const target = node.getBoundingClientRect();
    const destination =
      returnFocus.current
        ?.querySelector('.milestone-circle')
        ?.getBoundingClientRect() ?? sourceFrame.current;
    const animation = node.animate(
      [
        {
          transform:
            currentTransform === 'none' ? 'scale(1)' : currentTransform,
          opacity: 1,
          borderRadius: '24px',
        },
        {
          transform: milestoneTransform(destination, target),
          opacity: 0,
          borderRadius: '120px',
        },
      ],
      { duration: 360, easing: 'cubic-bezier(.55,0,.8,.4)', fill: 'forwards' },
    );
    const finish = () => {
      closing.current = false;
      setActiveStep(null);
    };
    void animation.finished.then(finish, finish);
  }
  const step = activeStep === null ? null : recipe.steps[activeStep];
  function openStep(index: number, button: HTMLButtonElement) {
    returnFocus.current = button;
    sourceFrame.current = (
      button.querySelector('.milestone-circle') ?? button
    ).getBoundingClientRect();
    setActiveStep(index);
  }
  function navigateStep(index: number) {
    if (closing.current) return;
    // Keep the journey in place; return to the milestone that opened this view.
    setActiveStep(index);
    requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.scrollTop = 0;
      titleRef.current?.focus({ preventScroll: true });
    });
  }
  return (
    <>
      <a className="skip-link" href="#cooking-timeline">
        Skip to cooking steps
      </a>
      <div className="site-shell" id="top">
        {/* EDIT SECTION 01 — HEADER: brand image, site name, and navigation links. */}
        <header className="site-header">
          <a
            href="#top"
            className="brand"
            aria-label="Adobo — Filipino Local Style home"
          >
            <span className="brand-icon">
              <Image
                unoptimized
                src={siteMedia.brand.src}
                alt={siteMedia.brand.alt}
                width={80}
                height={80}
                priority
              />
            </span>
            <span>
              adobo<span className="brand-dot">.</span>
              <small>FILIPINO LOCAL STYLE</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a
              href="https://github.com/Jafaga/adobo-on-island-time"
              className="nav-code"
              target="_blank"
              rel="noreferrer"
              aria-label="Github repository — view this project on GitHub"
            >
              <Code2 size={16} /> Github repository <ArrowUpRight size={14} />
            </a>
          </nav>
        </header>
        <main>
          {/* EDIT SECTION 02 — TIMELINE: title, helper text, and milestone presentation.
              Edit the actual step titles, markers, and directions in lib/recipe.ts. */}
          <section
            id="cooking-timeline"
            className="timeline-section"
            aria-labelledby="timeline-title"
          >
            <div className="timeline-intro">
              <p className="eyebrow">
                Justine Afaga presents... 
              </p>
              {/* EDIT TITLE: the two spans have separate fonts, colors, and entrance timing.
                  EDIT STYLE 15 in globals.css controls the full opening sequence. */}
              <h1 id="timeline-title" className="cooking-title">
                <span className="title-invitation">Let’s make</span>{' '}
                <em className="title-dish">adobo.</em>
              </h1>
              <p>My way of chicken adobo, passed on from my parents.</p>
            </div>
            <div className="timeline-legend">
            </div>
            <div className="timeline-viewport">
              <ol
                className="timeline"
                aria-label="Chicken adobo cooking milestones"
              >
                {recipe.steps.map((item, index) => {
                  const photo = stepPhotos[item.id];
                  const isComplete = completed.includes(item.id);
                  return (
                    <li
                      key={item.id}
                      className={`timeline-slot ${index % 2 ? 'below' : 'above'} ${isComplete ? 'is-complete' : ''}`}
                    >
                      <button
                        ref={(node) => {
                          milestoneButtons.current[index] = node;
                        }}
                        className="step-button"
                        onClick={(event) =>
                          openStep(index, event.currentTarget)
                        }
                        onKeyDown={(event) => {
                          const next =
                            event.key === 'Home'
                              ? 0
                              : event.key === 'End'
                                ? recipe.steps.length - 1
                                : ['ArrowRight', 'ArrowDown'].includes(
                                      event.key,
                                    )
                                  ? (index + 1) % recipe.steps.length
                                  : ['ArrowLeft', 'ArrowUp'].includes(event.key)
                                    ? (index - 1 + recipe.steps.length) %
                                      recipe.steps.length
                                    : null;
                          if (next !== null) {
                            event.preventDefault();
                            milestoneButtons.current[next]?.focus();
                          }
                        }}
                        aria-haspopup="dialog"
                        aria-label={`${item.marker}, step ${index + 1}: ${item.shortTitle}, ${item.timing}${isComplete ? ', completed' : ''}`}
                      >
                        <span className="timeline-node">
                          {isComplete ? <Check size={12} /> : null}
                        </span>
                        <span className="timeline-stem" />
                        <span className="milestone-label">
                          <span className="step-number">0{index + 1}</span>
                          <span className="step-title">{item.shortTitle}</span>
                        </span>
                        <span className="milestone-circle">
                          <StepImages photo={photo} decorative />
                          {isComplete && (
                            <span className="milestone-check">
                              <Check size={14} />
                            </span>
                          )}
                        </span>
                        <span className="milestone-preview">
                          Explore step <ArrowUpRight size={14} />
                        </span>
                        <span className="step-time">{item.marker}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="timeline-footer">
              <span className="handwritten">
                &quot;I am not a good cook. But I learned how to make adobo because I care about my culture.&quot;
              </span>
              <span className="completion-status" aria-live="polite">
                {completed.length > 0
                  ? `${completed.length} of 6 moments complete`
                  : '- J.A.'}{' '}
              </span>
            </div>
            <p className="recipe-note">
              <span>MY RECIPE</span> Aloha Original + Silver Swan
              Special, a little of water, a little ginger, and oyster sauce to finish.
            </p>
          </section>
          {/* EDIT SECTION 03 — FOOD INTRO: headline, description, food photo, and caption. */}
          <section className="hero" aria-labelledby="destination-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-sun">
                </span>{' '}
                HAWAII BORN. FILIPINO RAISED
              </p>
              <h2 id="destination-title">
                Adobo, on
                <br />
                <em>island time.</em>
              </h2>
              <p className="hero-description">
                Hawaii and Filipino shoyus. All from my familiy recipe.
                <br className="desktop-break" /> A cooking journal.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#ingredients">
                  Gather your ingredients <ArrowDown size={17} />
                </a>
                <span className="handwritten">Study this!.</span>
              </div>
              <div className="recipe-meta">
                <span>
                  <Clock3 size={15} /> {recipe.timingLabel}
                </span>
                <span>
                  <Users size={15} /> {recipe.servingsLabel}
                </span>
                <span>
                  <Heart size={15} /> Made with aloha 
                </span>
              </div>
            </div>
            <figure className="hero-figure">
              <div className="photo-frame">
                <Image
                  unoptimized
                  src={stepPhotos.serve.src}
                  width={1200}
                  height={1600}
                  style={{ objectPosition: stepPhotos.serve.objectPosition }}
                  alt={stepPhotos.serve.alt}
                  fetchPriority="high"
                />
              </div>
              <div className="photo-stamp">
                <Sun size={25} strokeWidth={1.3} />
                <span>
                  NAIMAS!
                  <br />
                  NANANAM, NASABUR!
                </span>
              </div>
              <figcaption>
                <span className="caption-line" /> Savory, saucy, and always
                worth the wait.
                <span className="image-disclosure">
                  {stepPhotos.serve.reference
                    ? 'Reference photo · a different batch'
                    : 'From my kitchen'}
                </span>
              </figcaption>
            </figure>
          </section>
          {/* EDIT SECTION 04 — INGREDIENTS: change the list in lib/recipe.ts. */}
          <section
            className="ingredients-section"
            id="ingredients"
            aria-labelledby="ingredients-title"
          >
            <div className="ingredients-intro">
              <p className="eyebrow">THE LIST</p>
              <h2 id="ingredients-title">
                The ingredients.
                <br />
                <em>Nothing special.</em>
              </h2>
              <p>
                This is what I use for my chicken adobo. I don’t have direct measurements, 
                but it is up to you to decide how much you want.
              </p>
              <span className="servings-note">
                <Users size={16} /> {recipe.servingsLabel}
              </span>
            </div>
            <ul className="ingredient-list">
              {recipe.ingredients.map(([amount, name, note]) => (
                <li key={name}>
                  <span className="ingredient-amount">{amount}</span>
                  <span>
                    <strong>{name}</strong>
                    <small>{note}</small>
                  </span>
                </li>
              ))}
            </ul>
          </section>
          {/* EDIT SECTION 05 — A NOTE FROM JUSTINE: portrait, personal story, and signature. */}
          <section
            className="story-section"
            id="story"
            aria-labelledby="story-title"
          >
            <figure className="story-portrait">
              <Image
                unoptimized
                src={siteMedia.portrait.src}
                alt={siteMedia.portrait.alt}
                width={600}
                height={900}
                style={{ objectPosition: siteMedia.portrait.objectPosition }}
              />
            </figure>
            <div>
              <p className="eyebrow">A NOTE FROM JUSTINE</p>
              <h2 id="story-title">
                A bit of my roots.
                <br />
                <em>A little of what I love.</em>
              </h2>
              <p>
                I’m Filipino American, born and raised in Hawaiʻi. This is a
                personal project about two things I enjoy: making chicken adobo
                and making things with code.
              </p>
              <p>
                No assignment. No deadline. Just a place to share my process,
                experiment, and turn a meal into something you can explore.
              </p>
              <span className="handwritten signature">With aloha, Justine</span>
            </div>
          </section>
          {/* EDIT SECTION 06 — THE CODE: portfolio explanation, skill tags, and GitHub link. */}
          <section
            className="build-section"
            id="behind-the-build"
            aria-labelledby="build-title"
          >
            <div className="build-heading">
              <span className="code-mark">
                <Code2 size={26} />
              </span>
              <div>
                <p className="eyebrow">FROM MY KITCHEN TO MY KEYBOARD</p>
                <h2 id="build-title">
                  Cooked with care. Built with curiosity.
                </h2>
              </div>
            </div>
            <p>
              A recipe is a sequence of small decisions. So is software. This
              journal brings them together through a custom interactive
              timeline, accessible step panels, and thoughtful motion.
            </p>
            <div className="build-bottom">
              <div className="tech-list">
                <span>React</span>
                <span>TypeScript</span>
                <span>Responsive design</span>
                <span>Accessible motion</span>
              </div>
              <a
                href="https://github.com/Jafaga/adobo-on-island-time"
                target="_blank"
                rel="noreferrer"
                className="source-link"
              >
                Explore the source <ArrowUpRight size={17} />
              </a>
            </div>
          </section>
          {/* EDIT SECTION 07 — CREDITS: keep photo attribution when using licensed photos. */}
          <details className="recipe-sources" id="photo-credits">
            <summary>My recipe, safer prep & photo credits</summary>
            <p>
              This recipe and the “chicken massage” story come from my own
              cooking process. My directions include safer no-rinse chicken
              prep, following{' '}
              <a
                href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/washing-food-does-it-promote-food"
                target="_blank"
                rel="noreferrer"
              >
                USDA guidance on washing food
              </a>
              . Use a{' '}
              <a
                href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/food-thermometers"
                target="_blank"
                rel="noreferrer"
              >
                food thermometer
              </a>{' '}
              to confirm 165°F / 74°C in every piece.
            </p>
            <p>
              The finished adobo photo is my actual batch, photographed in my
              kitchen. I also selected and supplied the ingredient photos,
              including both shoyu bottles. The five-minute-turns photo is a
              reference from another cook and retains its listed license. Photos
              are framed for display.
            </p>
            <ul className="photo-credit-list">
              {Object.entries(stepPhotos).map(([id, photo]) => (
                <li key={id}>
                  {photo.sourceUrl ? (
                    <a href={photo.sourceUrl} target="_blank" rel="noreferrer">
                      {photo.subject}
                    </a>
                  ) : (
                    photo.subject
                  )}
                  {' — '}
                  {photo.author}
                  {' · '}
                  {photo.licenseUrl ? (
                    <a href={photo.licenseUrl} target="_blank" rel="noreferrer">
                      {photo.license}
                    </a>
                  ) : (
                    photo.license
                  )}
                </li>
              ))}
            </ul>
            <p>
              Portrait supplied by Justine. Adobo logo supplied from Pngtree,
              with its existing watermarks retained.
            </p>
          </details>
        </main>
        {/* EDIT SECTION 08 — FOOTER: closing line and return link. */}
        <footer className="site-footer">
          <a href="#top" className="footer-brand">
            adobo.
          </a>
          <span>Filipino roots. Island heart. A work in progress.</span>
          <a href="#cooking-timeline">
            Back to the kitchen <ArrowUpRight size={14} />
          </a>
        </footer>
      </div>
      {/* EDIT SECTION 09 — EXPANDED COOKING VIEW: layout for every clicked milestone.
          Keep the Dialog focus/close behavior for keyboard and screen-reader access. */}
      <Dialog
        open={activeStep !== null}
        onOpenChange={(open) => {
          if (!open) closeStep();
        }}
      >
        <DialogContent
          ref={bindPanel}
          className="zoom-dialog"
          showCloseButton={false}
          finalFocus={returnFocus}
          initialFocus={titleRef}
        >
          <div className="sheet-top">
            <DialogClose className="zoom-back">
              <ArrowLeft size={18} /> Back to the timeline
            </DialogClose>
            <DialogClose
              className="close-button"
              aria-label="Close recipe step"
            >
              <X size={22} />
            </DialogClose>
          </div>
          {step && activeStep !== null && (
            <div key={step.id} className="sheet-inner focus-layout">
              <div className="focus-heading">
                <div className="focus-milestone">
                  <StepImages photo={stepPhotos[step.id]} />
                </div>
                <p className="step-photo-caption">
                  {stepPhotos[step.id].reference
                    ? 'Reference photo'
                    : 'From my kitchen'}{' '}
                  · {stepPhotos[step.id].subject}
                </p>
                <p className="sheet-kicker">
                  STEP 0{activeStep + 1} / 06 <span>{step.phase}</span>
                </p>
                <DialogTitle
                  ref={titleRef}
                  tabIndex={-1}
                  className="sheet-title"
                >
                  {step.title}
                </DialogTitle>
                <DialogDescription className="sheet-description">
                  {step.summary}
                </DialogDescription>
                <div className="sheet-meta">
                  <span>
                    <Clock3 size={16} /> {step.timing}
                  </span>
                  <span>{step.marker}</span>
                </div>
              </div>
              <aside className="focus-aside">
                <div className="step-needs">
                  <h3>Have these ready</h3>
                  <ul>
                    {step.needs.map((need) => (
                      <li key={need}>{need}</li>
                    ))}
                  </ul>
                </div>
                <div className="cue-card">
                  <ChefHat size={21} />
                  <div>
                    <h3>What to look for</h3>
                    <p>{step.cue}</p>
                  </div>
                </div>
                <div className="kitchen-note">
                  <span className="handwritten">A little kitchen note</span>
                  <p>{step.tip}</p>
                </div>
              </aside>
              <div className="focus-directions">
                {step.safety && (
                  <div className="safe-prep-note">
                    <h3>A note on safer prep</h3>
                    <p>{step.safety.text}</p>
                    <a href={step.safety.url} target="_blank" rel="noreferrer">
                      USDA: washing food & food safety{' '}
                      <ArrowUpRight size={14} />
                    </a>
                  </div>
                )}
                <h3 className="directions-heading">Let’s do this.</h3>
                <ol className="instruction-list">
                  {step.instructions.map((instruction, index) => (
                    <li key={instruction}>
                      <span>{index + 1}</span>
                      <p>{instruction}</p>
                    </li>
                  ))}
                </ol>
                <button
                  className={`button complete-button ${completed.includes(step.id) ? 'completed' : ''}`}
                  aria-pressed={completed.includes(step.id)}
                  onClick={() =>
                    setCompleted((current) =>
                      current.includes(step.id)
                        ? current.filter((id) => id !== step.id)
                        : [...current, step.id],
                    )
                  }
                >
                  <Check size={17} />
                  {completed.includes(step.id)
                    ? 'Step complete · undo'
                    : 'Mark this step complete'}
                </button>
              </div>
              <div className="step-navigation">
                <button
                  disabled={activeStep === 0}
                  onClick={() => navigateStep(activeStep - 1)}
                >
                  <ArrowLeft size={16} /> Previous
                </button>
                <span>0{activeStep + 1} / 06</span>
                {activeStep < recipe.steps.length - 1 ? (
                  <button onClick={() => navigateStep(activeStep + 1)}>
                    Next step <ArrowRight size={16} />
                  </button>
                ) : (
                  <DialogClose>
                    Back to the timeline <ArrowRight size={16} />
                  </DialogClose>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
