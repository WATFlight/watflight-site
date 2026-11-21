import type { Metadata } from "next";
import type { AssetSlotId } from "@/content/assets";

// News & Blog (Figma frame 344:1129). The frame is the owner's flattened, AI-generated export, so EVERY string
// here is provisional and unverified: the dates, categories, headlines and summaries (including their figures
// and claims: "6.4m wingspan", "dual-bus", the simulation milestone) were transcribed from the picture and must
// be confirmed by the team before launch. Straight apostrophes in the picture are typographic here.
//
// THE THREE STORIES have working article pages (`/news/[slug]`, one static page each, see
// app/news/[slug]/page.tsx), but their bodies are SAMPLE copy written only so the interaction can be reviewed:
// general, process-oriented text with no names, quotations, awards, partners, results, specifications, figures,
// numbers, dates or engineering claims. Each page shows one "SAMPLE ARTICLE" label and one sample notice, and
// the prose itself does not keep announcing that it is placeholder text. The frame has no articles, no archive
// and no further stories, so there is no "View all news" link and only one featured picture slide.
//
// ARTICLE BODIES are lists of blocks (`NewsBlock`): paragraph, h2, simple list, figure with caption and neutral
// callout. Only the blocks present in a story's `blocks` are rendered; the sample bodies use paragraphs, h2s and
// simple lists. Each story has its own section headings. Articles link to each other in the order of
// `newsStories` below (featured story, then the Recent updates cards, in listing order); the last article has no
// "Next update" link.
//
// SAMPLE MODE (`newsSampleMode`): while it is true the three article pages AND the /news listing are served with
// `noindex, nofollow`, and each article shows the "SAMPLE ARTICLE" label and the sample notice. TO LAUNCH, once
// real stories replace the samples: (1) replace each story's `blocks` (and image) with verified team content,
// or add the real stories; (2) set `newsSampleMode` to false, which removes the noindex robots directive from
// /news and /news/[slug] and hides the label and notice; (3) delete this comment's note about sample content
// and the sample entry in docs/rebuild-notes.md. Nothing else needs to change.

/** True while any story on the site is sample content. See the note above for what turning it off does. */
export const newsSampleMode = true;

/** Robots directive for /news and /news/[slug]: noindex, nofollow while the stories are samples. */
export const newsRobots: Metadata["robots"] = newsSampleMode ? { index: false, follow: false } : undefined;

export type NewsImage = {
  slot: Extract<AssetSlotId, `NEWS-${string}`>;
  /** Restrained description of the picture; it must not repeat the adjacent headline. */
  alt: string;
};

/** One piece of an article body. Blocks are rendered in order and only when present. */
export type NewsBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "figure"; image: NewsImage; caption: string }
  | { type: "callout"; text: string; title?: string };

export type NewsStory = {
  /** URL segment of the article page: `/news/<slug>`. */
  slug: string;
  /** Category as shown in the card's meta line (the featured story has none in the frame). */
  category?: string;
  /** Date label as shown, for example "SEP 2026". */
  date: string;
  /** Machine-readable month for the `time` element. */
  dateTime: string;
  title: string;
  summary: string;
  image: NewsImage;
  /** SAMPLE article body, in reading order. */
  blocks: NewsBlock[];
};

/** The path of a story's article page. */
export const newsHref = (story: Pick<NewsStory, "slug">) => `/news/${story.slug}`;

export const newsHero = {
  eyebrow: "NEWS",
  title: "LATEST FROM WATFLIGHT.",
  intro: "Development updates, milestones, build progress, team news, and press coverage.",
};

/** Labels on the article pages. */
export const newsArticleText = {
  breadcrumbLabel: "Breadcrumb",
  breadcrumbNews: "News",
  sampleLabel: "SAMPLE ARTICLE",
  sampleNotice: "Sample content — replace with a verified team update before launch.",
  leadCaption: "Sample illustration for this draft update.",
  navLabel: "More from News",
  back: "Back to News",
  nextPrefix: "Next update:",
};

