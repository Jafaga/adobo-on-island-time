'use client';
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
  CookingPot,
  Flame,
  Heart,
  Leaf,
  Sun,
  Users,
  Utensils,
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
const stepIcons = [Utensils, Leaf, CookingPot, Clock3, Flame, Heart];

export default function AdoboJournal() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const sourceFrame = useRef<Frame | null>(null);
  const openingAnimation = useRef<Animation | null>(null);
  const closing = useRef(false);
  const milestoneButtons = useRef<(HTMLButtonElement | null)[]>([]);
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
        <header className="site-header">
          <a
            href="#top"
            className="brand"
            aria-label="Adobo on Island Time home"
          >
            <span className="brand-icon">
              <CookingPot size={24} strokeWidth={1.6} />
            </span>
            <span>
              adobo<span className="brand-dot">.</span>
              <small>ON ISLAND TIME</small>
            </span>
          </a>
          <nav aria-label="Main navigation">
            <a href="#cooking-timeline">The recipe</a>
            <a href="#story">The story</a>
            <a href="#behind-the-build" className="nav-code">
              <Code2 size={16} /> The code <ArrowUpRight size={14} />
            </a>
          </nav>
        </header>
        <main>
          <section
            id="cooking-timeline"
            className="timeline-section"
            aria-labelledby="timeline-title"
          >
            <div className="timeline-intro">
              <p className="eyebrow">
                <Sun size={16} /> FILIPINO ROOTS. HAWAIʻI RAISED.
              </p>
              <h1 id="timeline-title">
                One pot. Six moments.
                <br />
                <em>Let’s make adobo.</em>
              </h1>
              <p>My two-shoyu chicken adobo, one little moment at a time.</p>
              <div className="timeline-instructions">
                <span>
                  <Clock3 size={15} /> {recipe.timingLabel}
                </span>
                <span>
                  <Users size={15} /> {recipe.servingsLabel}
                </span>
                <span>Hover to explore · click to zoom in</span>
              </div>
            </div>
            <div className="timeline-legend">
              <span>
                <span className="legend-dot" /> YOUR COOKING TIMELINE
              </span>
              <span>COOKING CUES · MY PROCESS</span>
            </div>
            <div className="timeline-viewport">
              <ol
                className="timeline"
                aria-label="Chicken adobo cooking milestones"
              >
                {recipe.steps.map((item, index) => {
                  const Icon = stepIcons[index];
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
                          {index === recipe.steps.length - 1 ? (
                            <Image
                              unoptimized
                              src="/chicken-adobo.jpg"
                              alt=""
                              width={120}
                              height={120}
                            />
                          ) : (
                            <Icon size={43} strokeWidth={1.3} />
                          )}
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
                A good meal is a journey. Enjoy every step.
              </span>
              <span className="completion-status" aria-live="polite">
                {completed.length > 0
                  ? `${completed.length} of 6 moments complete`
                  : 'Ready when you are.'}{' '}
                <Sun size={17} />
              </span>
            </div>
            <p className="recipe-note">
              <span>MY RECIPE, MY WAY</span> Aloha Original + Silver Swan
              Special, a little ginger, and an oyster-sauce finish. I cook by
              feel: quantities depend on the batch, and every piece needs to
              reach 165°F / 74°C.
            </p>
          </section>
          <section className="hero" aria-labelledby="destination-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-sun">
                  <Sun size={16} />
                </span>{' '}
                FILIPINO ROOTS. HAWAIʻI RAISED.
              </p>
              <h2 id="destination-title">
                Adobo, on
                <br />
                <em>island time.</em>
              </h2>
              <p className="hero-description">
                Two shoyus. A little ginger. A whole lot of home.
                <br className="desktop-break" /> My cooking journal, one
                delicious step at a time.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#ingredients">
                  Gather your ingredients <ArrowDown size={17} />
                </a>
                <span className="handwritten">Pull up a chair.</span>
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
                  src="/chicken-adobo.jpg"
                  width="1536"
                  height="1024"
                  alt="AI-created illustration of chicken adobo; not a photo of Justine’s exact recipe"
                  fetchPriority="high"
                />
              </div>
              <div className="photo-stamp">
                <Sun size={25} strokeWidth={1.3} />
                <span>
                  GOOD FOOD.
                  <br />
                  SLOW MOMENTS.
                </span>
              </div>
              <figcaption>
                <span className="caption-line" /> Savory, saucy, and always
                worth the wait.
                <span className="image-disclosure">
                  AI illustration · not my exact recipe
                </span>
              </figcaption>
            </figure>
          </section>
          <section
            className="ingredients-section"
            id="ingredients"
            aria-labelledby="ingredients-title"
          >
            <div className="ingredients-intro">
              <p className="eyebrow">THE SHORT & SAVORY LIST</p>
              <h2 id="ingredients-title">
                Simple ingredients.
                <br />
                <em>Something special.</em>
              </h2>
              <p>
                This is what goes into my pot. I don’t use fixed measurements
                here—start with the batch you want to make.
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
          <section
            className="story-section"
            id="story"
            aria-labelledby="story-title"
          >
            <div className="story-marker">
              <Sun size={36} strokeWidth={1} />
              <span>
                ROOTED IN TWO PLACES.
                <br />
                MADE RIGHT HERE.
              </span>
            </div>
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
          <details className="recipe-sources">
            <summary>My recipe, safer prep & the illustration</summary>
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
              to confirm 165°F / 74°C in every piece. The AI illustration
              predates this recipe and may show ingredients I don’t use; it is
              not a photo from my kitchen.
            </p>
          </details>
        </main>
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
                <div className="focus-milestone" aria-hidden="true">
                  {(() => {
                    const Icon = stepIcons[activeStep];
                    return activeStep === recipe.steps.length - 1 ? (
                      <Image
                        unoptimized
                        src="/chicken-adobo.jpg"
                        alt=""
                        width={140}
                        height={140}
                      />
                    ) : (
                      <Icon size={48} strokeWidth={1.3} />
                    );
                  })()}
                </div>
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
