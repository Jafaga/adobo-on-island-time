'use client';
import { useRef, useState } from 'react';
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  recipe,
  formatElapsed,
  stepStartMinutes,
  totalMinutes,
} from '@/lib/recipe';
const stepIcons = [Utensils, Clock3, Flame, CookingPot, Leaf, Heart];

export default function AdoboJournal() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const step = activeStep === null ? null : recipe.steps[activeStep];
  function openStep(index: number, button: HTMLButtonElement) {
    returnFocus.current = button;
    setActiveStep(index);
  }
  function navigateStep(index: number) {
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
          <section className="hero" aria-labelledby="hero-title">
            <div className="hero-copy">
              <p className="eyebrow">
                <span className="tiny-sun">
                  <Sun size={16} />
                </span>{' '}
                FILIPINO ROOTS. HAWAIʻI RAISED.
              </p>
              <h1 id="hero-title">
                Adobo, on
                <br />
                <em>island time.</em>
              </h1>
              <p className="hero-description">
                A little soy. A little vinegar. A whole lot of home.
                <br className="desktop-break" /> My cooking journal, one
                delicious step at a time.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#cooking-timeline">
                  Let’s make adobo <ArrowDown size={17} />
                </a>
                <span className="handwritten">Pull up a chair.</span>
              </div>
              <div className="recipe-meta">
                <span>
                  <Clock3 size={15} /> ~{totalMinutes} minutes
                </span>
                <span>
                  <Users size={15} /> Serves {recipe.servings}
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
                  alt="Illustration of glossy chicken adobo with garlic, bay leaves, and steamed rice in warm sunlight"
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
                <span className="caption-line" /> Savory, tangy, and always
                worth the wait.
                <span className="image-disclosure">
                  AI-created illustration
                </span>
              </figcaption>
            </figure>
          </section>
          <section
            id="cooking-timeline"
            className="timeline-section"
            aria-labelledby="timeline-title"
          >
            <div className="section-topline">
              <div>
                <p className="eyebrow">FROM THE FIRST CLOVE TO THE LAST BITE</p>
                <h2 id="timeline-title">Good food takes a little time.</h2>
              </div>
              <p className="timeline-hint">
                Six little moments.
                <br />
                Tap a step to come into the kitchen. <ArrowDown size={15} />
              </p>
            </div>
            <div className="timeline-legend">
              <span>
                <span className="legend-dot" /> YOUR COOKING TIMELINE
              </span>
              <span>ELAPSED TIME · ESTIMATES</span>
            </div>
            <ol className="timeline">
              {recipe.steps.map((item, index) => {
                const Icon = stepIcons[index];
                const isComplete = completed.includes(item.id);
                return (
                  <li
                    key={item.id}
                    className={`timeline-slot ${index % 2 ? 'below' : 'above'} ${isComplete ? 'is-complete' : ''}`}
                    style={{ '--order': index } as React.CSSProperties}
                  >
                    <button
                      className="step-button"
                      onClick={(event) => openStep(index, event.currentTarget)}
                      aria-haspopup="dialog"
                      aria-label={`${formatElapsed(stepStartMinutes(index))}, step ${index + 1}: ${item.shortTitle}, ${item.duration} minutes${isComplete ? ', completed' : ''}`}
                    >
                      <span className="timeline-node">
                        {isComplete ? <Check size={12} /> : null}
                      </span>
                      <span className="timeline-stem" />
                      <span className="step-card">
                        <span className="step-card-top">
                          <span className="step-icon">
                            <Icon size={22} strokeWidth={1.5} />
                          </span>
                          <span className="step-number">0{index + 1}</span>
                        </span>
                        <span className="step-title">{item.shortTitle}</span>
                        <span className="step-summary">{item.summary}</span>
                        <span className="step-bottom">
                          <span>{item.duration} MIN</span>
                          <ArrowUpRight size={17} />
                        </span>
                      </span>
                      <span className="step-time">
                        {formatElapsed(stepStartMinutes(index))}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
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
            <p className="starter-note">
              <span>RECIPE IN PROGRESS</span> This is a starter recipe while I
              put my own version into words. Timings are a guide; cook chicken
              to 165°F / 74°C.
            </p>
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
                Most of the magic is already in the pantry. Here’s what goes
                into this starter pot of adobo.
              </p>
              <span className="servings-note">
                <Users size={16} /> For 4 hungry people
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
            <summary>About this starter recipe & image</summary>
            <p>
              This starter draws on recipes by{' '}
              <a
                href="https://panlasangpinoy.com/filipino-chicken-adobo-recipe/"
                target="_blank"
                rel="noreferrer"
              >
                Vanjo Merano
              </a>{' '}
              and{' '}
              <a
                href="https://www.kawalingpinoy.com/chicken-adobo/"
                target="_blank"
                rel="noreferrer"
              >
                Lalaine Manalo
              </a>
              . Safe handling follows{' '}
              <a
                href="https://www.fsis.usda.gov/food-safety/safe-food-handling-and-preparation/food-safety-basics/grilling-and-food-safety"
                target="_blank"
                rel="noreferrer"
              >
                USDA guidance
              </a>
              . The food image is an AI-created illustration, ready to be
              replaced by a photo from my own kitchen.
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
      <Sheet
        open={activeStep !== null}
        onOpenChange={(open) => {
          if (!open) setActiveStep(null);
        }}
      >
        <SheetContent
          ref={panelRef}
          className="recipe-sheet"
          showCloseButton={false}
          finalFocus={returnFocus}
        >
          <div className="sheet-top">
            <span className="eyebrow">THE COOKING JOURNAL</span>
            <SheetClose className="close-button" aria-label="Close recipe step">
              <X size={22} />
            </SheetClose>
          </div>
          {step && activeStep !== null && (
            <div key={step.id} className="sheet-inner">
              <p className="sheet-kicker">
                STEP 0{activeStep + 1} / 06 <span>{step.phase}</span>
              </p>
              <SheetTitle ref={titleRef} tabIndex={-1} className="sheet-title">
                {step.title}
              </SheetTitle>
              <SheetDescription className="sheet-description">
                {step.summary}
              </SheetDescription>
              <div className="sheet-meta">
                <span>
                  <Clock3 size={16} /> About {step.duration} minutes
                </span>
                <span>At {formatElapsed(stepStartMinutes(activeStep))}</span>
              </div>
              <div className="step-needs">
                <h3>Have these ready</h3>
                <ul>
                  {step.needs.map((need) => (
                    <li key={need}>{need}</li>
                  ))}
                </ul>
              </div>
              <ol className="instruction-list">
                {step.instructions.map((instruction, index) => (
                  <li key={instruction}>
                    <span>{index + 1}</span>
                    <p>{instruction}</p>
                  </li>
                ))}
              </ol>
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
                  <SheetClose>
                    Back to the timeline <ArrowRight size={16} />
                  </SheetClose>
                )}
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