const featuredStory: NewsStory = {
  slug: "validating-autonomous-thermal-soaring-in-simulation",
  date: "OCT 2026",
  dateTime: "2026-10",
  title: "Validating Autonomous Thermal Soaring in Simulation",
  summary:
    "An overview of WATFlight’s latest simulation milestone and what it means for the next stage of aircraft development.",
  image: {
    slot: "NEWS-FEATURED",
    alt: "Illustrative image of a single-propeller aircraft parked in a dim hangar, with a banner on the wall behind it.",
  },
  blocks: [
    { type: "h2", text: "Why this question matters" },
    {
      type: "p",
      text: "Every aircraft project eventually runs into the same practical question: how do you learn enough, early enough, to make good decisions about what to build next? Simulation gives a team a place to ask that question without the cost, risk or delay of putting hardware in the air.",
    },
    {
      type: "p",
      text: "For a student team it matters in a particular way. Time is limited, and every decision about the aircraft has to be explained to teammates who look at it from different angles. A clear, well-framed question helps everyone agree on what the team is trying to find out before any work begins.",
    },
    { type: "h2", text: "Approaching the problem in simulation" },
    {
      type: "p",
      text: "A good simulation study starts by being clear about what it represents and what it leaves out. The team sets up a virtual environment, decides which behaviours it wants to observe, and works through changes one at a time so that every difference in the outcome can be traced back to a cause.",
    },
    {
      type: "p",
      text: "That discipline is as much about communication as it is about software. Shared notes, common settings and regular check-ins keep everyone looking at the same version of the problem, which is what makes results easy to compare from one run to the next.",
    },
    { type: "p", text: "An update on simulation work usually answers a few plain questions:" },
    {
      type: "list",
      items: [
        "What was the team trying to learn?",
        "What was changed between one run and the next?",
        "How was the comparison kept fair?",
      ],
    },
    { type: "h2", text: "Reviewing the results" },
    {
      type: "p",
      text: "Reviewing results is a team activity rather than one person’s verdict. People with different specialities read the same output, question the assumptions behind it and raise anything that looks surprising before it is treated as a finding.",
    },
    {
      type: "p",
      text: "The aim is a careful account of what the simulation does and does not show, written in plain language. Where an outcome is uncertain, saying so is part of the job, and it tells readers what the team intends to look at next.",
    },
    { type: "h2", text: "What comes next" },
    {
      type: "p",
      text: "A simulation milestone is a step toward the aircraft, not a destination. What the team learns shapes the questions it asks next, the tests it plans and the work its subteams take on in the next stage.",
    },
    {
      type: "p",
      text: "Updates like this one are meant to keep the wider community informed as that work continues.",
    },
  ],
};

const recentStories: NewsStory[] = [
  {
    slug: "inside-the-latest-aircraft-prototype",
    category: "BUILD UPDATE",
    date: "SEP 2026",
    dateTime: "2026-09",
    title: "Inside the Latest Aircraft Prototype",
    summary: "Tooling and composite manufacturing completed for the 6.4m wingspan fuselage pod.",
    image: {
      slot: "NEWS-UPDATE-1",
      alt: "Illustrative image of a long pale aircraft wing resting on tripod stands in a workshop.",
    },
    blocks: [
      { type: "h2", text: "From concept to prototype" },
      {
        type: "p",
        text: "Every prototype begins as an idea that has to survive contact with real materials, real tools and real deadlines. Turning a concept into something that can be held, measured and inspected is a large step, and it rarely happens in a straight line.",
      },
      {
        type: "p",
        text: "Along the way the team makes a long series of practical decisions: what to make first, how parts will fit together, and what can be adjusted later without starting over. Writing those decisions down keeps the reasoning visible to everyone who builds on the work.",
      },
      { type: "h2", text: "Coordinating the subteams" },
      {
        type: "p",
        text: "An aircraft is the combined work of several specialities, and a prototype only comes together when they stay in step. The people who design, build, wire and program an aircraft each have their own priorities, and the best results come from hearing all of them early.",
      },
      { type: "p", text: "Coordination tends to rest on a few simple habits:" },
      {
        type: "list",
        items: [
          "Sharing plans before work begins, not after.",
          "Agreeing who owns each decision.",
          "Keeping a short record of what changed and why.",
        ],
      },
      {
        type: "p",
        text: "None of this is glamorous, but it is what lets a group of students build something larger than any one person could.",
      },
      { type: "h2", text: "Preparing for testing" },
      {
        type: "p",
        text: "A prototype is only useful if it can be checked. Before testing begins, the team agrees on what it wants to learn, how it will keep people and equipment safe, and what would count as a good reason to stop and rework something.",
      },
      {
        type: "p",
        text: "Planning the checks in advance also makes the results easier to trust, because the team knows from the start what it is looking for.",
      },
      { type: "h2", text: "What comes next" },
      {
        type: "p",
        text: "The next stage builds on what this prototype teaches the team. As the work continues, further updates will share what has been learned and how it feeds into the development of the aircraft.",
      },
    ],
  },
  {
    slug: "raspberry-pi-5-custom-power-distribution-architecture",
    category: "DEVELOPMENT",
    date: "AUG 2026",
    dateTime: "2026-08",
    title: "Raspberry Pi 5 & Custom Power Distribution Architecture",
    summary: "Integrating high-efficiency dual-bus power distribution for onboard avionics and payload telemetry.",
    image: {
      slot: "NEWS-UPDATE-2",
      alt: "Illustrative close-up of battery modules and colored wiring inside an equipment bay.",
    },
    blocks: [
      { type: "h2", text: "Defining the system needs" },
      {
        type: "p",
        text: "Electronics design starts with a plain description of what the aircraft’s systems need to do and what they depend on. Power sits at the base of that description: every computer, sensor and actuator relies on it, so the decisions made here shape the rest of the design.",
      },
      {
        type: "p",
        text: "Putting those needs in writing early helps the team compare options fairly and gives the other subteams something concrete to respond to.",
      },
      { type: "h2", text: "Integrating hardware safely" },
      {
        type: "p",
        text: "Bringing computing and power hardware together on an aircraft calls for care. Components have to fit the space, work with one another and be easy to inspect, and the team has to be able to explain how everything is connected.",
      },
      { type: "p", text: "Careful integration usually means:" },
      {
        type: "list",
        items: [
          "Planning connections and layout before building.",
          "Labelling and documenting what is connected to what.",
          "Checking each part on its own before combining them.",
        ],
      },
      {
        type: "p",
        text: "Taking these steps slowly pays off later, because problems are far easier to find on a bench than in the air.",
      },
      { type: "h2", text: "Reviewing and testing" },
      {
        type: "p",
        text: "Designs are reviewed by people who did not draw them. A fresh pair of eyes asks different questions, and the discussion often improves the design before anything is switched on.",
      },
      {
        type: "p",
        text: "Testing then proceeds in small, deliberate steps, with the team recording what it checked and what it found so that the next person to touch the system knows where things stand.",
      },
      { type: "h2", text: "What comes next" },
      {
        type: "p",
        text: "The team will keep refining the design as the rest of the aircraft takes shape. Future updates will share how the electronics work fits into the wider project.",
      },
    ],
  },
];

/**
 * The featured story and its picture slides. The frame supplies one approved picture (and shows a "01 / 04"
 * counter with arrows, but no other three slides), so there is one slide; the counter and arrows only appear
 * when more approved slides are added here.
 */
export const newsFeatured: { story: NewsStory; slides: NewsImage[] } = {
  story: featuredStory,
  slides: [featuredStory.image],
};

export const newsRecent: { title: string; stories: NewsStory[] } = {
  title: "RECENT UPDATES",
  stories: recentStories,
};

/** Every story that has an article page, in listing order. "Next update" follows this order. */
export const newsStories: NewsStory[] = [featuredStory, ...recentStories];

export const findNewsStory = (slug: string) => newsStories.find((story) => story.slug === slug);

/** The story after this one, or undefined for the last story (which then has no "Next update" link). */
export const nextNewsStory = (slug: string) => {
  const index = newsStories.findIndex((story) => story.slug === slug);
  return index >= 0 ? newsStories[index + 1] : undefined;
};
